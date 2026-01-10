import { useEffect, useMemo, useState } from "react";
import { categories } from "../data/catalog";

const emptyForm = {
  name: "",
  location: "",
  address: "",
  category: "custom",
  description: "",
  duration: "",
  price: "",
  rating: "",
  notes: "",
  tags: "",
  website: "",
  phone: "",
};

export default function CustomPlaceModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  days,
  defaultDayId,
}) {
  if (!isOpen) return null;

  const [form, setForm] = useState(emptyForm);
  const [targetDayId, setTargetDayId] = useState(defaultDayId || "");
  const [saving, setSaving] = useState(false);
  const [searching, setSearching] = useState(false);

  const handleSearchLocation = async (queryOverride) => {
    const q =
      queryOverride ||
      (form.location ? `${form.name} ${form.location}` : form.name);
    if (!q) return;

    setSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          q
        )}`
      );
      const data = await res.json();
      if (data && data.length > 0) {
        const place = data[0];
        setForm((prev) => ({
          ...prev,
          location: prev.location || place.display_name.split(",")[0],
          coordinates: [Number(place.lat), Number(place.lon)],
        }));
      } else if (!queryOverride) {
        // Only alert if manual search; silent fail for auto-search
        alert("No location found for this name.");
      }
    } catch (e) {
      console.error(e);
      if (!queryOverride) alert("Search failed.");
    } finally {
      setSearching(false);
    }
  };

  useEffect(() => {
    const data = initialData
      ? {
          ...emptyForm,
          ...initialData,
          tags: Array.isArray(initialData.tags)
            ? initialData.tags.join(", ")
            : initialData.tags || "",
        }
      : emptyForm;
    setForm(data);
    setTargetDayId(defaultDayId || days?.[0]?.id || "");

    // Auto-search if we have a name but no location/coords (e.g. coming from "Search Web" button)
    if (
      initialData?.name &&
      !initialData.coordinates &&
      !initialData.location
    ) {
      // Small delay to ensure state is set
      const timer = setTimeout(
        () => handleSearchLocation(initialData.name),
        100
      );
      return () => clearTimeout(timer);
    }
  }, [isOpen, initialData, defaultDayId, days]);

  const categoryOptions = useMemo(() => {
    return Object.values(categories).filter((cat) => cat.id !== "city");
  }, []);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      await onSave({
        ...form,
        duration: form.duration ? Number(form.duration) : null,
        rating: form.rating ? Number(form.rating) : null,
        tags: form.tags
          ? form.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
        dayId: targetDayId,
      });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal modal-wide"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-header">
          <div>
            <span className="modal-eyebrow">Custom place</span>
            <h2>{initialData ? "Edit custom place" : "Add a custom place"}</h2>
            <p>Save the details you actually need while planning.</p>
          </div>
          <button
            type="button"
            className="icon-btn"
            onClick={onClose}
            aria-label="Close custom place"
          >
            x
          </button>
        </header>

        <div className="modal-body">
          <div className="modal-grid">
            <label>
              Place name
              <input
                value={form.name}
                onChange={handleChange("name")}
                placeholder="e.g., Mike&#39;s Pastry"
              />
            </label>
            <label>
              Location
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  style={{ flex: 1 }}
                  value={form.location}
                  onChange={handleChange("location")}
                  placeholder="e.g., Boston, MA"
                />
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => handleSearchLocation()}
                  disabled={searching}
                >
                  {searching ? "..." : "🔍"}
                </button>
              </div>
            </label>
            <label className="span-2">
              Address (optional)
              <input
                value={form.address}
                onChange={handleChange("address")}
                placeholder="Full address for directions"
              />
            </label>
            <label>
              Phone (optional)
              <input
                value={form.phone}
                onChange={handleChange("phone")}
                placeholder="(207) 555-1234"
              />
            </label>
            <label>
              Category
              <select value={form.category} onChange={handleChange("category")}>
                {categoryOptions.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Duration (hours)
              <input
                value={form.duration}
                onChange={handleChange("duration")}
                placeholder="1.5"
              />
            </label>
            <label>
              Price range
              <input
                value={form.price}
                onChange={handleChange("price")}
                placeholder="$$"
              />
            </label>
            <label>
              Rating
              <input
                value={form.rating}
                onChange={handleChange("rating")}
                placeholder="4.8"
              />
            </label>
            <label className="span-2">
              Description
              <textarea
                value={form.description}
                onChange={handleChange("description")}
                placeholder="Why this place matters"
              />
            </label>
            <label className="span-2">
              Notes
              <textarea
                value={form.notes}
                onChange={handleChange("notes")}
                placeholder="Reservations, parking tips, best time to go"
              />
            </label>
            <label className="span-2">
              Tags (comma separated)
              <input
                value={form.tags}
                onChange={handleChange("tags")}
                placeholder="lobster, sunset, photo"
              />
            </label>
            <label className="span-2">
              Website or booking link
              <input
                value={form.website}
                onChange={handleChange("website")}
                placeholder="https://"
              />
            </label>
          </div>
        </div>

        <div className="modal-actions">
          <div className="day-select">
            <label htmlFor="day-select-custom">Add to day</label>
            <select
              id="day-select-custom"
              value={targetDayId}
              onChange={(e) => setTargetDayId(e.target.value)}
            >
              {days.map((day) => (
                <option key={day.id} value={day.id}>
                  Day {day.dayNumber}: {day.location || day.label}
                </option>
              ))}
            </select>
          </div>
          <button type="button" className="btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save place"}
          </button>
        </div>
      </div>
    </div>
  );
}
