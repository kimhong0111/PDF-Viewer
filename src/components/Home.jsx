// Home component — sidebar file list + PDF viewer area
import { useEffect, useState } from "react";
import { ViewArea } from "./ViewArea.jsx";
import { Sidebar } from "./Sidebar.jsx";
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
      <Sidebar
        savedPdfs={savedPdfs}
        selectedPdf={selectedPdf}
        handleView={handleView}
        handleDelete={handleDelete}
      />

      {/* ── Viewer area ── */}
      <div className="viewer-area">
        <ViewArea
          selectedPdf={selectedPdf}
          currentPage={currentPage}
          totalPages={totalPages}
          zoom={zoom}
          setCurrentPage={setCurrentPage}
          setZoom={setZoom}
          setTotalPages={setTotalPages}
        />
      </div>
    </div>
  );
}