// FileUpload component — drag-and-drop zone with file selection preview
import { useRef, useState, useCallback } from "react";
import { Icon, formatBytes } from "./Icons";

export function FileUpload({ onFileSelect, onUpload }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);

  // Validate and preview the selected file (does NOT save yet)
  const handleFile = useCallback((f) => {
    if (f && f.type === "application/pdf") {
      setFile(f);
    }
  }, []);

  // Explicitly confirm and save the file — only called on "Save" click
  const handleConfirm = () => {
    if (file) {
      onFileSelect(file);
      onUpload(true);
      // Reset back to dropzone after saving
      setFile(null);
    }
  };

  // Drag-and-drop handlers
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  // Clear selected file — safe because nothing was saved yet
  const handleRemove = () => {
    setFile(null);
  };

  return (
    <div className="upload-page">
      {/* Eyebrow label */}
      <p className="upload-eyebrow fade-up">PDF Viewer</p>

      {/* Main heading with serif font */}
      <h1 className="upload-heading fade-up-2">
        Open any <em>PDF</em>,<br />instantly.
      </h1>

      {/* Subtitle */}
      <p className="upload-sub fade-up-3">
        Drop a file to view it right here — no sign-up, no conversion, nothing to install.
      </p>

      {/* Show dropzone or file-selected card */}
      {!file ? (
        // Drag-and-drop zone
        <div
          className={`dropzone fade-up-4 ${dragOver ? "drag-over" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current.click()}
        >
          {/* Hidden native file input */}
          <input
            ref={inputRef}
            type="file"
            accept=".pdf"
            style={{ display: "none" }}
            onChange={(e) => handleFile(e.target.files[0])}
          />

          {/* Upload icon */}
          <div className="dz-icon">{Icon.upload}</div>
          <p className="dz-label">Drop your PDF here</p>
          <p className="dz-sub">
            or <span onClick={(e) => { e.stopPropagation(); inputRef.current.click(); }}>browse files</span>
          </p>

          {/* Divider */}
          <div className="dz-divider"><span>PDF files only</span></div>
          <p className="dz-sub">Up to 100 MB per file</p>
        </div>
      ) : (
        // File selected card — shows file name, size, and actions
        <div className="file-selected fade-up">
          <div className="file-icon">{Icon.pdf}</div>
          <div className="file-info">
            <p className="file-name">{file.name}</p>
            <p className="file-size">{formatBytes(file.size)}</p>
          </div>
          {/* Save button — explicitly confirms and saves to localStorage */}
          <button className="btn-view" onClick={handleConfirm}>Save</button>
          {/* Remove file button — discards without saving */}
          <button className="btn-remove" onClick={handleRemove} title="Remove">{Icon.x}</button>
        </div>
      )}

      {/* Trust pills */}
      <div className="upload-pills fade-up-4" style={{ animationDelay: "0.28s" }}>
        {[
          [Icon.lock, "No data stored"],
          [Icon.bolt, "Instant render"],
          [Icon.eye, "Private & local"],
        ].map(([icon, label], i) => (
          <div className="upload-pill" key={i}>{icon}{label}</div>
        ))}
      </div>
    </div>
  );
}