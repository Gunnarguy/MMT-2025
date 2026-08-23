/**
 * Step-by-Step Cashless Border Crossing Cards (Days 5 & 6 / Border Page).
 *
 * 100% Factual procedures for:
 * 1. Blue Water Bridge (Port Huron, MI → Point Edward, ON)
 * 2. Detroit–Windsor Tunnel (Windsor, ON → Downtown Detroit, MI)
 */

export function BlueWaterBridgeSteps() {
  return (
    <div className="border-flow">
      <div className="border-flow-title">
        Blue Water Bridge — Step-by-Step Lane & Customs Guide (Sat 9/19)
      </div>
      <div className="border-steps-grid">
        <div className="border-step-card">
          <span className="border-step-num">Step 1 · Prep</span>
          <span className="border-step-heading">Fuel & Cooler on US Side</span>
          <span className="border-step-body">
            Fill the tank in Port Huron (Ontario gas is ~CA$1.62/L / $4.40/gal). Eat or bin all fresh fruit. Melatonin in retail bottle only.
          </span>
        </div>
        <div className="border-step-card">
          <span className="border-step-num">Step 2 · Toll</span>
          <span className="border-step-heading">100% Cashless Plaza ($5 USD)</span>
          <span className="border-step-body">
            Have credit card or Apple Pay ready in the driver’s door. Cash is not accepted in either direction since April 2025. Tap and proceed.
          </span>
        </div>
        <div className="border-step-card">
          <span className="border-step-num">Step 3 · Span</span>
          <span className="border-step-heading">Bridge Crossing & Speed Limit</span>
          <span className="border-step-body">
            Cross over the St. Clair River into Canada. Note speed limits change to km/h (100 km/h on Highway 402 is 62 mph).
          </span>
        </div>
        <div className="border-step-card">
          <span className="border-step-num">Step 4 · Customs</span>
          <span className="border-step-heading">CBSA Primary Inspection</span>
          <span className="border-step-body">
            Roll down all 4 windows. Driver hands over all 3 passports and states hotel (Four Points Point Edward) and 1-night stay length.
          </span>
        </div>
      </div>
    </div>
  );
}

export function DetroitTunnelSteps() {
  return (
    <div className="border-flow">
      <div className="border-flow-title">
        Detroit–Windsor Tunnel — Step-by-Step Re-entry Guide (Sun 9/20)
      </div>
      <div className="border-steps-grid">
        <div className="border-step-card">
          <span className="border-step-num">Step 1 · Prep</span>
          <span className="border-step-heading">Exemption & Produce Check</span>
          <span className="border-step-body">
            Keep receipts. Under 48 hrs in Canada caps personal exemption at $200 USD/person and 150 mL alcohol. Clear out any Canadian fruit.
          </span>
        </div>
        <div className="border-step-card">
          <span className="border-step-num">Step 2 · Toll</span>
          <span className="border-step-heading">Cashless Portal (CA$8.25)</span>
          <span className="border-step-body">
            Follow downtown Windsor tunnel signs (Goyeau St). Pay CA$8.25 by card at the kiosk (or $5.00 USD on the DWT mobile app). No cash.
          </span>
        </div>
        <div className="border-step-card">
          <span className="border-step-num">Step 3 · Tunnel</span>
          <span className="border-step-heading">5,160-ft Sub-River Drive</span>
          <span className="border-step-body">
            Drive beneath the Detroit River. Height limit is 12’8” (standard SUVs clear easily). Keep headlights on.
          </span>
        </div>
        <div className="border-step-card">
          <span className="border-step-num">Step 4 · Customs</span>
          <span className="border-step-heading">CBP US Inspection & Downtown Exit</span>
          <span className="border-step-body">
            Driver presents 3 US passports and declares purchases. Plaza surfaces right at Jefferson & Randolph in downtown Detroit.
          </span>
        </div>
      </div>
    </div>
  );
}
