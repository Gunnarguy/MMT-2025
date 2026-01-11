import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useRef, useState } from "react";
import "./lib/leafletConfig";
import "./styles/app.css";

import Header from "./components/Header";
import LoginScreen from "./components/LoginScreen";
import TripBuilderView from "./components/TripBuilderView";

import { getRouteTemplate, routeTemplates } from "./data/templates";
import {
  fetchSharedTripState,
  getSession,
  isEmailAllowed,
  onAuthStateChange,
  signOut,
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
  const savedTrip = useMemo(() => loadTrip(STORAGE_KEY), []);
  const [customActivities, setCustomActivities] = useState(() =>
    loadCustomActivities(CUSTOM_ACTIVITIES_KEY)
  );
  const [customTemplates, setCustomTemplates] = useState(() =>
    loadCustomTemplates(CUSTOM_TEMPLATES_KEY)
  );
  const [syncStatus, setSyncStatus] = useState(
    supabaseEnabled ? "syncing" : "offline"
  );

  // Only show Mom's trips + any custom templates the user saved
  const momsTripIds = ["moms-original", "girls-michigan"];
  const templates = useMemo(
    () =>
      mergeTemplates(
        routeTemplates.filter((t) => momsTripIds.includes(t.id)),
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

  useEffect(() => {
    if (!remoteReady) {
      initialTripRef.current = trip;
      initialCustomActivitiesRef.current = customActivities;
    }
  }, [trip, customActivities, remoteReady]);

  useEffect(() => {
    saveCustomTemplates(CUSTOM_TEMPLATES_KEY, customTemplates);
  }, [customTemplates]);

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

      if (isValidTripState(remoteTrip) && remoteTrip.days.length) {
        setTrip(remoteTrip);
      }

      // Load custom activities from remote if they exist
      if (
        remoteCustomActivities &&
        typeof remoteCustomActivities === "object"
      ) {
        setCustomActivities((prev) => ({ ...prev, ...remoteCustomActivities }));
      }

      // If no remote state, push current local state
      if (!data?.state?.initialized) {
        await upsertSharedTripState(
          {
            initialized: true,
            trip: initialTripRef.current,
            customActivities: initialCustomActivitiesRef.current,
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

        // Sync trip
        const nextTrip = next?.trip;
        if (isValidTripState(nextTrip) && nextTrip.days.length) {
          setTrip(nextTrip);
          saveTrip(STORAGE_KEY, nextTrip);
        }

        // Sync custom activities
        const nextCustomActivities = next?.customActivities;
        if (nextCustomActivities && typeof nextCustomActivities === "object") {
          setCustomActivities(nextCustomActivities);
          saveCustomActivities(CUSTOM_ACTIVITIES_KEY, nextCustomActivities);
        }
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

  // Sync trip AND customActivities to Supabase whenever either changes
  useEffect(() => {
    saveTrip(STORAGE_KEY, trip);
    saveCustomActivities(CUSTOM_ACTIVITIES_KEY, customActivities);

    if (!supabaseEnabled || !remoteReady) return;

    setSyncStatus("syncing");

    const t = setTimeout(() => {
      upsertSharedTripState(
        {
          initialized: true,
          trip,
          customActivities,
          updatedBy: clientId,
          updatedAt: Date.now(),
        },
        SHARED_TRIP_ID
      )
        .then(() => {
          setSyncStatus("synced");
        })
        .catch((e) => {
          console.warn("Supabase upsert shared trip failed:", e);
          setSyncStatus("offline");
        });
    }, 600);

    return () => clearTimeout(t);
  }, [trip, customActivities, remoteReady, clientId]);

  const handleLoadTemplate = (templateId) => {
    if (templateId === "blank") {
      setTrip(buildBlankTrip({ dayCount: 7, name: "My Custom Trip" }));
      return;
    }
    const template = templates.find((item) => item.id === templateId);
    if (!template) return;
    setTrip(buildTripFromTemplate(template));
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
        />
      </main>

      <footer className="footer">
        <p>Made with 💕 for Mom&#39;s adventures.</p>
      </footer>
    </div>
  );
}
