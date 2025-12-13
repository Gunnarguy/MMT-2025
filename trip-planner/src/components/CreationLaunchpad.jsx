import PropTypes from 'prop-types'
import { useTripContext } from '../context/TripContext'
import './CreationWorkspace.css'

export default function CreationLaunchpad({ onUseBlueprint, onStartFresh }) {
  const { experienceMode, scenarioSettings, ideaPins } = useTripContext()

  const cards = [
    {
      id: 'mom-blueprint',
      label: "Borrow Mom's Blueprint",
      description: 'Load every stop, map marker, and quote into the builder for instant customization.',
      eyebrow: 'Original Route',
      actionLabel: 'Copy route to builder',
      onSelect: onUseBlueprint,
    },
    {
      id: 'blank-canvas',
      label: 'Start a Blank Canvas',
      description: 'Spin up a fresh storyboard with empty days, mood prompts, and idea pins.',
      eyebrow: 'Custom Creation',
      actionLabel: 'Open empty workspace',
      onSelect: onStartFresh,
    },
  ]

  return (
    <section className="creation-launchpad">
      <div className="launchpad-header">
        <div>
          <p className="section-eyebrow">Creation Modes</p>
          <h3>Plan it your way</h3>
          <p className="section-note">
            Toggle between Mom’s lovingly researched path or craft something never-been-done.
          </p>
        </div>
        <div className="launchpad-metrics">
          <div>
            <span className="metric-label">Scenario vibe</span>
            <strong>
              Pace: {scenarioSettings.pace} • Budget: {scenarioSettings.budget} • Drive: {scenarioSettings.drive}
            </strong>
          </div>
          <div>
            <span className="metric-label">Pinned sparks</span>
            <strong>{ideaPins.length || 0}</strong>
          </div>
        </div>
      </div>
      <div className="launchpad-cards">
        {cards.map((card) => (
          <button
            key={card.id}
            className={`launchpad-card ${experienceMode === card.id ? 'is-active' : ''}`}
            onClick={() => {
              card.onSelect?.()
            }}
          >
            <p className="card-eyebrow">{card.eyebrow}</p>
            <h4>{card.label}</h4>
            <p>{card.description}</p>
            <span className="card-action">{card.actionLabel}</span>
            {experienceMode === card.id && <span className="current-pill">Current</span>}
          </button>
        ))}
      </div>
    </section>
  )
}

CreationLaunchpad.propTypes = {
  onUseBlueprint: PropTypes.func,
  onStartFresh: PropTypes.func,
}
