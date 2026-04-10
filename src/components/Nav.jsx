// Nav component — fixed navbar with brand logo and route links
import { Link, useLocation } from "react-router-dom";
import "../css/Nav.css";

export function Nav() {
  // Determine current route to highlight active nav button
  const location = useLocation();

  return (
    <nav className="nav">
      {/* Brand logo — serif font with warm accent on first letter */}
      <Link to="/" className="nav-logo">
        <span>p</span>df<em style={{ fontStyle: "italic" }}>view</em>
      </Link>

      {/* Navigation links */}
      <div className="nav-links">
        <Link
          to="/"
          className={`nav-btn ${location.pathname === "/" ? "active" : ""}`}
        >
          Viewer
        </Link>
        <Link
          to="/upload"
          className={`nav-btn ${location.pathname === "/upload" ? "active" : ""}`}
        >
          Upload
        </Link>
      </div>
    </nav>
  );
}