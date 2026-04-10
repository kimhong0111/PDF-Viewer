import { Link } from "react-router-dom";
import { useEffect } from "react";          // 👈 make sure this is imported
import { Icon } from "./Icons";
import { PDFViewer } from "./PDFViewer.jsx";

export function ViewArea({ selectedPdf, currentPage, totalPages, zoom, setCurrentPage, setZoom, setTotalPages }) {

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "ArrowLeft") {
        setCurrentPage((p) => Math.max(1, p - 1));
      }
      if (e.key === "ArrowRight") {
        setCurrentPage((p) => Math.min(totalPages || 1, p + 1));
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [totalPages]);

  if (!selectedPdf) {
    return (
      <div className="home-empty">
        <div className="home-empty-icon">{Icon.pdf}</div>
        <h2>No file open</h2>
        <p>Upload a PDF to start viewing it here, page by page.</p>
        <Link to="/upload" className="btn-upload-now">Choose a PDF →</Link>
      </div>
    );
  }

  return (
    <>
      <div className="viewer-toolbar">
        <div className="toolbar-page">
          <button className="toolbar-btn" disabled={currentPage <= 1} onClick={() => setCurrentPage((p) => p - 1)}>
            {Icon.chevLeft}
          </button>
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
          <button className="toolbar-btn" disabled={currentPage >= (totalPages || 1)} onClick={() => setCurrentPage((p) => p + 1)}>
            {Icon.chevRight}
          </button>
        </div>
        <div className="toolbar-right">
          <button className="toolbar-btn" onClick={() => setZoom((z) => Math.max(50, z - 10))}>
            {Icon.zoomOut}
          </button>
          <span className="toolbar-zoom">{zoom}%</span>
          <button className="toolbar-btn" onClick={() => setZoom((z) => Math.min(200, z + 10))}>
            {Icon.zoomIn}
          </button>
        </div>
      </div>
      <div className="viewer-canvas" style={{ overflowY: "auto", height: "calc(100vh - 60px)" }}>
        <PDFViewer file={selectedPdf} zoom={zoom} currentPage={currentPage} onLoadSuccess={setTotalPages} />
      </div>
    </>
  );
}