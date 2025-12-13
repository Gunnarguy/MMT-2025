import PropTypes from 'prop-types'
import { useTripContext } from '../context/TripContext'
import './CreationWorkspace.css'

const experienceLabels = {
  'mom-blueprint': "Mom's blueprint",
  'blank-canvas': 'Blank canvas',
}

/**
 * Visual workspace for crafting a storyboard before committing to the schedule builder.
 * Lets the crew map destinations + notes per day while persisting to TripContext.
 */
export default function CreationCanvas({ onCommitPlan }) {
  const {
    experienceMode,
    canvasBlueprint,
    updateCanvasDay,
    creationNotes,
    setCreationNotes,
  } = useTripContext()

  return (
    <section className="creation-canvas">
      <header className="canvas-head">
        <div>
          <p className="section-eyebrow">Canvas Workspace</p>
          <h3>Storyboard the week</h3>
          <p className="section-note">
            Jot down locations, anchors, and mood notes before locking things into the formal builder.
          </p>
        </div>
        <div className="canvas-head-meta">
          <span className="mode-pill">{experienceLabels[experienceMode] || 'Custom mode'}</span>
          {onCommitPlan && (
            <button className="ghost-btn" onClick={onCommitPlan}>
              ➜ Send to schedule
            </button>
          )}
        </div>
      </header>

      <label className="notes-field">
        <span>Big thoughts, reminders, or constraints</span>
        <textarea
          value={creationNotes}
          onChange={(e) => setCreationNotes(e.target.value)}
          placeholder="Crew priorities, budget guardrails, or things Mom insists on."
        />
      </label>

      <div className="canvas-grid">
        {canvasBlueprint.map((day) => (
          <div key={day.id} className="canvas-card">
            <div className="canvas-card-head">
              <strong>{day.label}</strong>
            </div>
            <input
              type="text"
              value={day.location}
              onChange={(e) => updateCanvasDay(day.id, { location: e.target.value })}
              placeholder="Where are we?"
            />
            <textarea
              value={day.notes}
              onChange={(e) => updateCanvasDay(day.id, { notes: e.target.value })}
              placeholder="Story beats, reservations, or vibes"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

CreationCanvas.propTypes = {
  onCommitPlan: PropTypes.func,
}
