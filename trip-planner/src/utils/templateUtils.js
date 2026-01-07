export function buildTemplateFromTrip(trip, { name, emoji = '+', source = 'custom' } = {}) {
  const templateName = name || trip.name || 'Custom Trip';
  return {
    id: `custom-${Date.now()}`,
    name: templateName,
    emoji,
    source,
    description: `Saved from ${new Date().toLocaleDateString()}`,
    duration: `${trip.days.length} days`,
    totalMiles: 'TBD',
    driveTime: 'TBD',
    flyIn: '',
    flyOut: '',
    vibe: 'Personalized plan',
    bestFor: ['Custom'],
    countries: [],
    states: [],
    days: trip.days.map((day) => ({
      dayNumber: day.dayNumber,
      label: day.label,
      location: day.location,
      type: day.type,
      notes: day.notes,
      suggestedActivities: day.activities,
      lodging: day.lodging || null,
      flexible: true
    })),
    alternatives: []
  };
}

export function mergeTemplates(routeTemplates, customTemplates) {
  const safeCustom = Array.isArray(customTemplates) ? customTemplates : [];
  return [...routeTemplates, ...safeCustom];
}
