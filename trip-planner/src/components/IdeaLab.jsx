import PropTypes from 'prop-types'
import { ideaLabDeck } from '../data/ideaLab'
import { useTripContext } from '../context/TripContext'
import './CreationWorkspace.css'

export default function IdeaLab({ onInspire }) {
  const { ideaPins, pinIdea, unpinIdea } = useTripContext()
  const pinnedIds = new Set(ideaPins.map((idea) => idea.id))

  return (
    <section className="idea-lab">
      <header className="idea-lab-head">
        <div>
          <p className="section-eyebrow">Idea Lab</p>
          <h3>Pin sparks & remix</h3>
          <p className="section-note">
            Curated prompts from Mom’s research + planner intelligence. Pin anything that makes you say “ooo yes.”
          </p>
        </div>
        <div className="idea-lab-meta">
          <strong>{ideaPins.length}</strong>
          <span>pinned for later</span>
        </div>
      </header>
      <div className="idea-grid">
        {ideaLabDeck.map((idea) => {
          const isPinned = pinnedIds.has(idea.id)
          return (
            <article key={idea.id} className={`idea-card ${isPinned ? 'is-pinned' : ''}`}>
              <div className="idea-card-top">
                <span className="idea-emoji">{idea.emoji}</span>
                <button
                  className="pin-toggle"
                  onClick={() => (isPinned ? unpinIdea(idea.id) : pinIdea(idea))}
                  aria-pressed={isPinned}
                >
                  {isPinned ? '★ Pinned' : '☆ Pin'}
                </button>
              </div>
              <h4>{idea.title}</h4>
              <p className="idea-summary">{idea.summary}</p>
              <ul>
                {idea.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <div className="idea-card-actions">
                <button className="ghost-btn" onClick={() => onInspire?.(idea)}>
                  Add to canvas
                </button>
                <span className="idea-tag">{idea.region}</span>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

IdeaLab.propTypes = {
  onInspire: PropTypes.func,
}
