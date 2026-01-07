import { useEffect, useState } from 'react';

export default function TripSetupPanel({ trip, onNameChange, onApplySkeleton, onStartDateChange }) {
  const [form, setForm] = useState({
    startLocation: '',
    endLocation: '',
    dayCount: 5,
    style: 'balanced'
  });

  useEffect(() => {
    setForm({
      startLocation: trip.days[0]?.location || '',
      endLocation: trip.days[trip.days.length - 1]?.location || '',
      dayCount: trip.days.length,
      style: 'balanced'
    });
  }, [trip.days]);

  const endDate = (() => {
    if (!trip.startDate) return '';
    const base = new Date(trip.startDate);
    if (Number.isNaN(base.getTime())) return '';
    const end = new Date(base);
    end.setDate(base.getDate() + trip.days.length - 1);
    return end.toISOString().slice(0, 10);
  })();

  const updateField = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <section className="trip-setup">
      <div className="setup-header">
        <div>
          <h3>Trip setup</h3>
          <p>Define the bookends, then let the builder fill the middle.</p>
        </div>
        <input
          className="trip-name"
          value={trip.name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Trip name"
        />
      </div>

      <div className="setup-grid">
        <label>
          Start date
          <input type="date" value={trip.startDate || ''} onChange={(e) => onStartDateChange(e.target.value)} />
        </label>
        <label>
          End date (auto)
          <input type="date" value={endDate} readOnly />
        </label>
        <label>
          Start location
          <input value={form.startLocation} onChange={updateField('startLocation')} placeholder="Boston, MA" />
        </label>
        <label>
          End location
          <input value={form.endLocation} onChange={updateField('endLocation')} placeholder="Albany, NY" />
        </label>
        <label>
          Days
          <input
            type="number"
            min="1"
            max="20"
            value={form.dayCount}
            onChange={updateField('dayCount')}
          />
        </label>
        <label>
          Travel style
          <select value={form.style} onChange={updateField('style')}>
            <option value="relaxed">Relaxed</option>
            <option value="balanced">Balanced</option>
            <option value="hustle">Hustle</option>
          </select>
        </label>
      </div>

      <div className="setup-actions">
        <button type="button" className="btn-outline" onClick={() => onApplySkeleton(form)}>
          Generate skeleton
        </button>
      </div>
    </section>
  );
}
