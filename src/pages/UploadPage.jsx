// UploadPage — handles file selection and localStorage persistence
import { useState } from "react";
import { FileUpload } from "../components/FileUpload";
import "../css/FileUpload.css";

export function UploadPage() {
  const [file, setFile] = useState(null);
  const [upload, setUpload] = useState(false);

  // Save the selected file to localStorage as a base64 data URL
  // TODO: refactor later — consider moving to a shared utility
  function handleFileSelect(file) {
    setFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      const existing = JSON.parse(localStorage.getItem("savedPDFs") || "[]");
      // Filter out duplicates by name
      const filtered = existing.filter((p) => p.name !== file.name);
      const updated = [
        { name: file.name, data: reader.result, savedAt: new Date().toLocaleDateString() },
        ...filtered,
      ];
      localStorage.setItem("savedPDFs", JSON.stringify(updated));
    };
    reader.readAsDataURL(file);
  }

  return (
    <>
      {/* FileUpload handles the UI — this page handles persistence */}
      <FileUpload onFileSelect={handleFileSelect} onUpload={setUpload} />
    </>
  );
}