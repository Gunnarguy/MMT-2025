# MMT-2025 Trip Planner - Architecture Documentation

## 📁 New File Structure

```
src/
├── context/
│   └── TripContext.jsx          # Centralized state management
├── components/
│   ├── Sidebar.jsx              # Left sidebar (already existed)
│   ├── TravelerSelector.jsx     # Traveler switcher (already existed)
│   ├── ItineraryCard.jsx        # Day cards (already existed)
│   ├── TabSystem.jsx            # NEW: Clean tab navigation
│   ├── DrivingDirections.jsx    # NEW: Extracted from App.jsx
│   ├── CountdownTimer.jsx       # NEW: Extracted from App.jsx
│   └── *.css                    # Component-scoped styles
├── utils/
│   └── routeUtils.js            # NEW: Route calculation utilities
├── hooks/
│   └── useRoutes.js             # NEW: Custom route fetching hook
├── data/
│   ├── tripData.js              # NEW: Single source of truth
│   ├── planContent.js           # Legacy (to be deprecated)
│   └── data.js                  # Legacy (to be deprecated)
├── App.jsx                      # NEW: Lean coordinator (<500 lines)
├── App.legacy.jsx               # BACKUP: Original 3000+ line file
├── App.css                      # Main styles (to be split)
└── main.jsx                     # Entry point with TripProvider
```

## 🎯 Key Improvements

### 1. **State Management**
- **Before**: Scattered `useState` and `localStorage` calls throughout App.jsx
- **After**: Centralized `TripContext` with all state and actions
- **Usage**: `const { selectedActivities, addActivity } = useTripContext()`

### 2. **Data Consolidation**
- **Before**: Duplicate data in `data.js` and `data/planContent.js`
- **After**: Single `data/tripData.js` as source of truth
- **Migration Path**: Old files re-export from new file for compatibility

### 3. **Component Extraction**
- **Before**: 15+ inline components in App.jsx
- **After**: Proper components in `/components` with scoped CSS
- **Examples**: 
  - `DrivingDirections` (turn-by-turn navigation)
  - `CountdownTimer` (live countdown)
  - `TabSystem` (clean navigation)

### 4. **Utilities & Hooks**
- **Before**: Helper functions scattered in App.jsx
- **After**: Organized in `/utils` and `/hooks`
- **Examples**:
  - `routeUtils.js`: OSRM API integration, distance calculations
  - `useRoutes.js`: Custom hook for route fetching

### 5. **CSS Architecture**
- **Before**: 6,081-line App.css monolith
- **After**: Component-scoped CSS files
- **Next Step**: Convert remaining styles to modules

## 🔄 Migration Guide

### Using the New Context

```jsx
// OLD WAY (in App.jsx)
const [selectedActivities, setSelectedActivities] = useState([]);
const addActivity = (activity) => { /* ... */ };

// NEW WAY (anywhere)
import { useTripContext } from './context/TripContext';

function MyComponent() {
  const { selectedActivities, addActivity } = useTripContext();
  // ...
}
```

### Importing Data

```jsx
// OLD WAY
import { tripData } from './data';
import { dayItinerary } from './data/planContent';

// NEW WAY
import { tripMeta, dayItinerary, travelers } from './data/tripData';
```

### Using Route Utilities

```jsx
// OLD WAY (inline in App.jsx)
async function fetchDrivingRoute() { /* 50 lines */ }

// NEW WAY
import { fetchDrivingRoute, formatDuration } from './utils/routeUtils';
import { useRoutes } from './hooks/useRoutes';

function MyComponent({ activities }) {
  const { routes, loading, error } = useRoutes(activities, dayId);
  // ...
}
```

## 📦 Component API Reference

### TripContext

**State:**
- `currentTravelerId`: string ('tere' | 'mikaela' | 'both')
- `selectedActivities`: Activity[]
- `activeTab`: string
- `showSidebar`: boolean

**Actions:**
- `setCurrentTravelerId(id)`
- `addActivity(activity)`
- `removeActivity(activityId)`
- `assignToDay(activityId, dayId)`
- `clearAllSelections()`

### TabSystem

```jsx
<TabSystem
  activeTab={activeTab}
  onTabChange={setActiveTab}
  tabs={[
    { id: 'overview', label: 'Overview', icon: '🏠' },
    { id: 'lobster', label: 'Lobster', icon: '🦞', count: 8 }
  ]}
/>
```

### DrivingDirections

```jsx
<DrivingDirections
  routes={routes}        // Array of route segments
  loading={loading}      // boolean
  error={error}          // string | null
/>
```

### CountdownTimer

```jsx
<CountdownTimer targetDate="2025-09-20" />
```

## 🚀 Next Steps

1. ✅ **Extract remaining inline components**
   - PackingChecklist
   - BudgetCalculator
   - WeatherWidget
   - ReservationTracker
   - PhotoSpots
   - etc.

2. ✅ **Split App.css**
   - Create CSS modules per component
   - Use CSS variables consistently
   - Remove duplicate styles

3. ⏳ **Create dedicated tab components**
   - `OverviewTab.jsx`
   - `LobsterTab.jsx`
   - `MyTripTab.jsx`
   - etc.

4. ⏳ **Add error boundaries**
   - Prevent full app crashes
   - Better error messages

5. ⏳ **Add tests**
   - Unit tests for utilities
   - Integration tests for context
   - Component tests

## 🐛 Known Issues & TODOs

- [ ] App.css still monolithic (6,081 lines) - needs splitting
- [ ] Some components still use legacy data imports
- [ ] Route caching could be improved with IndexedDB
- [ ] Mobile responsive styles need review
- [ ] Accessibility audit needed (ARIA labels, keyboard nav)

## 💡 Design Principles

1. **Single Responsibility**: Each component/file has ONE clear purpose
2. **DRY (Don't Repeat Yourself)**: Shared logic in utils/hooks
3. **Composition over Inheritance**: Small, reusable components
4. **Separation of Concerns**: State/UI/Logic in different layers
5. **Progressive Enhancement**: Works without JS, better with it

## 📚 Further Reading

- [React Context Best Practices](https://react.dev/learn/passing-data-deeply-with-context)
- [Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [Component Composition](https://react.dev/learn/passing-props-to-a-component)
