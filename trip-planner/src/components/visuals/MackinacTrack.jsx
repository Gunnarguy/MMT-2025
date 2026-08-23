/**
 * Mackinac Island M-185 Milepost Trail Track (Day 4).
 *
 * 100% Factual Michigan State Highway M-185 mile markers:
 * - 8.2 miles total, completely flat, paved, zero motor vehicles.
 * - Mile 0.0: Ferry Dock & Bike Rental
 * - Mile 1.5: Arch Rock (207-step stairway)
 * - Mile 4.1: British Landing (Halfway point, restrooms, water, snack bar)
 * - Mile 6.8: West Bluff (Straits & Grand Hotel views)
 * - Mile 8.2: Town return → Fort Mackinac
 */

const MILEPOSTS = [
  {
    mile: "Mile 0.0",
    name: "Main St & Dock",
    desc: "Shepler's Ferry arrival, Lucky Bean coffee, rent cruiser bikes at Mackinac Island Bike Shop.",
  },
  {
    mile: "Mile 1.5",
    name: "Arch Rock",
    desc: "Natural limestone formation 146 ft above the water. 207 wooden steps lead up from the shoreline road.",
  },
  {
    mile: "Mile 4.1",
    name: "British Landing",
    desc: "Exact halfway point. Public restrooms, fresh water bottle refills, snack bar, and 1812 cannon.",
  },
  {
    mile: "Mile 6.8",
    name: "West Bluff",
    desc: "Expansive views of the Straits of Mackinac, the Mackinac Bridge, and the Grand Hotel on the bluff.",
  },
  {
    mile: "Mile 8.2",
    name: "Downtown / Fort",
    desc: "Complete the flat loop, return rented bikes, and walk up the switchback ramp to Fort Mackinac.",
  },
];

export default function MackinacTrack() {
  return (
    <div className="mackinac-track">
      <div className="dune-card-head">
        <div className="eyebrow" style={{ color: "#0d9488" }}>The Car-Free Highway</div>
        <h3>M-185 Perimeter Loop — Mile-by-Mile Guide (8.2 Miles)</h3>
        <p className="muted" style={{ fontSize: "var(--t-xs)", margin: 0 }}>
          Flat, paved, counter-clockwise loop. Biking takes ~1.5–2 hours with scenic photo stops.
        </p>
      </div>

      <div className="track-ribbon">
        {MILEPOSTS.map((m) => (
          <div className="track-node" key={m.mile}>
            <div className="track-mile">{m.mile}</div>
            <div className="track-name">{m.name}</div>
            <div className="track-desc">{m.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
