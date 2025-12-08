import PropTypes from 'prop-types';
import './TabSystem.css';

/**
 * TabSystem Component
 * Clean tab navigation system to replace conditional rendering
 */
export default function TabSystem({ activeTab, onTabChange, tabs }) {
  return (
    <nav className="tab-system">
      <div className="tab-list">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'is-active' : ''}`}
            onClick={() => onTabChange(tab.id)}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            {tab.icon && <span className="tab-icon">{tab.icon}</span>}
            <span className="tab-label">{tab.label}</span>
            {tab.count !== undefined && (
              <span className="tab-count">{tab.count}</span>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}

TabSystem.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string,
    count: PropTypes.number
  })).isRequired
};
