/**
 * Sunday Decision Fork Comparator (Day 6 / Loose Ends).
 *
 * Side-by-side visual trade-offs between Plan A (Canada / Detroit)
 * and Plan B (Dearborn / Henry Ford Museum).
 */

export default function SundayComparator() {
  return (
    <div className="comparator-grid">
      <div className="comparator-card comparator-card--recommended">
        <span className="comparator-badge comparator-badge--teal">
          Plan A · Canada & Detroit (Recommended)
        </span>
        <div className="comparator-title">Windsor Skyline + Belle Isle + The Belt</div>
        <ul className="comparator-steps">
          <li>
            <b>8:30 AM</b> Depart Sarnia → Highway 401 to Windsor (67 mi, 1h15m)
          </li>
          <li>
            <b>9:45 AM</b> Odette Sculpture Park (Best Detroit skyline view from Canada)
          </li>
          <li>
            <b>10:30 AM</b> Detroit–Windsor Tunnel (Surfaces downtown)
          </li>
          <li>
            <b>11:00 AM</b> Belle Isle Aquarium & Conservatory (Oldest in US, 1904)
          </li>
          <li>
            <b>1:30 PM</b> Downtown Detroit & The Belt outdoor gallery (Meet Emma)
          </li>
          <li>
            <b>5:30 PM</b> Belleville arrival (Julia's / Hampton Inn)
          </li>
        </ul>
        <div className="comparator-verdict" style={{ color: "#0d9488" }}>
          ✓ Low stress · Preserves Mom's full Canada & Detroit itinerary · Cuts 5-hr museum.
        </div>
      </div>

      <div className="comparator-card">
        <span className="comparator-badge comparator-badge--amber">
          Plan B · The Henry Ford Museum
        </span>
        <div className="comparator-title">Dearborn Anchor + Quick Detroit Evening</div>
        <ul className="comparator-steps">
          <li>
            <b>8:00 AM</b> Cross Blue Water Bridge into Michigan early (I-94 South)
          </li>
          <li>
            <b>10:30 AM</b> Arrive at The Henry Ford Museum in Dearborn
          </li>
          <li>
            <b>10:30 AM – 3:30 PM</b> 5 dedicated hours exploring American Innovation
          </li>
          <li>
            <b>4:00 PM</b> Downtown Detroit & The Belt (Meet Emma)
          </li>
          <li>
            <b>6:30 PM</b> Belleville arrival
          </li>
        </ul>
        <div className="comparator-verdict" style={{ color: "#d97706" }}>
          ✓ Deep dive into Rosa Parks / Kennedy limo · Cuts Windsor & Belle Isle Aquarium.
        </div>
      </div>
    </div>
  );
}
