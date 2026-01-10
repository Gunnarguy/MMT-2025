import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useRef, useState } from "react";
import "./lib/leafletConfig";
import "./styles/app.css";
import "./styles/moms-route.css";

import Header from "./components/Header";
import MomsRouteView from "./components/MomsRouteView";
import TripBuilderView from "./components/TripBuilderView";

import { momsRoute } from "./data/momsRoute";
import { getRouteTemplate, routeTemplates } from "./data/templates";
import {
  fetchSharedTripState,
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
  const savedTrip = useMemo(() => loadTrip(STORAGE_KEY), []);
  const [activeView, setActiveView] = useState(() =>
    savedTrip ? "builder" : "moms"
  );
  const [customActivities, setCustomActivities] = useState(() =>
    loadCustomActivities(CUSTOM_ACTIVITIES_KEY)
  );
  const [customTemplates, setCustomTemplates] = useState(() =>
    loadCustomTemplates(CUSTOM_TEMPLATES_KEY)
  );
  const [syncStatus, setSyncStatus] = useState(
    supabaseEnabled ? "syncing" : "offline"
  );

  const templates = useMemo(
    () => mergeTemplates(routeTemplates, customTemplates),
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
  const momsStats = useMemo(() => {
    const activities = momsRoute.stops.reduce(
      (sum, stop) => sum + stop.activities.length,
      0
    );
    return { days: momsRoute.stops.length, activities };
  }, []);
  const headerStats = activeView === "moms" ? momsStats : tripStats;

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

  const handleCopyToBuilder = () => {
    handleLoadTemplate("moms-original");
    setActiveView("builder");
  };

  return (
    <div className="app">
      <Header
        activeView={activeView}
        onViewChange={setActiveView}
        tripStats={headerStats}
        templates={templates}
        selectedTemplateId={trip.templateId}
        onLoadTemplate={(templateId) => {
          handleLoadTemplate(templateId);
          setActiveView("builder");
        }}
        onSaveTemplate={handleSaveTemplate}
        syncStatus={syncStatus}
      />

      <main className="main">
        {activeView === "moms" ? (
          <MomsRouteView onCopyToBuilder={handleCopyToBuilder} />
        ) : (
          <TripBuilderView
            trip={trip}
            setTrip={setTrip}
            customActivities={customActivities}
            setCustomActivities={setCustomActivities}
          />
        )}
      </main>

      <footer className="footer">
        <p>
          Created with love and a lot of lobster. Build the trip that feels
          right.
        </p>
      </footer>
    </div>
  );
}
