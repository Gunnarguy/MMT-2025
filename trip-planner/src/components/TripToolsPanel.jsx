import { useMemo, useState, useEffect } from 'react';
import { downloadCalendar, buildTripCalendar } from '../utils/icsUtils';
import { fetchDailyWeather } from '../utils/weatherUtils';

const emptyBudget = {
  targetTotal: '',
  perDayTarget: '',
  items: []
};

export default function TripToolsPanel({ trip, setTrip, getActivity }) {
  const [activeTab, setActiveTab] = useState('budget');
  const [budgetForm, setBudgetForm] = useState({ label: '', cost: '', dayId: '' });
  const [reservationForm, setReservationForm] = useState({
    title: '',
    dayId: '',
    time: '',
    confirmation: '',
    phone: '',
    url: '',
    notes: ''
  });
  const [checklistForm, setChecklistForm] = useState({ label: '', category: 'General' });
  const [weatherData, setWeatherData] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(false);

  const budget = trip.budget || emptyBudget;
  const reservations = trip.reservations || [];
  const checklist = trip.checklist || [];

  const totalBudget = useMemo(() => {
    return budget.items.reduce((sum, item) => sum + (Number(item.cost) || 0), 0);
  }, [budget.items]);

  const updateBudgetField = (field, value) => {
    setTrip((prev) => ({
      ...prev,
      budget: { ...emptyBudget, ...(prev.budget || {}), [field]: value }
    }));
  };

  const addBudgetItem = () => {
    if (!budgetForm.label.trim()) return;
    const item = {
      id: `budget-${Date.now()}`,
      label: budgetForm.label.trim(),
      cost: Number(budgetForm.cost) || 0,
      dayId: budgetForm.dayId || null
    };
    setTrip((prev) => ({
      ...prev,
      budget: {
        ...emptyBudget,
        ...(prev.budget || {}),
        items: [...(prev.budget?.items || []), item]
      }
    }));
    setBudgetForm({ label: '', cost: '', dayId: '' });
  };

  const deleteBudgetItem = (itemId) => {
    setTrip((prev) => ({
      ...prev,
      budget: {
        ...emptyBudget,
        ...(prev.budget || {}),
        items: (prev.budget?.items || []).filter((item) => item.id !== itemId)
      }
    }));
  };

  const populateBudgetFromItinerary = () => {
    if (!window.confirm('Scan itinerary and add estimated costs to budget?')) return;
    
    const newItems = [];
    trip.days.forEach(day => {
      day.activities.forEach(id => {
        const activity = getActivity(id);
        if (!activity || !activity.price) return;
        
        // Skip if already in budget (simple check by label)
        if (budget.items.some(i => i.label === activity.name)) return;

        // Estimate cost based on $$$ signs
        let estimatedCost = 0;
        const priceStr = String(activity.price);
        if (priceStr.includes('$$$')) estimatedCost = 100;
        else if (priceStr.includes('$$')) estimatedCost = 50;
        else if (priceStr.includes('$')) estimatedCost = 25;
        // Parse numbers if present
        const match = priceStr.match(/\d+/);
        if (match) estimatedCost = Number(match[0]);

        if (estimatedCost > 0) {
          newItems.push({
            id: `budget-auto-${id}-${Date.now()}`,
            label: activity.name,
            cost: estimatedCost,
            dayId: day.id
          });
        }
      });
    });

    if (newItems.length === 0) {
      window.alert('No new priced activities found to add.');
      return;
    }

    setTrip((prev) => ({
      ...prev,
      budget: {
        ...emptyBudget,
        ...(prev.budget || {}),
        items: [...(prev.budget?.items || []), ...newItems]
      }
    }));
  };

  const addReservation = () => {
    if (!reservationForm.title.trim()) return;
    const item = {
      id: `res-${Date.now()}`,
      ...reservationForm,
      title: reservationForm.title.trim()
    };
    setTrip((prev) => ({
      ...prev,
      reservations: [...(prev.reservations || []), item]
    }));
    setReservationForm({ title: '', dayId: '', time: '', confirmation: '', phone: '', url: '', notes: '' });
  };

  const deleteReservation = (id) => {
    setTrip((prev) => ({
      ...prev,
      reservations: (prev.reservations || []).filter((item) => item.id !== id)
    }));
  };

  const addChecklistItem = () => {
    if (!checklistForm.label.trim()) return;
    const item = {
      id: `check-${Date.now()}`,
      label: checklistForm.label.trim(),
      category: checklistForm.category || 'General',
      done: false
    };
    setTrip((prev) => ({
      ...prev,
      checklist: [...(prev.checklist || []), item]
    }));
    setChecklistForm({ label: '', category: 'General' });
  };

  const toggleChecklist = (id) => {
    setTrip((prev) => ({
      ...prev,
      checklist: (prev.checklist || []).map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    }));
  };

  const deleteChecklist = (id) => {
    setTrip((prev) => ({
      ...prev,
      checklist: (prev.checklist || []).filter((item) => item.id !== id)
    }));
  };

  const handleExportCalendar = () => {
    const ics = buildTripCalendar(trip, getActivity);
    if (!ics) {
      window.alert('Add a start date and at least one scheduled item to export.');
      return;
    }
    downloadCalendar(ics, 'mmt-trip.ics');
  };

  const loadWeather = async () => {
    if (!trip.startDate) {
      window.alert('Please set a Trip Start Date in the Setup panel first.');
      return;
    }
    setLoadingWeather(true);
    const results = {};
    const startDate = new Date(trip.startDate);
    
    // Iterate first 7 days
    for (let i = 0; i < Math.min(trip.days.length, 7); i++) {
      const day = trip.days[i];
      // Get date string YYYY-MM-DD
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];

      // Find a location (first activity with coords)
      const activityWithCoords = day.activities
        .map(id => getActivity(id))
        .find(a => a && a.coordinates);
      
      if (activityWithCoords) {
        const [lat, lon] = activityWithCoords.coordinates;
        const data = await fetchDailyWeather(lat, lon, dateStr);
        if (data) results[day.id] = data;
      }
    }
    setWeatherData(results);
    setLoadingWeather(false);
  };

  return (
    <section className="tools-panel">
      <div className="tools-header">
        <h3>Trip tools</h3>
        <button type="button" className="ghost-btn" onClick={handleExportCalendar}>
          Export calendar
        </button>
      </div>
      <div className="tools-tabs">
        <button
          type="button"
          className={`mode-btn ${activeTab === 'budget' ? 'active' : ''}`}
          onClick={() => setActiveTab('budget')}
        >
          Budget
        </button>
        <button
          type="button"
          className={`mode-btn ${activeTab === 'reservations' ? 'active' : ''}`}
          onClick={() => setActiveTab('reservations')}
        >
          Reservations
        </button>
        <button
          type="button"
          className={`mode-btn ${activeTab === 'checklist' ? 'active' : ''}`}
          onClick={() => setActiveTab('checklist')}
        >
          Checklist
        </button>
        <button
          type="button"
          className={`mode-btn ${activeTab === 'weather' ? 'active' : ''}`}
          onClick={() => setActiveTab('weather')}
        >
          Weather
        </button>
      </div>

      {activeTab === 'budget' && (
        <div className="tools-body">
          <div className="tools-grid">
            <label>
              Target total
              <input
                type="number"
                value={budget.targetTotal}
                onChange={(e) => updateBudgetField('targetTotal', e.target.value)}
              />
            </label>
            <label>
              Target per day
              <input
                type="number"
                value={budget.perDayTarget}
                onChange={(e) => updateBudgetField('perDayTarget', e.target.value)}
              />
            </label>
          </div>
          <p className="tools-meta">
            Planned so far: ${Math.round(totalBudget).toLocaleString()}
            {budget.targetTotal && ` / $${Number(budget.targetTotal).toLocaleString()}`}
          </p>

          <button className="btn-outline full-width" style={{marginBottom: '1rem'}} onClick={populateBudgetFromItinerary}>
            Auto-populate from Itinerary
          </button>

          <div className="tools-form">
            <input
              placeholder="Budget item"
              value={budgetForm.label}
              onChange={(e) => setBudgetForm((prev) => ({ ...prev, label: e.target.value }))}
            />
            <input
              type="number"
              placeholder="Cost"
              value={budgetForm.cost}
              onChange={(e) => setBudgetForm((prev) => ({ ...prev, cost: e.target.value }))}
            />
            <select
              value={budgetForm.dayId}
              onChange={(e) => setBudgetForm((prev) => ({ ...prev, dayId: e.target.value }))}
            >
              <option value="">Trip-wide</option>
              {trip.days.map((day) => (
                <option key={day.id} value={day.id}>
                  Day {day.dayNumber}
                </option>
              ))}
            </select>
            <button type="button" className="ghost-btn" onClick={addBudgetItem}>
              Add
            </button>
          </div>

          <div className="tools-list">
            {budget.items.map((item) => (
              <div key={item.id} className="tools-item">
                <div>
                  <strong>{item.label}</strong>
                  {item.dayId && <small>Day {trip.days.find((d) => d.id === item.dayId)?.dayNumber}</small>}
                </div>
                <span>${Number(item.cost || 0).toFixed(0)}</span>
                <button type="button" className="ghost-btn" onClick={() => deleteBudgetItem(item.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'reservations' && (
        <div className="tools-body">
          <div className="tools-form grid">
            <input
              placeholder="Reservation name"
              value={reservationForm.title}
              onChange={(e) => setReservationForm((prev) => ({ ...prev, title: e.target.value }))}
            />
            <select
              value={reservationForm.dayId}
              onChange={(e) => setReservationForm((prev) => ({ ...prev, dayId: e.target.value }))}
            >
              <option value="">Select day</option>
              {trip.days.map((day) => (
                <option key={day.id} value={day.id}>
                  Day {day.dayNumber}
                </option>
              ))}
            </select>
            <input
              type="time"
              value={reservationForm.time}
              onChange={(e) => setReservationForm((prev) => ({ ...prev, time: e.target.value }))}
            />
            <input
              placeholder="Confirmation"
              value={reservationForm.confirmation}
              onChange={(e) => setReservationForm((prev) => ({ ...prev, confirmation: e.target.value }))}
            />
            <input
              placeholder="Phone"
              value={reservationForm.phone}
              onChange={(e) => setReservationForm((prev) => ({ ...prev, phone: e.target.value }))}
            />
            <input
              placeholder="URL"
              value={reservationForm.url}
              onChange={(e) => setReservationForm((prev) => ({ ...prev, url: e.target.value }))}
            />
            <textarea
              placeholder="Notes"
              value={reservationForm.notes}
              onChange={(e) => setReservationForm((prev) => ({ ...prev, notes: e.target.value }))}
            />
            <button type="button" className="ghost-btn" onClick={addReservation}>
              Add reservation
            </button>
          </div>

          <div className="tools-list">
            {reservations.map((item) => (
              <div key={item.id} className="tools-item wide">
                <div>
                  <strong>{item.title}</strong>
                  <small>
                    Day {trip.days.find((d) => d.id === item.dayId)?.dayNumber || '--'}
                    {item.time ? ` at ${item.time}` : ''}
                  </small>
                  {item.confirmation && <small>Conf: {item.confirmation}</small>}
                  {item.url && (
                    <small>
                      <a href={item.url} target="_blank" rel="noreferrer">
                        {item.url}
                      </a>
                    </small>
                  )}
                  {item.notes && <small>{item.notes}</small>}
                </div>
                <button type="button" className="ghost-btn" onClick={() => deleteReservation(item.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'checklist' && (
        <div className="tools-body">
          <div className="tools-form">
            <input
              placeholder="Checklist item"
              value={checklistForm.label}
              onChange={(e) => setChecklistForm((prev) => ({ ...prev, label: e.target.value }))}
            />
            <input
              placeholder="Category"
              value={checklistForm.category}
              onChange={(e) => setChecklistForm((prev) => ({ ...prev, category: e.target.value }))}
            />
            <button type="button" className="ghost-btn" onClick={addChecklistItem}>
              Add
            </button>
          </div>

          <div className="tools-list">
            {checklist.map((item) => (
              <div key={item.id} className={`tools-item ${item.done ? 'done' : ''}`}>
                <label>
                  <input type="checkbox" checked={item.done} onChange={() => toggleChecklist(item.id)} />
                  <span>{item.label}</span>
                  <small>{item.category}</small>
                </label>
                <button type="button" className="ghost-btn" onClick={() => deleteChecklist(item.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'weather' && (
        <div className="tools-body">
          {!trip.startDate ? (
             <p className="tools-meta">Set a Start Date in Trip Setup to see weather.</p>
          ) : (
            <>
              <button className="btn-primary full-width" onClick={loadWeather} disabled={loadingWeather}>
                {loadingWeather ? 'Loading forecast...' : 'Refresh Forecast'}
              </button>
              <div className="tools-list">
                {trip.days.map((day) => {
                  const w = weatherData ? weatherData[day.id] : null;
                  return (
                    <div key={day.id} className="tools-item">
                      <div>
                        <strong>Day {day.dayNumber}</strong>
                        {w ? (
                           <span>{w.icon} {w.maxTemp}° / {w.minTemp}° - {w.condition}</span>
                        ) : (
                           <small className="faded">No data (add location with coords)</small>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
}