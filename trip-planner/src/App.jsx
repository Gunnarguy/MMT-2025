import "leaflet/dist/leaflet.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./lib/leafletConfig";
import "./styles/app.css";

import ActivityLog from "./components/ActivityLog";
import Header from "./components/Header";
import LoginScreen from "./components/LoginScreen";
import TripBuilderView from "./components/TripBuilderView";

import { getRouteTemplate, routeTemplates } from "./data/templates";
import {
  addActivityLog,
  fetchActivityLogs,
  fetchSharedTripState,
  getFamilyMember,
  getSession,
  isEmailAllowed,
  onAuthStateChange,
  signOut,
  subscribeToActivityLog,
  subscribeToSharedTrip,
  supabaseEnabled,
  upsertSharedTripState,
} from "./lib/supabase";
import {
  getClientId,
  loadCustomActivities,
  loadCustomTemplates,
  loadTrip,
  saveCustomActivities,
  saveCustomTemplates,
  saveTrip,
} from "./utils/storage";
import { buildTemplateFromTrip, mergeTemplates } from "./utils/templateUtils";
import {
  buildBlankTrip,
  buildTripFromTemplate,
  getTripStats,
  isValidTripState,
  migrateTrip,
} from "./utils/tripUtils";

const STORAGE_KEY = "mmt-2025-trip";
const CUSTOM_ACTIVITIES_KEY = "mmt-custom-activities";
const CUSTOM_TEMPLATES_KEY = "mmt-custom-templates";
const CLIENT_ID_KEY = "mmt-2025-client-id";
const SHARED_TRIP_ID = "mmt-2025-maine";

export default function App() {
  // Auth state
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Check auth on mount and listen for changes
  useEffect(() => {
    // Check initial session
    getSession().then(({ data }) => {
      const session = data?.session;
      if (session?.user && isEmailAllowed(session.user.email)) {
        setUser(session.user);
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = onAuthStateChange((event, session) => {
      if (session?.user && isEmailAllowed(session.user.email)) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => subscription?.unsubscribe?.();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };

  // Show loading state
  if (authLoading) {
    return (
      <div className="login-screen">
        <div className="login-card" style={{ textAlign: "center" }}>
          <span style={{ fontSize: "2rem" }}>🦞</span>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Show login if not authenticated
  if (!user) {
    return <LoginScreen />;
  }

  // User is authenticated - render the app
  return <AuthenticatedApp user={user} onSignOut={handleSignOut} />;
}

function AuthenticatedApp({ user, onSignOut }) {
  const savedTrip = useMemo(() => {
    const loaded = loadTrip(STORAGE_KEY);
    return loaded ? migrateTrip(loaded) : null;
  }, []);
  const [customActivities, setCustomActivities] = useState(() =>
    loadCustomActivities(CUSTOM_ACTIVITIES_KEY)
  );
  const [customTemplates, setCustomTemplates] = useState(() =>
    loadCustomTemplates(CUSTOM_TEMPLATES_KEY)
  );
  const [syncStatus, setSyncStatus] = useState(
    supabaseEnabled ? "syncing" : "offline"
  );

  // Activity log state
  const [activityLogs, setActivityLogs] = useState([]);
  const [activityLogOpen, setActivityLogOpen] = useState(false);

  // Get family member info for logging
  const familyMember = useMemo(
    () => getFamilyMember(user?.email),
    [user?.email]
  );

  // Function to log an activity
  const logActivity = useCallback(
    async (action, details = {}) => {
      if (!supabaseEnabled || !user?.email) return;

      const entry = {
        user_email: user.email,
        user_name: familyMember?.name || user.email.split("@")[0],
        action,
        details: details.details || null,
        day_label: details.dayLabel || null,
        activity_name: details.activityName || null,
      };

      const { data, error } = await addActivityLog(entry);
      if (error) {
        console.warn("Failed to log activity:", error);
      } else if (data) {
        // Optimistically add to local state
        setActivityLogs((prev) => [data, ...prev]);
      }
    },
    [user?.email, familyMember?.name]
  );

  // Fetch activity logs on mount
  useEffect(() => {
    if (!supabaseEnabled) return;

    fetchActivityLogs(100).then(({ data, error }) => {
      if (error) {
        console.warn("Failed to fetch activity logs:", error);
      } else {
        setActivityLogs(data || []);
      }
    });
  }, []);

  // Subscribe to real-time activity log updates
  useEffect(() => {
    if (!supabaseEnabled) return;

    const subscription = subscribeToActivityLog((payload) => {
      const newLog = payload?.new;
      if (newLog) {
        // Avoid duplicates (in case we already added optimistically)
        setActivityLogs((prev) => {
          if (prev.some((log) => log.id === newLog.id)) return prev;
          return [newLog, ...prev];
        });
      }
    });

    return () => subscription?.unsubscribe?.();
  }, []);

  // Only show built-in trips + any custom templates the user saved
  const builtInTripIds = ["moms-original", "girls-michigan"];
  const templates = useMemo(
    () =>
      mergeTemplates(
        routeTemplates.filter((t) => builtInTripIds.includes(t.id)),
        customTemplates
      ),
    [customTemplates]
  );

  const [trip, setTrip] = useState(() => {
    if (savedTrip) return savedTrip;
    const momsTemplate = getRouteTemplate("moms-original");
    const seeded = buildTripFromTemplate(momsTemplate);
    return (
      seeded || buildBlankTrip({ dayCount: 7, name: "My New England Trip" })
    );
  });

  const tripStats = useMemo(() => getTripStats(trip.days), [trip.days]);

  const clientId = useMemo(() => getClientId(CLIENT_ID_KEY), []);
  const [remoteReady, setRemoteReady] = useState(false);
  const initialTripRef = useRef(trip);
  const initialCustomActivitiesRef = useRef(customActivities);
  const initialCustomTemplatesRef = useRef(customTemplates);
  const isApplyingRemoteRef = useRef(false);
  const lastSyncedRef = useRef(null);

  useEffect(() => {
    if (!remoteReady) {
      initialTripRef.current = trip;
      initialCustomActivitiesRef.current = customActivities;
      initialCustomTemplatesRef.current = customTemplates;
    }
  }, [trip, customActivities, customTemplates, remoteReady]);

  useEffect(() => {
    if (!supabaseEnabled) return;

    let cancelled = false;
    let subscription = null;

    async function bootstrapFromSupabase() {
      const { data, error } = await fetchSharedTripState(SHARED_TRIP_ID);
      if (cancelled) return;

      if (error) {
        console.warn("Supabase fetch shared trip failed:", error);
        setRemoteReady(true);
        return;
      }

      const remoteTrip = data?.state?.trip;
      const remoteCustomActivities = data?.state?.customActivities;
      const remoteCustomTemplates = data?.state?.customTemplates;

      console.log("[Supabase bootstrap] Loaded remote trip:", {
        hasTrip: !!remoteTrip,
        daysCount: remoteTrip?.days?.length,
        overnightStays: remoteTrip?.days?.map((d) => ({
          dayId: d.id,
          stay: d.overnightStay,
        })),
      });

      if (isValidTripState(remoteTrip) && remoteTrip.days.length) {
        setTrip(migrateTrip(remoteTrip));
      }

      // Load custom activities from remote if they exist
      if (
        remoteCustomActivities &&
        typeof remoteCustomActivities === "object"
      ) {
        setCustomActivities((prev) => ({ ...prev, ...remoteCustomActivities }));
      }

      // Load custom templates from remote if they exist (merge with local)
      if (
        Array.isArray(remoteCustomTemplates) &&
        remoteCustomTemplates.length
      ) {
        setCustomTemplates((prev) => {
          // Merge: keep all remote templates, add any local ones not already present
          const remoteIds = new Set(remoteCustomTemplates.map((t) => t.id));
          const uniqueLocal = prev.filter((t) => !remoteIds.has(t.id));
          return [...remoteCustomTemplates, ...uniqueLocal];
        });
      }

      // If no remote state, push current local state
      if (!data?.state?.initialized) {
        await upsertSharedTripState(
          {
            initialized: true,
            trip: initialTripRef.current,
            customActivities: initialCustomActivitiesRef.current,
            customTemplates: initialCustomTemplatesRef.current,
            updatedBy: clientId,
            updatedAt: Date.now(),
          },
          SHARED_TRIP_ID
        );
      }

      subscription = subscribeToSharedTrip(SHARED_TRIP_ID, (payload) => {
        const next = payload?.new?.state;
        if (!next) return;
        if (next?.updatedBy && next.updatedBy === clientId) return;

        // Mark that we're applying remote updates (skip sync-back)
        isApplyingRemoteRef.current = true;

        // Sync trip
        const nextTrip = next?.trip;
        if (isValidTripState(nextTrip) && nextTrip.days.length) {
          const migrated = migrateTrip(nextTrip);
          setTrip(migrated);
          saveTrip(STORAGE_KEY, migrated);
        }

        // Sync custom activities
        const nextCustomActivities = next?.customActivities;
        if (nextCustomActivities && typeof nextCustomActivities === "object") {
          setCustomActivities(nextCustomActivities);
          saveCustomActivities(CUSTOM_ACTIVITIES_KEY, nextCustomActivities);
        }

        // Sync custom templates
        const nextCustomTemplates = next?.customTemplates;
        if (Array.isArray(nextCustomTemplates)) {
          setCustomTemplates(nextCustomTemplates);
          saveCustomTemplates(CUSTOM_TEMPLATES_KEY, nextCustomTemplates);
        }

        // Clear the flag after sync effect debounce to prevent sync-back race condition
        setTimeout(() => {
          isApplyingRemoteRef.current = false;
        }, 750);
      });

      setRemoteReady(true);
      setSyncStatus("synced");
    }

    bootstrapFromSupabase();

    return () => {
      cancelled = true;
      subscription?.unsubscribe?.();
    };
  }, [clientId]);

  // Sync trip, customActivities, AND customTemplates to Supabase whenever any changes
  useEffect(() => {
    saveTrip(STORAGE_KEY, trip);
    saveCustomActivities(CUSTOM_ACTIVITIES_KEY, customActivities);
    saveCustomTemplates(CUSTOM_TEMPLATES_KEY, customTemplates);

    if (!supabaseEnabled || !remoteReady) return;

    // Skip sync if we're just applying remote updates
    if (isApplyingRemoteRef.current) return;

    // Create a hash to compare and avoid duplicate syncs
    const stateHash = JSON.stringify({
      trip,
      customActivities,
      customTemplates,
    });
    if (lastSyncedRef.current === stateHash) {
      return; // Already synced this exact state
    }

    setSyncStatus("syncing");

    const t = setTimeout(() => {
      const payload = {
        initialized: true,
        trip,
        customActivities,
        customTemplates,
        updatedBy: clientId,
        updatedAt: Date.now(),
      };

      console.log("[Supabase sync] Upserting trip state...", {
        daysCount: trip.days?.length,
        overnightStays: trip.days?.map((d) => ({
          dayId: d.id,
          stay: d.overnightStay,
        })),
      });

      upsertSharedTripState(payload, SHARED_TRIP_ID)
        .then(() => {
          lastSyncedRef.current = stateHash;
          setSyncStatus("synced");
          console.log("[Supabase sync] Success!");
        })
        .catch((e) => {
          console.warn("Supabase upsert shared trip failed:", e);
          setSyncStatus("offline");
        });
    }, 600);

    return () => clearTimeout(t);
  }, [trip, customActivities, customTemplates, remoteReady, clientId]);

  const handleLoadTemplate = (templateId) => {
    if (templateId === "blank") {
      setTrip(buildBlankTrip({ dayCount: 7, name: "My Custom Trip" }));
      logActivity("load_template", { details: "Started a blank trip" });
      return;
    }
    const template = templates.find((item) => item.id === templateId);
    if (!template) return;

    // When loading a read-only template, we're working on a copy
    // The original template stays pristine - changes only affect the working copy
    const newTrip = buildTripFromTemplate(template);

    // If it's a read-only template, mark it as "based on" but give it a working ID
    // This ensures any edits don't claim to be the original template
    if (template.readOnly) {
      newTrip.basedOnTemplate = template.id;
      newTrip.templateId = `working-${template.id}`;
    }

    setTrip(newTrip);
    logActivity("load_template", { details: `Loaded "${template.name}"` });
  };

  const handleSaveTemplate = () => {
    const name = window.prompt(
      "Name this template",
      trip.name || "Custom Trip"
    );
    if (!name) return;
    const next = buildTemplateFromTrip(trip, { name });
    setCustomTemplates((prev) => [...prev, next]);
  };

  return (
    <div className="app">
      <Header
        tripName={trip.name}
        tripStats={tripStats}
        templates={templates}
        selectedTemplateId={trip.templateId}
        basedOnTemplate={trip.basedOnTemplate}
        onLoadTemplate={(templateId) => {
          handleLoadTemplate(templateId);
        }}
        onSaveTemplate={handleSaveTemplate}
        syncStatus={syncStatus}
        user={user}
        onSignOut={onSignOut}
      />

      <main className="main">
        <TripBuilderView
          trip={trip}
          setTrip={setTrip}
          customActivities={customActivities}
          setCustomActivities={setCustomActivities}
          logActivity={logActivity}
        />
      </main>

      <ActivityLog
        logs={activityLogs}
        isOpen={activityLogOpen}
        onToggle={() => setActivityLogOpen((prev) => !prev)}
      />

      <footer className="footer">
        <p>Made with 💕 for Mom&#39;s adventures.</p>
      </footer>
    </div>
  );
}
