import { createClient } from "@supabase/supabase-js";

// NOTE: The Supabase anon key is public (it ships to the browser in production).
// We still prefer env vars, but we keep a fallback so family members can run the
// app (or cached builds) without a local `.env`.
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://miihwxxgqyyotptiihej.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1paWh3eHhncXl5b3RwdGlpaGVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODg0MDEsImV4cCI6MjA4MjQ2NDQwMX0.lq2BH0iG1891KyvhCcJ0cHJunuLRTcDtk2W1jvQ0V5w";

export const supabaseEnabled = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = supabaseEnabled
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Allowed emails for this family trip planner
const ALLOWED_EMAILS = [
  "italgalpal@gmail.com",
  "mikaelahostetler@gmail.com",
  "gunnarguy@me.com", // Adding you too!
];

// Friendly names for family members
const FAMILY_MEMBERS = {
  "italgalpal@gmail.com": { name: "Mom", emoji: "👩‍🦳", color: "#e91e63" },
  "mikaelahostetler@gmail.com": { name: "Mikaela", emoji: "💕", color: "#9c27b0" },
  "gunnarguy@me.com": { name: "Gunnar", emoji: "🦞", color: "#2196f3" },
};

export function isEmailAllowed(email) {
  return ALLOWED_EMAILS.includes(email?.toLowerCase());
}

export function getFamilyMember(email) {
  const normalized = email?.toLowerCase();
  return (
    FAMILY_MEMBERS[normalized] || {
      name: email?.split("@")[0] || "Guest",
      emoji: "👤",
      color: "#757575",
    }
  );
}

// Auth functions
export async function signInWithEmail(email) {
  if (!supabase)
    return { data: null, error: new Error("Supabase not configured") };

  // Check if email is allowed before sending magic link
  if (!isEmailAllowed(email)) {
    return {
      data: null,
      error: new Error(
        "This email is not authorized to access this trip planner."
      ),
    };
  }

  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: window.location.origin + window.location.pathname,
    },
  });

  return { data, error };
}

export async function signOut() {
  if (!supabase) return { error: null };
  return await supabase.auth.signOut();
}

export async function getSession() {
  if (!supabase) return { data: { session: null }, error: null };
  return await supabase.auth.getSession();
}

export function onAuthStateChange(callback) {
  if (!supabase) return { data: { subscription: { unsubscribe: () => {} } } };
  return supabase.auth.onAuthStateChange(callback);
}

const SHARED_TRIP_TABLE = "mmt_shared_trip";
const DEFAULT_SHARED_TRIP_ID = "mmt-2025-maine";

export async function fetchSharedTripState(
  sharedTripId = DEFAULT_SHARED_TRIP_ID
) {
  if (!supabase)
    return { data: null, error: new Error("Supabase not configured") };

  const { data, error } = await supabase
    .from(SHARED_TRIP_TABLE)
    .select("id,state,updated_at")
    .eq("id", sharedTripId)
    .maybeSingle();

  return { data, error };
}

export async function upsertSharedTripState(
  state,
  sharedTripId = DEFAULT_SHARED_TRIP_ID
) {
  if (!supabase)
    return { data: null, error: new Error("Supabase not configured") };

  const { data, error } = await supabase
    .from(SHARED_TRIP_TABLE)
    .upsert({ id: sharedTripId, state }, { onConflict: "id" })
    .select("id,state,updated_at")
    .single();

  return { data, error };
}

export function subscribeToSharedTrip(sharedTripId, onChange) {
  if (!supabase) return { unsubscribe: () => {} };

  const channel = supabase
    .channel(`shared-trip:${sharedTripId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: SHARED_TRIP_TABLE,
        filter: `id=eq.${sharedTripId}`,
      },
      (payload) => {
        onChange?.(payload);
      }
    )
    .subscribe();

  return {
    unsubscribe: () => {
      supabase.removeChannel(channel);
    },
  };
}
