import { useTripContext } from '../context/TripContext'
import './CreationWorkspace.css'

const paceOptions = [
  { id: 'slow', label: 'Slow roll', emoji: '💤', helper: 'Long mornings, limit drives <2 hrs' },
  { id: 'balanced', label: 'Balanced', emoji: '⚖️', helper: 'Blend chill + anchor activities' },
  { id: 'buzz', label: 'Buzzing', emoji: '⚡', helper: 'Pack the schedule, embrace late nights' },
]

const budgetOptions = [
  { id: 'value', label: 'Value', emoji: '💵', helper: 'Prioritize free hikes + markets' },
  { id: 'flex', label: 'Flex', emoji: '💳', helper: 'Mix splurges with casual bites' },
  { id: 'luxe', label: 'Luxe', emoji: '💎', helper: 'Spa days + chef tables' },
]

const driveOptions = [
  { id: 'classic', label: 'Classic', emoji: '🛣️', helper: 'Mirror Mom’s outline' },
  { id: 'scenic', label: '🌄 Scenic', helper: 'Route 1, Route 100, Adirondack detours' },
  { id: 'express', label: '🚀 Express', helper: 'Skip long detours, maximize city time' },
]

export default function ScenarioControls() {
  const { scenarioSettings, updateScenarioSetting } = useTripContext()

  const renderOptionRow = (title, options, settingKey) => (
    <div className="scenario-row">
      <div className="scenario-label">
        <span>{title}</span>
      </div>
      <div className="scenario-options">
        {options.map((option) => (
          <button
            key={option.id}
            className={`scenario-chip ${scenarioSettings[settingKey] === option.id ? 'is-selected' : ''}`}
            onClick={() => updateScenarioSetting(settingKey, option.id)}
          >
            <span className="chip-emoji">{option.emoji}</span>
            <div>
              <strong>{option.label}</strong>
              <p>{option.helper}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <section className="scenario-controls">
      <div className="scenario-head">
        <div>
          <p className="section-eyebrow">Scenario Controls</p>
          <h3>Tune the vibe</h3>
          <p className="section-note">Every toggle nudges recommendations, drives, and toolkit tips.</p>
        </div>
      </div>
      {renderOptionRow('Pace', paceOptions, 'pace')}
      {renderOptionRow('Budget', budgetOptions, 'budget')}
      {renderOptionRow('Drive Style', driveOptions, 'drive')}
    </section>
  )
}
