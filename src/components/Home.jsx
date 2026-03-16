// Home component — sidebar file list + PDF viewer area
import { PDFViewer } from "./PDFViewer.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon, formatBytes } from "./Icons";
import "../css/Home.css";

export function Home() {
  const [savedPdfs, setSavedPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  // Track the current page number for the toolbar
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [zoom, setZoom] = useState(100);

  // Load saved PDFs from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedPDFs") || "[]");
    setSavedPdfs(stored);
  }, []);

  // Convert base64 data URL back to a File object for the PDF viewer
  function handleView(entry) {
    fetch(entry.data)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], entry.name, { type: "application/pdf" });
        setSelectedPdf(file);
        setCurrentPage(1);
        setTotalPages(null);
      });
  }

  // Remove a PDF from localStorage and update state
  function handleDelete(name) {
    const updated = savedPdfs.filter((p) => p.name !== name);
    localStorage.setItem("savedPDFs", JSON.stringify(updated));
    setSavedPdfs(updated);
    // Close viewer if the deleted file was being viewed
    if (selectedPdf?.name === name) setSelectedPdf(null);
  }

  return (
    <div className="home-page">
      {/* ── Sidebar ── */}
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

      {/* ── Viewer area ── */}
      <div className="viewer-area">
        {selectedPdf ? (
          <>
            {/* Toolbar — page nav + zoom controls */}
            <div className="viewer-toolbar">
              <div className="toolbar-page">
                {/* Previous page */}
                <button className="toolbar-btn" disabled={currentPage <= 1} onClick={() => setCurrentPage((p) => p - 1)}>
                  {Icon.chevLeft}
                </button>
                {/* Current page input */}
                <input
                  className="toolbar-page-input"
                  type="text"
                  value={currentPage}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val) && val >= 1 && val <= (totalPages || 1)) setCurrentPage(val);
                  }}
                />
                <span style={{ fontSize: 13, color: "var(--ink-3)" }}>/ {totalPages || "—"}</span>
                {/* Next page */}
                <button className="toolbar-btn" disabled={currentPage >= (totalPages || 1)} onClick={() => setCurrentPage((p) => p + 1)}>
                  {Icon.chevRight}
                </button>
              </div>
              <div className="toolbar-right">
                {/* Zoom out */}
                <button className="toolbar-btn" onClick={() => setZoom((z) => Math.max(50, z - 10))}>
                  {Icon.zoomOut}
                </button>
                <span className="toolbar-zoom">{zoom}%</span>
                {/* Zoom in */}
                <button className="toolbar-btn" onClick={() => setZoom((z) => Math.min(200, z + 10))}>
                  {Icon.zoomIn}
                </button>
              </div>
            </div>

            {/* PDF canvas — renders all pages via PDFViewer */}
            <div className="viewer-canvas">
              <PDFViewer file={selectedPdf} zoom={zoom} onLoadSuccess={setTotalPages} />
            </div>
          </>
        ) : (
          // Empty state — no file selected
          <div className="home-empty">
            <div className="home-empty-icon">{Icon.pdf}</div>
            <h2>No file open</h2>
            <p>Upload a PDF to start viewing it here, page by page.</p>
            <Link to="/upload" className="btn-upload-now">Choose a PDF →</Link>
          </div>
        )}
      </div>
    </div>
  );
}