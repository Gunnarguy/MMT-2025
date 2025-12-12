import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import './App.css'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup } from 'react-leaflet'
import { tripData } from './data'
import { searchService } from './services/searchService'
import { 
  dayItinerary, 
  scheduleOptions, 
  exploreCatalog, 
  lodging
} from './data/tripData'

// ============================================
// UTILITY FUNCTIONS
// ============================================

// NOTE:
// We used to fetch OSRM routes between points. The current UI renders polylines
// from tripData.map and markers from activities, so this helper is not currently
// needed. Keeping the cache + distance utilities for potential future use.

// Activity styling
const activityTypes = {
  lobster: { icon: '🦞', color: '#e74c3c', label: 'Lobster' },
  town: { icon: '⚓', color: '#1abc9c', label: 'Town' },
  foliage: { icon: '🍁', color: '#e67e22', label: 'Foliage' },
  drive: { icon: '🚗', color: '#9b59b6', label: 'Scenic Drive' },
  lodging: { icon: '🏨', color: '#3498db', label: 'Lodging' },
  food: { icon: '🍽️', color: '#f39c12', label: 'Food' },
  landmark: { icon: '📸', color: '#2ecc71', label: 'Landmark' },
  hike: { icon: '🥾', color: '#27ae60', label: 'Hike' },
  cafe: { icon: '☕', color: '#8b4513', label: 'Cafe' },

  // Types returned by searchService (OpenStreetMap / Nominatim)
  restaurant: { icon: '🍽️', color: '#f39c12', label: 'Restaurant' },
  bar: { icon: '🍺', color: '#8e44ad', label: 'Bar' },
  museum: { icon: '🏛️', color: '#34495e', label: 'Museum' },
  park: { icon: '🌲', color: '#27ae60', label: 'Park' },
  shopping: { icon: '🛍️', color: '#d35400', label: 'Shopping' },
  attraction: { icon: '✨', color: '#2ecc71', label: 'Attraction' },
  viewpoint: { icon: '👀', color: '#2980b9', label: 'Viewpoint' },
  custom: { icon: '📍', color: '#7f8c8d', label: 'Custom' },
}

// ============================================
// COMPACT COUNTDOWN
// ============================================
function CompactCountdown({ targetDate }) {
  const calc = useCallback(() => {
    const diff = new Date(targetDate) - new Date()
    if (diff <= 0) return { days: 0, hours: 0, passed: true }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      passed: false,
    }
  }, [targetDate])

  const [timeLeft, setTimeLeft] = useState(() => calc())
  
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calc()), 60000)
    return () => clearInterval(timer)
  }, [calc])

  if (timeLeft.passed) return <span className="countdown-chip live">🎉 Trip time!</span>
  return (
    <span className="countdown-chip">
      ⏳ {timeLeft.days}d {timeLeft.hours}h to go
    </span>
  )
}

// ============================================
// ACTIVITY CARD (Used everywhere)
// ============================================
function ActivityCard({ activity, isAdded, onAdd, onRemove, compact = false }) {
  const type = activityTypes[activity.type] || activityTypes.custom
  
  if (compact) {
    return (
      <div className={`activity-mini ${activity.type}`}>
        <span className="mini-icon">{type.icon}</span>
        <div className="mini-info">
          <strong>{activity.name}</strong>
          <span>{activity.location}</span>
        </div>
        <button 
          className="mini-remove" 
          onClick={() => onRemove(activity.id)}
          title="Remove"
        >×</button>
      </div>
    )
  }

  return (
    <div className={`activity-card ${activity.type} ${isAdded ? 'is-added' : ''}`}>
      <div className="card-header">
        <span className="type-badge" style={{ background: type.color }}>
          {type.icon} {type.label}
        </span>
        {activity.rating && (
          <span className="rating">⭐ {activity.rating}</span>
        )}
      </div>
      
      <h3>{activity.name}</h3>
      <p className="location">📍 {activity.location}</p>
      
      {activity.description && (
        <p className="description">{activity.description}</p>
      )}
      
      {activity.details && (
        <p className="details"><strong>✨</strong> {activity.details}</p>
      )}
      
      {activity.tip && (
        <p className="tip">💡 {activity.tip}</p>
      )}
      
      <div className="card-footer">
        {activity.duration && (
          <span className="duration">⏱️ ~{activity.duration}h</span>
        )}
        {activity.price && (
          <span className="price">{activity.price}</span>
        )}
        
        <button 
          className={`add-btn ${isAdded ? 'added' : ''}`}
          onClick={() => isAdded ? onRemove(activity.id) : onAdd(activity)}
        >
          {isAdded ? '✓ In Trip' : '+ Add to Trip'}
        </button>
      </div>
    </div>
  )
}

// ============================================
// MAIN APP COMPONENT
// ============================================
function App() {
  const { 
    title, subtitle,
    travelers, tripDates, packingChecklist,
    lobsterGuide, harborTowns, foliageTracker,
    map, logistics
  } = tripData

  // ════════════════════════════════════════════════════════════════
  // CORE NAVIGATION
  // Two primary tabs:
  //  - Mom's Route: the original suggested route (MMTrip.txt)
  //  - Build & Customize: drag/drop blocks + discovery catalog
  // ════════════════════════════════════════════════════════════════
  const [activeTab, setActiveTab] = useState('mom') // 'mom' | 'build'

  // Build tab sub-sections (kept intentionally lightweight)
  const [buildSection, setBuildSection] = useState('schedule') // 'schedule' | 'discover' | 'toolkit'

  const [discoverFilter, setDiscoverFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Discover: "Search any place" (Google-Maps-ish) using OpenStreetMap sources
  const [placeSearchQuery, setPlaceSearchQuery] = useState('')
  const [placeSearchRegion, setPlaceSearchRegion] = useState('maine_coast')
  const [placeSearchResults, setPlaceSearchResults] = useState([])
  const [placeSearchLoading, setPlaceSearchLoading] = useState(false)
  const [placeSearchError, setPlaceSearchError] = useState('')

  // Mom route option selector (content comes from scheduleOptions/dayItinerary)
  const [momRouteOption, setMomRouteOption] = useState('classic')

  const selectedMomOption = useMemo(() => {
    return scheduleOptions.find(o => o.id === momRouteOption) || scheduleOptions[0]
  }, [momRouteOption])
  
  // Trip building state
  const [selectedActivities, setSelectedActivities] = useState(() => {
    const saved = localStorage.getItem('mmt-activities')
    return saved ? JSON.parse(saved) : []
  })

  const seedBuilderFromMomRoute = useCallback(() => {
    const stopToDayId = {
      boston: 1,
      portland: 3,
      kanc: 4,
      chelsea: 4,
      burlington: 6,
      montreal: 6,
      'lake-placid': 8,
      saratoga: 8,
      albany: 8,
      stockbridge: 8,
    }

    // Build blocks from Mom route stops.
    const routeStops = [...(map?.stops || []), ...(map?.alternativeStops || [])]
    const nextActivities = routeStops.map((stop) => ({
      id: `mom-stop-${stop.id}`,
      type: 'custom',
      name: stop.name,
      location: 'Mom route stop',
      coordinates: stop.coords,
      description: stop.mmNote,
      details: stop.researchNote,
      tip: stop.category === 'alt' ? 'Alternative idea' : undefined,
      dayId: stopToDayId[stop.id] || null,
      order: null,
      duration: 0.5,
    }))

    // Normalize ordering within each day.
    const byDay = new Map()
    nextActivities.forEach((a) => {
      if (!a.dayId) return
      const list = byDay.get(a.dayId) || []
      list.push(a)
      byDay.set(a.dayId, list)
    })
    byDay.forEach((list) => {
      list.forEach((a, idx) => {
        a.order = idx
      })
    })

    setSelectedActivities((prev) => {
      if (prev.length > 0) {
        const ok = window.confirm(
          "Replace your current Build & Customize activities with Mom's route blocks?\n\n(Press Cancel to keep your current plan.)"
        )
        if (!ok) return prev
      }
      return nextActivities
    })

    setActiveTab('build')
    setBuildSection('schedule')
  }, [map])
  
  // Use the Mom itinerary as the canonical day structure (still fully customizable).
  const tripDays = useMemo(() => {
    return dayItinerary.map(d => ({
      id: d.id,
      date: d.date,
      label: `Day ${d.dayNumber}`,
      location: d.label,
    }))
  }, [])

  // Packing checklist state
  const [packedItems, setPackedItems] = useState(() => {
    const saved = localStorage.getItem('mmt-packed')
    return saved ? JSON.parse(saved) : {}
  })

  // Toolkit: export/import/share state
  const [toolkitStatus, setToolkitStatus] = useState('')
  const [toolkitError, setToolkitError] = useState('')
  const [shareCodeInput, setShareCodeInput] = useState('')

  // Persist state
  useEffect(() => {
    localStorage.setItem('mmt-activities', JSON.stringify(selectedActivities))
  }, [selectedActivities])
  
  useEffect(() => {
    localStorage.setItem('mmt-packed', JSON.stringify(packedItems))
  }, [packedItems])

  // ════════════════════════════════════════════════════════════════
  // TOOLKIT: EXPORT / IMPORT
  // ════════════════════════════════════════════════════════════════
  const buildExportPayload = useCallback(() => {
    return {
      schemaVersion: 1,
      exportedAt: new Date().toISOString(),
      app: 'MMT-2025 Trip Planner',

      // Builder state
      selectedActivities,
      packedItems,

      // Helpful context
      momRouteOption,
      tripDays,
    }
  }, [selectedActivities, packedItems, momRouteOption, tripDays])

  const downloadBlob = useCallback((filename, content, mimeType) => {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }, [])

  const formatItineraryText = useCallback(() => {
    const lines = []

    lines.push('MMT Trip Planner — Build & Customize')
    lines.push(`Exported: ${new Date().toLocaleString()}`)
    lines.push('')

    const scheduledCount = selectedActivities.filter(a => a.dayId).length
    lines.push(`Activities: ${selectedActivities.length} total • ${scheduledCount} scheduled • ${selectedActivities.length - scheduledCount} unscheduled`)
    lines.push('')

    tripDays.forEach((day) => {
      const acts = selectedActivities
        .filter(a => a.dayId === day.id)
        .slice()
        .sort((a, b) => {
          const ao = typeof a.order === 'number' ? a.order : Number.MAX_SAFE_INTEGER
          const bo = typeof b.order === 'number' ? b.order : Number.MAX_SAFE_INTEGER
          if (ao !== bo) return ao - bo
          return String(a.name || '').localeCompare(String(b.name || ''))
        })

      lines.push(`Day ${day.id} — ${day.location} (${day.date})`)
      if (acts.length === 0) {
        lines.push('  (no scheduled activities)')
      } else {
        acts.forEach((a, idx) => {
          const icon = activityTypes[a.type]?.icon || '📍'
          const coordText = Array.isArray(a.coordinates) ? ` [${a.coordinates[0].toFixed?.(4) ?? a.coordinates[0]}, ${a.coordinates[1].toFixed?.(4) ?? a.coordinates[1]}]` : ''
          lines.push(`  ${idx + 1}. ${icon} ${a.name}${a.location ? ` — ${a.location}` : ''}${coordText}`)
          if (a.description) lines.push(`     Notes: ${a.description}`)
          if (a.details) lines.push(`     Details: ${a.details}`)
          if (a.tip) lines.push(`     Tip: ${a.tip}`)
          if (a.website) lines.push(`     Website: ${a.website}`)
          if (a.phone) lines.push(`     Phone: ${a.phone}`)
        })
      }
      lines.push('')
    })

    const unscheduled = selectedActivities
      .filter(a => !a.dayId)
      .slice()
      .sort((a, b) => String(a.name || '').localeCompare(String(b.name || '')))

    if (unscheduled.length > 0) {
      lines.push('Unscheduled')
      unscheduled.forEach((a) => {
        const icon = activityTypes[a.type]?.icon || '📍'
        lines.push(`  - ${icon} ${a.name}${a.location ? ` — ${a.location}` : ''}`)
      })
      lines.push('')
    }

    return lines.join('\n')
  }, [selectedActivities, tripDays])

  const exportAsJson = useCallback(() => {
    setToolkitStatus('')
    setToolkitError('')
    const payload = buildExportPayload()
    downloadBlob('mmt-itinerary.json', JSON.stringify(payload, null, 2), 'application/json')
    setToolkitStatus('Downloaded JSON export.')
  }, [buildExportPayload, downloadBlob])

  const exportAsText = useCallback(() => {
    setToolkitStatus('')
    setToolkitError('')
    const text = formatItineraryText()
    downloadBlob('mmt-itinerary.txt', text, 'text/plain')
    setToolkitStatus('Downloaded text itinerary.')
  }, [downloadBlob, formatItineraryText])

  const copyShareCode = useCallback(async () => {
    setToolkitStatus('')
    setToolkitError('')
    try {
      const json = JSON.stringify(buildExportPayload())
      const encoded = btoa(unescape(encodeURIComponent(json)))
      await navigator.clipboard.writeText(encoded)
      setToolkitStatus('Copied share code to clipboard.')
    } catch (err) {
      console.error(err)
      setToolkitError('Could not copy. Your browser may block clipboard access.')
    }
  }, [buildExportPayload])

  const applyImportedPayload = useCallback((payload) => {
    if (!payload || typeof payload !== 'object') {
      throw new Error('Invalid file format')
    }

    const nextActivities = Array.isArray(payload.selectedActivities) ? payload.selectedActivities : null
    const nextPacked = payload.packedItems && typeof payload.packedItems === 'object' ? payload.packedItems : null

    if (!nextActivities) {
      throw new Error('Missing selectedActivities')
    }

    // Minimal normalization so older exports don’t crash the UI.
    const normalized = nextActivities.map((a) => ({
      id: a.id,
      type: a.type || 'custom',
      name: a.name || 'Untitled',
      location: a.location || '',
      coordinates: Array.isArray(a.coordinates) ? a.coordinates : null,
      description: a.description || '',
      details: a.details || '',
      tip: a.tip || '',
      website: a.website || undefined,
      phone: a.phone || undefined,
      dayId: a.dayId || null,
      order: typeof a.order === 'number' ? a.order : null,
      duration: a.duration || undefined,
      source: a.source || undefined,
      sourceId: a.sourceId || undefined,
    }))

    setSelectedActivities((prev) => {
      if (prev.length > 0) {
        const ok = window.confirm(
          'Importing will replace your current Build & Customize plan. Continue?'
        )
        if (!ok) return prev
      }
      return normalized
    })

    if (nextPacked) {
      setPackedItems(nextPacked)
    }

    setActiveTab('build')
    setBuildSection('schedule')
  }, [])

  const importFromFile = useCallback(async (file) => {
    setToolkitStatus('')
    setToolkitError('')
    try {
      const text = await file.text()
      const parsed = JSON.parse(text)
      applyImportedPayload(parsed)
      setToolkitStatus('Imported itinerary from JSON file.')
    } catch (err) {
      console.error(err)
      setToolkitError('Import failed. Make sure this is a valid MMT itinerary JSON export.')
    }
  }, [applyImportedPayload])

  const importFromShareCode = useCallback(() => {
    setToolkitStatus('')
    setToolkitError('')
    const raw = shareCodeInput.trim()
    if (!raw) return
    try {
      const json = decodeURIComponent(escape(atob(raw)))
      const parsed = JSON.parse(json)
      applyImportedPayload(parsed)
      setToolkitStatus('Imported itinerary from share code.')
    } catch (err) {
      console.error(err)
      setToolkitError('Share code is invalid or corrupted.')
    }
  }, [applyImportedPayload, shareCodeInput])

  // ════════════════════════════════════════════════════════════════
  // BUILD UNIFIED ACTIVITY CATALOG
  // ════════════════════════════════════════════════════════════════
  const allActivities = useMemo(() => {
    const activities = []
    
    // Lobster spots
    lobsterGuide.topSpots.forEach((spot, idx) => {
      activities.push({
        id: `lobster-${idx}`,
        type: 'lobster',
        name: spot.name,
        location: spot.location,
        coordinates: spot.coordinates,
        rating: spot.rating,
        price: spot.price,
        description: spot.whySpecial,
        details: spot.mustOrder,
        tip: spot.proTip,
        duration: 1.5,
      })
    })
    
    // Harbor towns
    harborTowns.forEach((town, idx) => {
      activities.push({
        id: `town-${idx}`,
        type: 'town',
        name: town.name,
        location: town.state,
        coordinates: town.coordinates,
        rating: town.rating,
        description: town.vibe,
        details: town.mustDo?.join(', '),
        tip: town.parking,
        duration: 2.5,
      })
    })
    
    // Foliage drives
    foliageTracker.bestDrives.forEach((drive, idx) => {
      activities.push({
        id: `drive-${idx}`,
        type: 'drive',
        name: drive.name,
        location: drive.state,
        coordinates: drive.coordinates,
        rating: drive.rating,
        description: drive.note,
        details: drive.peakView,
        duration: parseFloat(drive.time) || 2,
      })
    })
    
    // Foliage viewing spots
    foliageTracker.predictions.forEach((pred, idx) => {
      activities.push({
        id: `foliage-${idx}`,
        type: 'foliage',
        name: pred.location,
        location: pred.elevation,
        coordinates: pred.coordinates,
        description: pred.notes,
        details: `Peak: ${pred.expectedPeak}`,
        duration: 2,
      })
    })
    
    // Lodging
    lodging.forEach(lodge => {
      activities.push({
        id: lodge.id,
        type: 'lodging',
        name: lodge.name,
        location: `${lodge.region} - ${lodge.neighborhood}`,
        coordinates: lodge.coordinates,
        price: lodge.price,
        description: lodge.whyStay,
        details: lodge.amenities?.slice(0, 3).join(', '),
        tip: lodge.proTip,
        duration: 'overnight',
        night: lodge.night,
      })
    })
    
    // From explore catalog
    exploreCatalog.forEach(item => {
      if (!activities.find(a => a.name === item.name)) {
        activities.push({
          id: item.id,
          type: item.type === 'scenic-drive' ? 'drive' : item.type,
          name: item.name,
          location: item.location,
          coordinates: item.coords,
          description: item.vibe,
          details: item.mustDo || item.mustTry,
          duration: item.type === 'hike' ? 3 : 1.5,
        })
      }
    })
    
    return activities
  }, [lobsterGuide, harborTowns, foliageTracker])

  // ════════════════════════════════════════════════════════════════
  // FILTERED ACTIVITIES FOR DISCOVER VIEW
  // ════════════════════════════════════════════════════════════════
  const filteredActivities = useMemo(() => {
    return allActivities.filter(activity => {
      const matchesFilter = discoverFilter === 'all' || activity.type === discoverFilter
      const matchesSearch = !searchQuery || 
        activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.description?.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesFilter && matchesSearch
    })
  }, [allActivities, discoverFilter, searchQuery])

  // ════════════════════════════════════════════════════════════════
  // ACTIVITY MANAGEMENT
  // ════════════════════════════════════════════════════════════════
  const addActivity = useCallback((activity) => {
    setSelectedActivities(prev => {
      if (prev.find(a => a.id === activity.id)) return prev
      return [...prev, { ...activity, dayId: null, order: null }]
    })
  }, [])

  const runPlaceSearch = useCallback(async () => {
    const q = placeSearchQuery.trim()
    if (q.length < 3) {
      setPlaceSearchError('Type at least 3 characters to search.')
      setPlaceSearchResults([])
      return
    }

    setPlaceSearchLoading(true)
    setPlaceSearchError('')

    try {
      const results = placeSearchRegion === 'anywhere'
        ? await searchService.searchActivities(q, { limit: 20, source: 'nominatim' })
        : await searchService.searchInRegion(q, placeSearchRegion, { limit: 20, source: 'all' })

      // Ensure plain objects (Activity instances stringify fine too, but we keep it simple).
      const normalized = (results || []).map((r) => ({
        id: r.id,
        type: r.type || 'custom',
        name: r.name,
        location: r.location || 'Location',
        coordinates: r.coordinates || null,
        description: r.description || '',
        details: r.address || r.website || '',
        tip: r.phone || '',
        website: r.website || undefined,
        phone: r.phone || undefined,
        source: r.source,
        sourceId: r.sourceId,
      }))

      setPlaceSearchResults(normalized)
      if (normalized.length === 0) {
        setPlaceSearchError('No matches found. Try a different name or broaden the region.')
      }
    } catch (err) {
      console.error(err)
      setPlaceSearchError('Place search failed. Please try again in a moment.')
      setPlaceSearchResults([])
    } finally {
      setPlaceSearchLoading(false)
    }
  }, [placeSearchQuery, placeSearchRegion])

  const removeActivity = useCallback((activityId) => {
    setSelectedActivities(prev => prev.filter(a => a.id !== activityId))
  }, [])

  const assignToDay = useCallback((activityId, dayId) => {
    setSelectedActivities(prev => {
      const nextOrderForDay = (targetDayId) => {
        if (!targetDayId) return null
        const maxOrder = prev
          .filter(a => a.dayId === targetDayId)
          .reduce((m, a) => Math.max(m, typeof a.order === 'number' ? a.order : -1), -1)
        return maxOrder + 1
      }

      return prev.map(a => {
        if (a.id !== activityId) return a
        // Unschedule
        if (!dayId) return { ...a, dayId: null, order: null }
        // Schedule (append to end by default)
        return { ...a, dayId, order: nextOrderForDay(dayId) }
      })
    })
  }, [])

  const isActivitySelected = useCallback((activityId) => {
    return selectedActivities.some(a => a.id === activityId)
  }, [selectedActivities])

  const getActivitiesForDay = useCallback((dayId) => {
    return selectedActivities
      .filter(a => a.dayId === dayId)
      .slice()
      .sort((a, b) => {
        const ao = typeof a.order === 'number' ? a.order : Number.MAX_SAFE_INTEGER
        const bo = typeof b.order === 'number' ? b.order : Number.MAX_SAFE_INTEGER
        if (ao !== bo) return ao - bo
        return String(a.name || '').localeCompare(String(b.name || ''))
      })
  }, [selectedActivities])

  // Assign + reorder in a single atomic update (supports drops from Discover).
  const ensureAssignedToDay = useCallback((payload, dayId, targetIndex = null) => {
    setSelectedActivities(prev => {
      const next = prev.map(a => ({ ...a }))

      const getSortedDayActivities = (targetDayId) => {
        return next
          .filter(a => a.dayId === targetDayId)
          .slice()
          .sort((a, b) => {
            const ao = typeof a.order === 'number' ? a.order : Number.MAX_SAFE_INTEGER
            const bo = typeof b.order === 'number' ? b.order : Number.MAX_SAFE_INTEGER
            if (ao !== bo) return ao - bo
            return String(a.name || '').localeCompare(String(b.name || ''))
          })
      }

      const normalizeDayOrders = (targetDayId) => {
        const list = getSortedDayActivities(targetDayId)
        const orderById = new Map(list.map((a, idx) => [a.id, idx]))
        for (let i = 0; i < next.length; i++) {
          if (next[i].dayId !== targetDayId) continue
          const o = orderById.get(next[i].id)
          next[i].order = typeof o === 'number' ? o : null
        }
      }

      const activityId = payload?.id || payload?.activity?.id
      if (!activityId) return prev

      // If this is a Discover drag, insert it into the trip first.
      if (!next.some(a => a.id === activityId) && payload?.activity) {
        next.push({ ...payload.activity, dayId: null, order: null })
      }

      const existingIdx = next.findIndex(a => a.id === activityId)
      if (existingIdx === -1) return prev

      const fromDayId = next[existingIdx].dayId || payload?.fromDayId || null

      // Move into target day.
      next[existingIdx].dayId = dayId

      // Default insert position: end of day.
      const dayList = getSortedDayActivities(dayId)
      const ids = dayList.map(a => a.id)
      const existingInDayIdx = ids.indexOf(activityId)
      if (existingInDayIdx !== -1) ids.splice(existingInDayIdx, 1)

      const desiredIndex = typeof targetIndex === 'number' ? targetIndex : ids.length
      const clampedIndex = Math.max(0, Math.min(desiredIndex, ids.length))
      ids.splice(clampedIndex, 0, activityId)

      // Apply ordering for target day.
      const nextOrderById = new Map(ids.map((id, idx) => [id, idx]))
      for (let i = 0; i < next.length; i++) {
        if (next[i].dayId !== dayId) continue
        const newOrder = nextOrderById.get(next[i].id)
        next[i].order = typeof newOrder === 'number' ? newOrder : null
      }

      // Clean up ordering in the origin day (if any).
      if (fromDayId && fromDayId !== dayId) {
        normalizeDayOrders(fromDayId)
      }

      return next
    })
  }, [])

  // ════════════════════════════════════════════════════════════════
  // DRAG & DROP (HTML5 DnD)
  // Allows dragging activity blocks between days and reordering within a day.
  // ════════════════════════════════════════════════════════════════
  const dragPayloadRef = useRef(null)

  const onDragStartActivity = useCallback((e, activity) => {
    const payload = { kind: 'selected', id: activity.id, fromDayId: activity.dayId || null }
    dragPayloadRef.current = payload
    try {
      e.dataTransfer.setData('application/json', JSON.stringify(payload))
      e.dataTransfer.setData('text/plain', activity.id)
    } catch {
      // Ignore; we'll still use dragPayloadRef.
    }
    e.dataTransfer.effectAllowed = 'move'
  }, [])

  const onDragStartCatalogActivity = useCallback((e, activity) => {
    const payload = {
      kind: 'catalog',
      id: activity.id,
      fromDayId: null,
      activity: {
        ...activity,
        // Ensure scheduling fields exist when we add it.
        dayId: null,
        order: null,
      },
    }
    dragPayloadRef.current = payload
    try {
      e.dataTransfer.setData('application/json', JSON.stringify(payload))
      e.dataTransfer.setData('text/plain', activity.id)
    } catch {
      // Ignore; we'll still use dragPayloadRef.
    }
    e.dataTransfer.effectAllowed = 'copyMove'
  }, [])

  const readDragPayload = useCallback((e) => {
    if (dragPayloadRef.current) return dragPayloadRef.current
    try {
      const raw = e.dataTransfer.getData('application/json')
      if (raw) return JSON.parse(raw)
    } catch {
      // ignore
    }
    const id = e.dataTransfer.getData('text/plain')
    if (id) return { id, fromDayId: null }
    return null
  }, [])

  const scheduledRouteCoords = useMemo(() => {
    const coords = []

    // Walk days in order, then activities in order.
    tripDays.forEach((day) => {
      const dayActs = selectedActivities
        .filter(a => a.dayId === day.id && Array.isArray(a.coordinates) && a.coordinates.length === 2)
        .slice()
        .sort((a, b) => {
          const ao = typeof a.order === 'number' ? a.order : Number.MAX_SAFE_INTEGER
          const bo = typeof b.order === 'number' ? b.order : Number.MAX_SAFE_INTEGER
          if (ao !== bo) return ao - bo
          return String(a.name || '').localeCompare(String(b.name || ''))
        })

      dayActs.forEach(a => coords.push(a.coordinates))
    })

    return coords
  }, [selectedActivities, tripDays])

  const unscheduledActivities = useMemo(() => {
    return selectedActivities.filter(a => !a.dayId)
  }, [selectedActivities])

  // ════════════════════════════════════════════════════════════════
  // TRIP STATS
  // ════════════════════════════════════════════════════════════════
  const tripStats = useMemo(() => {
    const total = selectedActivities.length
    const scheduled = selectedActivities.filter(a => a.dayId).length
    const byType = {}
    selectedActivities.forEach(a => {
      byType[a.type] = (byType[a.type] || 0) + 1
    })
    return { total, scheduled, unscheduled: total - scheduled, byType }
  }, [selectedActivities])

  // ════════════════════════════════════════════════════════════════
  // PACKING PROGRESS
  // ════════════════════════════════════════════════════════════════
  const packingProgress = useMemo(() => {
    const allItems = Object.values(packingChecklist).flat()
    const checked = Object.values(packedItems).filter(Boolean).length
    return Math.round((checked / allItems.length) * 100)
  }, [packingChecklist, packedItems])

  const togglePackedItem = (category, item) => {
    const key = `${category}-${item}`
    setPackedItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  // ════════════════════════════════════════════════════════════════
  // RENDER
  // ════════════════════════════════════════════════════════════════
  return (
    <div className="app-clean">
      {/* ═══════════════════════════════════════════════════════════
          HEADER - Compact, informative, not overwhelming
          ═══════════════════════════════════════════════════════════ */}
      <header className="header-clean">
        <div className="header-left">
          <h1>🍁 MMT Trip Planner</h1>
          <span className="header-subtitle">{subtitle || title}</span>
        </div>
        <div className="header-right">
          <CompactCountdown targetDate={tripDates.start} />
          <div className="header-travelers">
            {travelers.map(t => (
              <span key={t.name} className="traveler-avatar" title={t.name}>
                {t.emoji}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════
          MAIN NAVIGATION - Just 3 clear options
          ═══════════════════════════════════════════════════════════ */}
      <nav className="nav-clean">
        <button 
          className={`nav-btn ${activeTab === 'mom' ? 'active' : ''}`}
          onClick={() => setActiveTab('mom')}
        >
          <span className="nav-icon">🗺️</span>
          <span className="nav-label">Mom's Route</span>
        </button>
        
        <button 
          className={`nav-btn ${activeTab === 'build' ? 'active' : ''}`}
          onClick={() => setActiveTab('build')}
        >
          <span className="nav-icon">🧩</span>
          <span className="nav-label">Build & Customize</span>
          {tripStats.total > 0 && (
            <span className="nav-badge">{tripStats.total}</span>
          )}
        </button>
      </nav>

      {/* ═══════════════════════════════════════════════════════════
          MAIN CONTENT AREA
          ═══════════════════════════════════════════════════════════ */}
      <main className="main-clean">

        {/* ─────────────────────────────────────────────────────────
            MOM'S ROUTE TAB
            Anchored to MMTrip.txt + dayItinerary + tripData.map
            ───────────────────────────────────────────────────────── */}
        {activeTab === 'mom' && (
          <div className="mom-view">
            <div className="mom-hero">
              <div>
                <h2>Mom’s Suggested Route (Snapshot)</h2>
                <p className="muted">
                  This is the preserved, read-only snapshot from <strong>MMTrip.txt</strong>: Boston → Portland → Chelsea (Sally’s) → Montreal → optional Adirondacks → Saratoga/Albany.
                  The <strong>Build & Customize</strong> tab is your sandbox for a brand-new itinerary.
                </p>
                <div style={{ marginTop: '0.75rem' }}>
                  <button className="cta-btn" onClick={seedBuilderFromMomRoute}>
                    ➜ Copy this route into Build & Customize
                  </button>
                </div>
              </div>
              <div className="mom-options">
                {scheduleOptions.map(opt => (
                  <button
                    key={opt.id}
                    className={`pill ${momRouteOption === opt.id ? 'active' : ''}`}
                    onClick={() => setMomRouteOption(opt.id)}
                    title={opt.vibe}
                  >
                    {opt.emoji} {opt.title}
                  </button>
                ))}
              </div>
            </div>

            {selectedMomOption && (
              <section className="info-section" style={{ marginTop: '-0.5rem' }}>
                <div className="section-header compact">
                  <h3>{selectedMomOption.emoji} {selectedMomOption.title}</h3>
                  <div className="small-note">{selectedMomOption.totalMiles}</div>
                </div>
                <p className="muted" style={{ marginTop: 0 }}>{selectedMomOption.vibe}</p>
                {selectedMomOption.highlights?.length > 0 && (
                  <ul className="highlights">
                    {selectedMomOption.highlights.map((h, idx) => (
                      <li key={idx}>{h}</li>
                    ))}
                  </ul>
                )}
              </section>
            )}

            {/* Route map + stop notes (restores “a TON of info” from the old map section) */}
            {map?.routeCoordinates?.length > 1 && (
              <section className="mom-map">
                <div className="section-header compact">
                  <h3>🗺️ Route Map</h3>
                  <div className="small-note">Tap a stop for Mom note + research note.</div>
                </div>
                <div className="trip-map">
                  <MapContainer
                    center={map.center || [44.2, -72.2]}
                    zoom={map.zoom || 6}
                    style={{ height: '420px', width: '100%', borderRadius: '12px' }}
                    scrollWheelZoom={true}
                  >
                    <TileLayer
                      attribution='&copy; OpenStreetMap'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Polyline
                      positions={map.routeCoordinates}
                      pathOptions={{ color: '#2c3e50', weight: 4, opacity: 0.85 }}
                    />
                    {map.alternativeCoordinates?.length > 1 && (
                      <Polyline
                        positions={map.alternativeCoordinates}
                        pathOptions={{ color: '#7f8c8d', weight: 3, opacity: 0.6, dashArray: '8 8' }}
                      />
                    )}
                    {(map.stops || []).map(stop => (
                      <CircleMarker
                        key={stop.id}
                        center={stop.coords}
                        radius={8}
                        pathOptions={{
                          color: stop.category === 'departure' ? '#8e44ad' : '#1abc9c',
                          fillColor: stop.category === 'departure' ? '#8e44ad' : '#1abc9c',
                          fillOpacity: 0.9,
                          weight: 2,
                        }}
                      >
                        <Popup>
                          <strong>{stop.name}</strong>
                          <br />
                          <em>Mom note:</em> {stop.mmNote}
                          <br />
                          <em>Research note:</em> {stop.researchNote}
                        </Popup>
                      </CircleMarker>
                    ))}
                    {(map.alternativeStops || []).map(stop => (
                      <CircleMarker
                        key={stop.id}
                        center={stop.coords}
                        radius={7}
                        pathOptions={{
                          color: '#7f8c8d',
                          fillColor: '#7f8c8d',
                          fillOpacity: 0.75,
                          weight: 2,
                        }}
                      >
                        <Popup>
                          <strong>{stop.name}</strong>
                          <br />
                          <em>Alt idea:</em> {stop.mmNote}
                          <br />
                          <em>Research note:</em> {stop.researchNote}
                        </Popup>
                      </CircleMarker>
                    ))}
                  </MapContainer>
                </div>
              </section>
            )}

            {/* Day-by-day (Mom's structure) */}
            <section className="mom-days">
              <h3>📅 Day-by-day outline</h3>
              <div className="days-list">
                {dayItinerary.map(day => (
                  <div key={day.id} className="day-card">
                    <div className="day-header">
                      <div className="day-info">
                        <span className="day-label">Day {day.dayNumber}</span>
                        <span className="day-date">{day.date}</span>
                      </div>
                      <span className="day-location">{day.label}</span>
                    </div>
                    <div className="day-activities">
                      <div className="day-empty" style={{ justifyContent: 'flex-start' }}>
                        <span>
                          <strong>{day.emoji}</strong> {day.description}
                        </span>
                      </div>
                      {day.momNote && (
                        <div className="mom-note">
                          <strong>Mom note:</strong> {day.momNote}
                        </div>
                      )}
                      {day.foliage && (
                        <div className="foliage-chip">🍁 {day.foliage}</div>
                      )}
                      {day.highlights?.length > 0 && (
                        <ul className="highlights">
                          {day.highlights.map((h, idx) => (
                            <li key={idx}>{h}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick logistics (keeps the extra “why” info without turning into 10 tabs) */}
            {Array.isArray(logistics) && logistics.length > 0 && (
              <section className="mom-logistics">
                <h3>🧠 Why this route works</h3>
                <div className="info-cards">
                  {logistics.map((item, idx) => (
                    <div key={idx} className="info-card">
                      <div className="info-title">{item.icon} {item.title}</div>
                      <div className="info-body">{item.content}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
        
        {/* ─────────────────────────────────────────────────────────
            BUILD & CUSTOMIZE TAB
            (Schedule builder + Discover catalog + Toolkit)
            ───────────────────────────────────────────────────────── */}
        {activeTab === 'build' && (
          <div className="trip-view">
            <div className="subnav-clean">
              <button
                className={`subnav-btn ${buildSection === 'schedule' ? 'active' : ''}`}
                onClick={() => setBuildSection('schedule')}
              >
                📅 Schedule
              </button>
              <button
                className={`subnav-btn ${buildSection === 'discover' ? 'active' : ''}`}
                onClick={() => setBuildSection('discover')}
              >
                🔍 Discover
              </button>
              <button
                className={`subnav-btn ${buildSection === 'toolkit' ? 'active' : ''}`}
                onClick={() => setBuildSection('toolkit')}
              >
                🧳 Toolkit
                {packingProgress > 0 && packingProgress < 100 && (
                  <span className="subnav-badge">{packingProgress}%</span>
                )}
              </button>
            </div>

            {/* Quick Stats Bar */}
            <div className="trip-stats-bar">
              <div className="stat">
                <strong>{tripStats.total}</strong> activities
              </div>
              <div className="stat">
                <strong>{tripStats.scheduled}</strong> scheduled
              </div>
              {tripStats.byType.lobster > 0 && (
                <div className="stat">🦞 {tripStats.byType.lobster}</div>
              )}
              {tripStats.byType.town > 0 && (
                <div className="stat">⚓ {tripStats.byType.town}</div>
              )}
              {tripStats.byType.lodging > 0 && (
                <div className="stat">🏨 {tripStats.byType.lodging}</div>
              )}
              <button 
                className="discover-cta"
                onClick={() => setBuildSection('discover')}
              >
                + Add More
              </button>
            </div>

            {buildSection === 'schedule' && selectedActivities.length === 0 ? (
              /* Empty State */
              <div className="empty-trip">
                <div className="empty-icon">🗺️</div>
                <h2>Start Planning Your Adventure</h2>
                <p>Browse lobster spots, harbor towns, foliage drives, and more to build your perfect trip.</p>
                <button 
                  className="cta-btn"
                  onClick={() => setBuildSection('discover')}
                >
                  🔍 Discover Activities
                </button>
              </div>
            ) : buildSection === 'schedule' ? (
              <div className="trip-builder">
                {/* Unscheduled Pool */}
                {unscheduledActivities.length > 0 && (
                  <div className="unscheduled-section">
                    <h3>📦 To Schedule ({unscheduledActivities.length})</h3>
                    <p className="hint">Drag blocks onto a day (or use the dropdown).</p>
                    <div className="unscheduled-list">
                      {unscheduledActivities.map(activity => (
                        <div
                          key={activity.id}
                          className={`unscheduled-item ${activity.type}`}
                          draggable
                          onDragStart={(e) => onDragStartActivity(e, activity)}
                        >
                          <span className="item-icon">
                            {activityTypes[activity.type]?.icon || '📍'}
                          </span>
                          <div className="item-info">
                            <strong>{activity.name}</strong>
                            <span>{activity.location}</span>
                          </div>
                          <select 
                            className="day-select"
                            value=""
                            onChange={(e) => assignToDay(activity.id, parseInt(e.target.value))}
                          >
                            <option value="">Add to day...</option>
                            {tripDays.map(day => (
                              <option key={day.id} value={day.id}>
                                {day.label} - {day.location}
                              </option>
                            ))}
                          </select>
                          <button 
                            className="remove-btn"
                            onClick={() => removeActivity(activity.id)}
                          >×</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Day-by-Day Schedule */}
                <div className="schedule-section">
                  <h3>📅 Your Schedule</h3>
                  <div className="days-list">
                    {tripDays.map(day => {
                      const dayActivities = getActivitiesForDay(day.id)
                      return (
                        <div
                          key={day.id}
                          className="day-card"
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault()
                            const payload = readDragPayload(e)
                            if (!payload?.id && !payload?.activity?.id) return
                            ensureAssignedToDay(payload, day.id)
                          }}
                        >
                          <div className="day-header">
                            <div className="day-info">
                              <span className="day-label">{day.label}</span>
                              <span className="day-date">{day.date}</span>
                            </div>
                            <span className="day-location">{day.location}</span>
                          </div>
                          
                          <div className="day-activities">
                            {dayActivities.length === 0 ? (
                              <div className="day-empty">
                                <span>No activities yet</span>
                                <button 
                                  className="quick-add"
                                  onClick={() => setBuildSection('discover')}
                                >
                                  + Add
                                </button>
                              </div>
                            ) : (
                              <>
                                {/* Drop zone at top (reorder within the day) */}
                                <div
                                  className="drop-zone"
                                  onDragOver={(e) => e.preventDefault()}
                                  onDrop={(e) => {
                                    e.preventDefault()
                                    const payload = readDragPayload(e)
                                    if (!payload?.id && !payload?.activity?.id) return
                                    ensureAssignedToDay(payload, day.id, 0)
                                  }}
                                />
                                {dayActivities.map((activity, idx) => (
                                  <div key={activity.id}>
                                    <div
                                      className={`scheduled-activity ${activity.type}`}
                                      draggable
                                      onDragStart={(e) => onDragStartActivity(e, activity)}
                                    >
                                      <span className="activity-order">{idx + 1}</span>
                                      <span className="activity-icon">
                                        {activityTypes[activity.type]?.icon || '📍'}
                                      </span>
                                      <div className="activity-info">
                                        <strong>{activity.name}</strong>
                                        <span>{activity.location}</span>
                                      </div>
                                      <div className="activity-actions">
                                        <select
                                          className="move-select"
                                          value={day.id}
                                          onChange={(e) => {
                                            const val = e.target.value
                                            if (val === 'remove') {
                                              assignToDay(activity.id, null)
                                            } else {
                                              assignToDay(activity.id, parseInt(val))
                                            }
                                          }}
                                        >
                                          {tripDays.map(d => (
                                            <option key={d.id} value={d.id}>
                                              {d.label}
                                            </option>
                                          ))}
                                          <option value="remove">Unschedule</option>
                                        </select>
                                        <button 
                                          className="remove-btn"
                                          onClick={() => removeActivity(activity.id)}
                                        >×</button>
                                      </div>
                                    </div>

                                    {/* Drop zone after each block */}
                                    <div
                                      className="drop-zone"
                                      onDragOver={(e) => e.preventDefault()}
                                      onDrop={(e) => {
                                        e.preventDefault()
                                        const payload = readDragPayload(e)
                                        if (!payload?.id && !payload?.activity?.id) return
                                        ensureAssignedToDay(payload, day.id, idx + 1)
                                      }}
                                    />
                                  </div>
                                ))}
                              </>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Trip Map */}
                {selectedActivities.filter(a => a.coordinates).length > 0 && (
                  <div className="trip-map-section">
                    <h3>🗺️ Your Route</h3>
                    <div className="trip-map">
                      <MapContainer
                        center={[43.5, -71.5]}
                        zoom={7}
                        style={{ height: '350px', width: '100%', borderRadius: '12px' }}
                        scrollWheelZoom={true}
                      >
                        <TileLayer
                          attribution='&copy; OpenStreetMap'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {scheduledRouteCoords.length > 1 && (
                          <Polyline
                            positions={scheduledRouteCoords}
                            pathOptions={{ color: '#2c3e50', weight: 4, opacity: 0.75 }}
                          />
                        )}

                        {selectedActivities.filter(a => a.coordinates).map(activity => (
                          <CircleMarker
                            key={activity.id}
                            center={activity.coordinates}
                            radius={activity.dayId ? 10 : 6}
                            pathOptions={{
                              color: activityTypes[activity.type]?.color || '#666',
                              fillColor: activityTypes[activity.type]?.color || '#666',
                              fillOpacity: activity.dayId ? 0.9 : 0.4,
                              weight: 2,
                            }}
                          >
                            <Popup>
                              <strong>{activity.name}</strong><br/>
                              {activity.location}
                            </Popup>
                          </CircleMarker>
                        ))}
                      </MapContainer>
                    </div>
                  </div>
                )}
              </div>
            ) : buildSection === 'discover' ? (
              <div className="discover-view">
                {/* Search & Filter Bar */}
                <div className="discover-controls">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search lobster spots, towns, drives..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  
                  <div className="filter-chips">
                    {['all', 'lobster', 'town', 'foliage', 'drive', 'lodging', 'food', 'hike'].map(filter => (
                      <button
                        key={filter}
                        className={`filter-chip ${discoverFilter === filter ? 'active' : ''}`}
                        onClick={() => setDiscoverFilter(filter)}
                      >
                        {filter === 'all' ? '🌟 All' : `${activityTypes[filter]?.icon || '📍'} ${activityTypes[filter]?.label || filter}`}
                      </button>
                    ))}
                  </div>
                  
                  <div className="results-count">
                    {filteredActivities.length} options found
                  </div>
                </div>

                {/* Search any business/place (OpenStreetMap) */}
                <div className="place-search">
                  <div className="place-search-head">
                    <h3>🔎 Search any place</h3>
                    <p>
                      Not in the list? Search OpenStreetMap (restaurants, shops, landmarks) and add it.
                    </p>
                  </div>

                  <div className="place-search-controls">
                    <input
                      type="text"
                      value={placeSearchQuery}
                      onChange={(e) => setPlaceSearchQuery(e.target.value)}
                      placeholder="Try: 'Eventide Oyster Portland' or 'coffee shop Bar Harbor'"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') runPlaceSearch()
                      }}
                    />

                    <select
                      value={placeSearchRegion}
                      onChange={(e) => setPlaceSearchRegion(e.target.value)}
                      aria-label="Search region"
                    >
                      <option value="maine_coast">Maine Coast</option>
                      <option value="portland">Portland area</option>
                      <option value="boston">Boston area</option>
                      <option value="white_mountains">White Mountains</option>
                      <option value="vermont">Vermont</option>
                      <option value="montreal">Montreal</option>
                      <option value="adirondacks">Adirondacks</option>
                      <option value="anywhere">Anywhere</option>
                    </select>

                    <button
                      className="place-search-btn"
                      onClick={runPlaceSearch}
                      disabled={placeSearchLoading}
                    >
                      {placeSearchLoading ? 'Searching…' : 'Search'}
                    </button>
                  </div>

                  {placeSearchError && (
                    <div className="place-search-error">{placeSearchError}</div>
                  )}

                  {placeSearchResults.length > 0 && (
                    <div className="place-search-results">
                      {placeSearchResults.map((place) => (
                          <div
                            key={place.id}
                            className="place-result"
                            draggable
                            onDragStart={(e) => onDragStartCatalogActivity(e, place)}
                            title="Drag onto a day to schedule"
                          >
                          <div className="place-result-main">
                            <div className="place-result-title">
                              <span className="place-type">
                                {activityTypes[place.type]?.icon || '📍'}
                              </span>
                              <div>
                                <strong>{place.name}</strong>
                                <div className="place-sub">{place.details || place.location}</div>
                              </div>
                            </div>
                            <div className="place-actions">
                              <button
                                className="add-btn"
                                onClick={() => addActivity(place)}
                              >
                                + Add to Trip
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick Category Cards */}
                {discoverFilter === 'all' && !searchQuery && (
                  <div className="category-highlights">
                    <div 
                      className="category-card lobster"
                      onClick={() => setDiscoverFilter('lobster')}
                    >
                      <span className="cat-icon">🦞</span>
                      <h3>Lobster Spots</h3>
                      <p>The best rolls and shacks on the coast</p>
                      <span className="cat-count">
                        {allActivities.filter(a => a.type === 'lobster').length} spots
                      </span>
                    </div>
                    
                    <div 
                      className="category-card town"
                      onClick={() => setDiscoverFilter('town')}
                    >
                      <span className="cat-icon">⚓</span>
                      <h3>Harbor Towns</h3>
                      <p>Charming coastal villages to explore</p>
                      <span className="cat-count">
                        {allActivities.filter(a => a.type === 'town').length} towns
                      </span>
                    </div>
                    
                    <div 
                      className="category-card foliage"
                      onClick={() => setDiscoverFilter('foliage')}
                    >
                      <span className="cat-icon">🍁</span>
                      <h3>Fall Foliage</h3>
                      <p>Peak color viewing spots</p>
                      <span className="cat-count">
                        {allActivities.filter(a => a.type === 'foliage').length} spots
                      </span>
                    </div>
                    
                    <div 
                      className="category-card drive"
                      onClick={() => setDiscoverFilter('drive')}
                    >
                      <span className="cat-icon">🚗</span>
                      <h3>Scenic Drives</h3>
                      <p>Beautiful routes through the mountains</p>
                      <span className="cat-count">
                        {allActivities.filter(a => a.type === 'drive').length} drives
                      </span>
                    </div>
                    
                    <div 
                      className="category-card lodging"
                      onClick={() => setDiscoverFilter('lodging')}
                    >
                      <span className="cat-icon">🏨</span>
                      <h3>Where to Stay</h3>
                      <p>Hotels, B&Bs, and cozy spots</p>
                      <span className="cat-count">
                        {allActivities.filter(a => a.type === 'lodging').length} options
                      </span>
                    </div>
                  </div>
                )}

                {/* Activity Grid */}
                <div className="activity-grid">
                  {filteredActivities.map(activity => (
                    <div
                      key={activity.id}
                      draggable
                      onDragStart={(e) => onDragStartCatalogActivity(e, activity)}
                      title="Drag onto a day to schedule"
                    >
                      <ActivityCard
                        activity={activity}
                        isAdded={isActivitySelected(activity.id)}
                        onAdd={addActivity}
                        onRemove={removeActivity}
                      />
                    </div>
                  ))}
                  
                  {filteredActivities.length === 0 && (
                    <div className="no-results">
                      <p>No activities match your search. Try different keywords or filters.</p>
                      <button onClick={() => { setSearchQuery(''); setDiscoverFilter('all') }}>
                        Clear Filters
                      </button>
                    </div>
                  )}
                </div>

                {/* Map Preview */}
                {filteredActivities.filter(a => a.coordinates).length > 0 && (
                  <div className="discover-map">
                    <h3>📍 On the Map</h3>
                    <MapContainer
                      center={[43.5, -71.0]}
                      zoom={7}
                      style={{ height: '300px', width: '100%', borderRadius: '12px' }}
                      scrollWheelZoom={false}
                    >
                      <TileLayer
                        attribution='&copy; OpenStreetMap'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      {filteredActivities.filter(a => a.coordinates).map(activity => (
                        <CircleMarker
                          key={activity.id}
                          center={activity.coordinates}
                          radius={8}
                          pathOptions={{
                            color: activityTypes[activity.type]?.color || '#666',
                            fillColor: activityTypes[activity.type]?.color || '#666',
                            fillOpacity: 0.8,
                          }}
                        >
                          <Popup>
                            <strong>{activity.name}</strong><br/>
                            <span>{activity.location}</span><br/>
                            <button onClick={() => addActivity(activity)}>+ Add to Trip</button>
                          </Popup>
                        </CircleMarker>
                      ))}
                    </MapContainer>
                  </div>
                )}
              </div>
            ) : (
              <div className="toolkit-view">
                <section className="toolkit-card">
                  <div className="toolkit-card-head">
                    <div>
                      <h2>🧳 Toolkit</h2>
                      <p className="muted" style={{ margin: 0 }}>
                        Export your itinerary, share it with someone, or import a saved plan.
                      </p>
                    </div>
                    <button className="cta-btn" onClick={seedBuilderFromMomRoute}>
                      ➜ Copy Mom route into Builder
                    </button>
                  </div>

                  {(toolkitStatus || toolkitError) && (
                    <div className={`toolkit-alert ${toolkitError ? 'error' : 'ok'}`}>
                      {toolkitError || toolkitStatus}
                    </div>
                  )}

                  <div className="toolkit-grid">
                    <div className="toolkit-panel">
                      <h3>Export</h3>
                      <p className="muted">Download a backup, or copy a share code.</p>
                      <div className="toolkit-actions">
                        <button className="toolkit-btn" onClick={exportAsJson}>Download JSON</button>
                        <button className="toolkit-btn" onClick={exportAsText}>Download TXT</button>
                        <button className="toolkit-btn" onClick={copyShareCode}>Copy share code</button>
                      </div>
                    </div>

                    <div className="toolkit-panel">
                      <h3>Import</h3>
                      <p className="muted">Restore from a JSON file or paste a share code.</p>

                      <div className="toolkit-actions">
                        <label className="toolkit-file">
                          <input
                            type="file"
                            accept="application/json"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) importFromFile(file)
                              e.target.value = ''
                            }}
                          />
                          Choose JSON file…
                        </label>
                      </div>

                      <textarea
                        className="toolkit-textarea"
                        value={shareCodeInput}
                        onChange={(e) => setShareCodeInput(e.target.value)}
                        placeholder="Paste share code here"
                        rows={4}
                      />
                      <div className="toolkit-actions" style={{ justifyContent: 'flex-end' }}>
                        <button className="toolkit-btn" onClick={importFromShareCode}>
                          Import share code
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Packing Checklist stays here so Toolkit remains genuinely useful */}
                <section className="info-section">
                  <div className="section-header">
                    <h2>🧳 Packing Checklist</h2>
                    <div className="packing-progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${packingProgress}%` }}
                      />
                      <span>{packingProgress}% packed</span>
                    </div>
                  </div>

                  <div className="packing-grid">
                    {Object.entries(packingChecklist).map(([category, items]) => (
                      <div key={category} className="packing-category">
                        <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                        <ul>
                          {items.map((item) => {
                            const key = `${category}-${item.item}`
                            return (
                              <li key={item.item}>
                                <label>
                                  <input
                                    type="checkbox"
                                    checked={packedItems[key] || false}
                                    onChange={() => togglePackedItem(category, item.item)}
                                  />
                                  <span className={item.essential ? 'essential' : ''}>
                                    {item.item}
                                  </span>
                                </label>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ═══════════════════════════════════════════════════════════
          FOOTER - Simple, clean
          ═══════════════════════════════════════════════════════════ */}
      <footer className="footer-clean">
        <p>Made with 💕 for the best girls trip ever</p>
        <button className="print-btn" onClick={() => window.print()}>
          🖨️ Print Itinerary
        </button>
      </footer>
    </div>
  )
}

export default App
