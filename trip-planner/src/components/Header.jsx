import { getFamilyMember } from "../lib/supabase";

export default function Header({
  tripName,
  tripStats,
  templates,
  selectedTemplateId,
  onLoadTemplate,
  onSaveTemplate,
  syncStatus,
  user,
  onSignOut,
}) {
  const familyMember = user ? getFamilyMember(user.email) : null;
  return (
    <header className="header">
      <div className="header-brand">
        <div className="brand-title">
          <h1>MMT 2025</h1>
          <span className="tagline">{tripName || "Trip Planner"}</span>
          {syncStatus && (
            <span
              className={`sync-badge ${syncStatus}`}
              title={
                syncStatus === "synced"
                  ? "All changes saved to cloud"
                  : syncStatus === "syncing"
                  ? "Syncing changes..."
                  : syncStatus === "offline"
                  ? "Working offline"
                  : ""
              }
            >
              {syncStatus === "synced" && "☁️ Synced"}
              {syncStatus === "syncing" && "⏳ Syncing..."}
              {syncStatus === "offline" && "📴 Offline"}
            </span>
          )}
        </div>
        <p className="brand-subtitle">Plan it. Tweak it. Make it yours.</p>
      </div>

      <div className="header-actions">
        <select
          className="template-select"
          value={selectedTemplateId || ""}
          onChange={(e) => e.target.value && onLoadTemplate(e.target.value)}
        >
          <option value="">Load a trip...</option>
          <option value="blank">✨ Start Fresh (Blank Trip)</option>
          {templates.map((t) => (
            <option key={t.id} value={t.id}>
              {t.emoji} {t.name}
            </option>
          ))}
        </select>
        <button type="button" className="btn-primary" onClick={onSaveTemplate}>
          Save as Template
        </button>
      </div>

      <div className="header-stats">
        <span className="stat-chip">{tripStats.days} days</span>
        <span className="stat-chip">{tripStats.activities} activities</span>
      </div>

      {user && familyMember && (
        <div className="header-user">
          <span
            className="user-name"
            title={user.email}
            style={{ color: familyMember.color }}
          >
            {familyMember.emoji} {familyMember.name}
          </span>
          <button
            type="button"
            className="btn-signout"
            onClick={onSignOut}
            title="Sign out"
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
}
