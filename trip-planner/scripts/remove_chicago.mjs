import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://miihwxxgqyyotptiihej.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1paWh3eHhncXl5b3RwdGlpaGVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODg0MDEsImV4cCI6MjA4MjQ2NDQwMX0.lq2BH0iG1891KyvhCcJ0cHJunuLRTcDtk2W1jvQ0V5w'
);

async function fixTrip() {
  console.log('Fetching trip from Supabase...');

  const { data, error } = await supabase
    .from("mmt_shared_trip")
    .select("*")
    .eq("id", "mmt-2025-maine")
    .single();

  if (error) {
    console.log("Error fetching:", error);
    return;
  }

  // Data is in data.state.trip
  const tripData = data.state.trip;
  console.log("Trip name:", tripData.name);
  console.log("Days:", tripData.days.length);

  let changed = false;

  tripData.days.forEach((day, i) => {
    const before = day.activities.length;
    day.activities = day.activities.filter((id) => id !== "mi-city-chicago");
    if (day.activities.length !== before) {
      console.log("Removed Chicago from Day", i + 1);
      changed = true;
    }
  });

  if (!changed) {
    console.log('Chicago not found in any day activities');
    return;
  }

  const { error: updateError } = await supabase
    .from("mmt_shared_trip")
    .update({ state: { ...data.state, trip: tripData } })
    .eq("id", "mmt-2025-maine");

  if (updateError) {
    console.log('Error updating:', updateError);
  } else {
    console.log('✅ Successfully removed Chicago from Supabase!');
  }
}

fixTrip();
