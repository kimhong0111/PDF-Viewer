// PDFViewer component — renders PDF pages using react-pdf
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure the PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export function PDFViewer({ file, zoom = 100, onLoadSuccess }) {
  const [numPages, setNumPages] = useState(null);

  // Store total page count and notify parent
  function handleLoadSuccess({ numPages }) {
    setNumPages(numPages);
    // Pass total pages up to Home for the toolbar display
    if (onLoadSuccess) onLoadSuccess(numPages);
  }

  // Calculate page width based on zoom level
  const pageWidth = Math.round(680 * zoom / 100);

  return (
    // Render all pages sequentially inside styled wrappers
    <Document file={file} onLoadSuccess={handleLoadSuccess}>
      {numPages && Array.from({ length: numPages }, (_, i) => (
        <div key={`page-${i + 1}`} className="pdf-page-wrap" style={{ maxWidth: pageWidth, marginBottom: 16 }}>
          <Page
            pageNumber={i + 1}
            width={pageWidth}
          />
        </div>
      ))}
    </Document>
  );
}