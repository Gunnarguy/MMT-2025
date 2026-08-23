import { useState } from "react";
import { FX } from "../../data/budget";

export default function OntarioToolkit() {
  const [usdInput, setUsdInput] = useState("50");
  const [cadGasInput, setCadGasInput] = useState("1.62");

  const usdNum = parseFloat(usdInput) || 0;
  const cadEquivalent = (usdNum / FX.usdPerCad).toFixed(2);

  const cadGasNum = parseFloat(cadGasInput) || 0;
  // 1 Gallon = 3.78541 Liters
  const usdPerGallon = ((cadGasNum * 3.78541) * FX.usdPerCad).toFixed(2);

  return (
    <div className="ontario-toolkit-card">
      <div className="toolkit-head">
        <div className="toolkit-title">
          <span>🇨🇦 Ontario Driving &amp; Currency Toolkit</span>
          <small className="muted">Essential road conversions for Days 5 &amp; 6 in Canada</small>
        </div>
      </div>

      <div className="toolkit-grid">
        {/* Currency Converter */}
        <div className="toolkit-box">
          <div className="toolkit-box-head">
            <b>💵 Currency Converter</b>
            <span className="toolkit-rate">Rate: $1 USD = CA${(1 / FX.usdPerCad).toFixed(2)}</span>
          </div>
          <div className="toolkit-calc-row">
            <div className="calc-input-wrap">
              <label htmlFor="usd-amt">$ USD</label>
              <input
                id="usd-amt"
                type="number"
                value={usdInput}
                onChange={(e) => setUsdInput(e.target.value)}
                className="calc-input"
              />
            </div>
            <span className="calc-arrow">➔</span>
            <div className="calc-result">
              <b>CA${cadEquivalent}</b>
              <small>CAD Total</small>
            </div>
          </div>
        </div>

        {/* Gas Price Converter */}
        <div className="toolkit-box">
          <div className="toolkit-box-head">
            <b>⛽ Gas: CA$/L to USD/Gal</b>
            <span className="toolkit-rate">US vs Ontario</span>
          </div>
          <div className="toolkit-calc-row">
            <div className="calc-input-wrap">
              <label htmlFor="cad-gas">CA$ / Liter</label>
              <input
                id="cad-gas"
                type="number"
                step="0.01"
                value={cadGasInput}
                onChange={(e) => setCadGasInput(e.target.value)}
                className="calc-input"
              />
            </div>
            <span className="calc-arrow">➔</span>
            <div className="calc-result">
              <b>${usdPerGallon}</b>
              <small>USD / Gallon</small>
            </div>
          </div>
          <small className="muted" style={{ display: "block", marginTop: "4px", fontSize: "11px" }}>
            US Michigan gas is ~$3.55/gal &mdash; filling in Port Huron before crossing saves ~$18.
          </small>
        </div>

        {/* Speed Limits */}
        <div className="toolkit-box toolkit-box--full">
          <div className="toolkit-box-head">
            <b>🚗 Ontario Speed Limit Quick Reference</b>
            <span className="toolkit-rate">Don't speed on 402/401</span>
          </div>
          <div className="speed-pill-grid">
            <div className="speed-pill">
              <b>50 km/h</b>
              <span>= 31 mph (City/Towns)</span>
            </div>
            <div className="speed-pill">
              <b>80 km/h</b>
              <span>= 50 mph (Rural 2-Lane)</span>
            </div>
            <div className="speed-pill">
              <b>100 km/h</b>
              <span>= 62 mph (Hwy 402 Sarnia)</span>
            </div>
            <div className="speed-pill">
              <b>110 km/h</b>
              <span>= 68 mph (Hwy 401 Express)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
