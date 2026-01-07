export default function Header({
  activeView,
  onViewChange,
  tripStats,
  templates,
  selectedTemplateId,
  onLoadTemplate,
  onSaveTemplate
}) {
  return (
    <header className="header">
      <div className="header-brand">
        <div className="brand-title">
          <h1>MMT 2025</h1>
          <span className="tagline">Girls Trip to New England</span>
        </div>
        <p className="brand-subtitle">Plan, remix, and build the trip that feels perfect.</p>
      </div>

      <div className="header-nav">
        <button
          type="button"
          className={`nav-btn ${activeView === 'moms' ? 'active' : ''}`}
          onClick={() => onViewChange('moms')}
        >
          Mom&#39;s Route
        </button>
        <button
          type="button"
          className={`nav-btn ${activeView === 'builder' ? 'active' : ''}`}
          onClick={() => onViewChange('builder')}
        >
          Build &amp; Customize
        </button>
      </div>

      <div className="header-actions">
        {activeView === 'builder' && (
          <>
            <select
              className="template-select"
              value={selectedTemplateId || ''}
              onChange={(e) => e.target.value && onLoadTemplate(e.target.value)}
            >
              <option value="">Load a template...</option>
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.emoji} {t.name}
                </option>
              ))}
            </select>
            <button type="button" className="btn-primary" onClick={onSaveTemplate}>
              Save as Template
            </button>
          </>
        )}
      </div>

      <div className="header-stats">
        <span className="stat-chip">{tripStats.days} days</span>
        <span className="stat-chip">{tripStats.activities} activities</span>
      </div>
    </header>
  );
}
