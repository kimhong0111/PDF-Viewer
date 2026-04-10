import { Link } from "react-router-dom";
import { Icon } from "./Icons";

export function Sidebar({ savedPdfs, selectedPdf, handleView, handleDelete }) {
  return (
    <aside className="sidebar">
      {/* List of saved PDFs */}
      <div className="sidebar-section">
        <p className="sidebar-label">Library</p>
        {savedPdfs.map((entry) => (
          <button
            key={entry.name}
            className={`sidebar-item ${selectedPdf?.name === entry.name ? "active" : ""}`}
            onClick={() => handleView(entry)}
          >
            {/* File icon */}
            <div className="sidebar-item-icon">{Icon.pdf}</div>
            <div className="sidebar-item-info">
              <span className="sidebar-item-name">{entry.name}</span>
              <span className="sidebar-item-meta">{entry.savedAt}</span>
            </div>
          </button>
        ))}
        {/* Show message when library is empty */}
        {savedPdfs.length === 0 && (
          <p style={{ fontSize: 12, color: "var(--ink-3)", padding: "4px 8px" }}>No files yet</p>
        )}
      </div>

      {/* Sidebar actions */}
      <div className="sidebar-nav">
        <p className="sidebar-label">Actions</p>
        {/* Navigate to upload page */}
        <Link to="/upload" className="sidebar-nav-item">
          {Icon.upload}<span>Upload new</span>
        </Link>
        {/* Delete selected file */}
        {selectedPdf && (
          <button
            className="sidebar-nav-item danger"
            onClick={() => handleDelete(selectedPdf.name)}
          >
            {Icon.trash}<span>Delete file</span>
          </button>
        )}
      </div>
    </aside>
  );
}
