/**
 * Supabase Client Configuration for MMT-2025
 * 
 * Provides authenticated access to backend services:
 * - Team member authentication (Mom, Renee, Gunnar)
 * - Trip selection persistence
 * - Activity preferences sync
 * - Shared trip state
 */

import { createClient } from '@supabase/supabase-js';

// Supabase project credentials
// Using the same Supabase instance as DDG-PCT for shared family backend
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://tnqvxjtqvmmacrfqpelj.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRucXZ4anRxdm1tYWNyZnFwZWxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4OTk5ODQsImV4cCI6MjA4MDQ3NTk4NH0.zikr2QDr5OdLrZTkNZv-rF9rPCh2DlY_XCW2pZDnCD4';

/** Whether Supabase is configured and ready */
export const supabaseReady = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/**
 * Main Supabase client instance
 * Handles auth state automatically via localStorage
 */
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
});

/**
 * MMT Team member info for display
 * Matches mmtTeam in planContent.js
 */
export const MMT_TEAM = {
  mom: { 
    name: 'Mom', 
    emoji: '👩‍👧', 
    role: 'Trip Lead',
    email: 'smileyguy@aol.com' // Dad's email - Mom uses same account
  },
  renee: { 
    name: 'Renee', 
    emoji: '👰', 
    role: 'Co-Planner',
    email: null // Will add when known
  },
  gunnar: { 
    name: 'Gunnar', 
    emoji: '🧑‍💻', 
    role: 'Tech Support',
    email: 'gunnarguy@me.com'
  },
};

/**
 * Whitelisted MMT team emails
 * Only these emails can access team features
 */
export const MMT_ALLOWED_EMAILS = [
  'smileyguy@aol.com',        // Mom (via Dad's account)
  'gunnarguy@me.com',         // Gunnar
  'gunnarguy@aol.com',        // Gunnar (alt)
];

/**
 * Check if an email is whitelisted for MMT
 */
export const isAllowedEmail = (email) => {
  if (!email) return false;
  return MMT_ALLOWED_EMAILS.includes(email.toLowerCase());
};

/**
 * Get traveler ID from email
 */
export const getTravelerIdFromEmail = (email) => {
  if (!email) return null;
  const lower = email.toLowerCase();
  if (lower === 'smileyguy@aol.com') return 'mom';
  if (lower === 'gunnarguy@me.com' || lower === 'gunnarguy@aol.com') return 'gunnar';
  return null;
};

/**
 * Check if email is admin (Gunnar)
 */
export const isAdminEmail = (email) => {
  if (!email) return false;
  const lower = email.toLowerCase();
  return lower === 'gunnarguy@me.com' || lower === 'gunnarguy@aol.com';
};

/**
 * Helper to get current session
 */
export const getSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) {
    console.warn('Session fetch error:', error);
    return null;
  }
  return session;
};

/**
 * Helper to get current user
 */
export const getCurrentUser = async () => {
  const session = await getSession();
  return session?.user || null;
};

/**
 * Sign in with magic link (email)
 */
export const signInWithEmail = async (email) => {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: window.location.origin,
    },
  });
  return { data, error };
};

/**
 * Sign out current user
 */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

/**
 * Subscribe to auth state changes
 */
export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
};

// ============================================
// TRIP DATA PERSISTENCE
// ============================================

/**
 * Save trip selections to Supabase
 * Stores user's selected activities, lodging, etc.
 */
export const saveTripSelections = async (userId, selections) => {
  const { data, error } = await supabase
    .from('mmt_trip_selections')
    .upsert({
      user_id: userId,
      selections: selections,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'user_id',
    });
  
  if (error) {
    console.warn('Error saving selections:', error);
  }
  return { data, error };
};

/**
 * Load trip selections from Supabase
 */
export const loadTripSelections = async (userId) => {
  const { data, error } = await supabase
    .from('mmt_trip_selections')
    .select('selections')
    .eq('user_id', userId)
    .single();
  
  if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
    console.warn('Error loading selections:', error);
  }
  return { data: data?.selections || null, error };
};

/**
 * Save shared trip state (visible to all team members)
 */
export const saveSharedTripState = async (tripState) => {
  const { data, error } = await supabase
    .from('mmt_shared_trip')
    .upsert({
      id: 'mmt-2025-maine',
      state: tripState,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'id',
    });
  
  if (error) {
    console.warn('Error saving shared state:', error);
  }
  return { data, error };
};

/**
 * Load shared trip state
 */
export const loadSharedTripState = async () => {
  const { data, error } = await supabase
    .from('mmt_shared_trip')
    .select('state')
    .eq('id', 'mmt-2025-maine')
    .single();
  
  if (error && error.code !== 'PGRST116') {
    console.warn('Error loading shared state:', error);
  }
  return { data: data?.state || null, error };
};

/**
 * Subscribe to shared trip state changes (real-time)
 */
export const subscribeToSharedTrip = (callback) => {
  return supabase
    .channel('mmt_shared_trip_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'mmt_shared_trip',
        filter: 'id=eq.mmt-2025-maine',
      },
      (payload) => {
        callback(payload.new?.state || null);
      }
    )
    .subscribe();
};

export default supabase;
