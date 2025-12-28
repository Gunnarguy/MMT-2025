import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabaseEnabled = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = supabaseEnabled
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

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
