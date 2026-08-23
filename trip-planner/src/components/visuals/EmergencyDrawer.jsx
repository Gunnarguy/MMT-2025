import { useState } from "react";
import { telHref } from "../../lib/format";

export const EMERGENCY_CONTACTS = [
  {
    category: "Car & Roadside",
    contacts: [
      { name: "Budget 24/7 Roadside Assistance", phone: "800-354-2847", note: "Flat tires, jumpstarts, lockouts" },
      { name: "Budget O'Hare Multi-Modal Desk", phone: "773-825-4600", note: "Counter open 24 hours" },
      { name: "Illinois Tollway Roadside Star (*999)", phone: "*999", note: "Free H.E.L.P. highway patrol" },
    ],
  },
  {
    category: "Border & Ferry Operations",
    contacts: [
      { name: "Shepler's Mackinac Island Ferry", phone: "800-828-8777", note: "Mackinaw City dock dispatch" },
      { name: "Blue Water Bridge Authority (Port Huron)", phone: "810-984-3131", note: "Bridge traffic & toll questions" },
      { name: "Detroit–Windsor Tunnel 24/7 Control", phone: "313-567-4422", note: "Tunnel operations & CBP exit" },
    ],
  },
  {
    category: "Highway Patrol & Police",
    contacts: [
      { name: "Michigan State Police (Post 73 - TC)", phone: "231-938-0714", note: "Grand Traverse / Leelanau coverage" },
      { name: "Ontario Provincial Police (OPP)", phone: "888-310-1122", note: "Hwy 402/401 provincial patrol" },
      { name: "Emergency Dispatch", phone: "911", note: "US & Canada nationwide emergency" },
    ],
  },
  {
    category: "Route Urgent Care & Hospitals",
    contacts: [
      { name: "Munson Medical Center (Traverse City)", phone: "231-935-5000", note: "1105 6th St · Level II Trauma" },
      { name: "McLaren Port Huron Hospital", phone: "810-987-5000", note: "1221 Pine Grove Ave · Near Bridge" },
      { name: "Windsor Regional Hospital (Ontario)", phone: "519-254-5577", note: "1995 Lens Ave, Windsor" },
    ],
  },
];

export default function EmergencyDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="emergency-widget">
      <button
        type="button"
        className={`emergency-trigger-btn${isOpen ? " is-open" : ""}`}
        onClick={() => setIsOpen((o) => !o)}
        title="Quick-dial emergency contacts and roadside assistance"
      >
        <span>🚨</span>
        <b>{isOpen ? "Close Emergency Drawer" : "Roadside & Emergency Quick-Dial"}</b>
      </button>

      {isOpen && (
        <div className="emergency-modal">
          <div className="emergency-modal-head">
            <h3>🚨 Emergency &amp; Roadside Quick-Dial Directory</h3>
            <button
              type="button"
              className="emergency-close-btn"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="emergency-grid">
            {EMERGENCY_CONTACTS.map((group) => (
              <div key={group.category} className="emergency-group">
                <h4>{group.category}</h4>
                <div className="emergency-list">
                  {group.contacts.map((c) => (
                    <div key={c.name} className="emergency-item">
                      <div className="emergency-item-info">
                        <b>{c.name}</b>
                        <small className="muted">{c.note}</small>
                      </div>
                      <a href={telHref(c.phone)} className="emergency-dial-btn">
                        📞 {c.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
