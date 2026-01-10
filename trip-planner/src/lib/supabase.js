import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabaseEnabled = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = supabaseEnabled
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Allowed emails for this family trip planner
const ALLOWED_EMAILS = [
  'italgalpal@gmail.com',
  'mikaelahostetler@gmail.com',
  'gunnarguy@me.com' // Adding you too!
]

export function isEmailAllowed(email) {
  return ALLOWED_EMAILS.includes(email?.toLowerCase())
}

// Auth functions
export async function signInWithEmail(email) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') }
  
  // Check if email is allowed before sending magic link
  if (!isEmailAllowed(email)) {
    return { data: null, error: new Error('This email is not authorized to access this trip planner.') }
  }
  
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: window.location.origin + window.location.pathname,
    }
  })
  
  return { data, error }
}

export async function signOut() {
  if (!supabase) return { error: null }
  return await supabase.auth.signOut()
}

export async function getSession() {
  if (!supabase) return { data: { session: null }, error: null }
  return await supabase.auth.getSession()
}

export function onAuthStateChange(callback) {
  if (!supabase) return { data: { subscription: { unsubscribe: () => {} } } }
  return supabase.auth.onAuthStateChange(callback)
}

const SHARED_TRIP_TABLE = 'mmt_shared_trip'
const DEFAULT_SHARED_TRIP_ID = 'mmt-2025-maine'

export async function fetchSharedTripState(sharedTripId = DEFAULT_SHARED_TRIP_ID) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') }

  const { data, error } = await supabase
    .from(SHARED_TRIP_TABLE)
    .select('id,state,updated_at')
    .eq('id', sharedTripId)
    .maybeSingle()

  return { data, error }
}

export async function upsertSharedTripState(state, sharedTripId = DEFAULT_SHARED_TRIP_ID) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') }

  const { data, error } = await supabase
    .from(SHARED_TRIP_TABLE)
    .upsert({ id: sharedTripId, state }, { onConflict: 'id' })
    .select('id,state,updated_at')
    .single()

  return { data, error }
}

export function subscribeToSharedTrip(sharedTripId, onChange) {
  if (!supabase) return { unsubscribe: () => {} }

  const channel = supabase
    .channel(`shared-trip:${sharedTripId}`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: SHARED_TRIP_TABLE, filter: `id=eq.${sharedTripId}` },
      (payload) => {
        onChange?.(payload)
      }
    )
    .subscribe()

  return {
    unsubscribe: () => {
      supabase.removeChannel(channel)
    }
  }
}
