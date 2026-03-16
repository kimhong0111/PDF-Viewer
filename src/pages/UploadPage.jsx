import { useState } from "react";
import { FileUpload } from "../components/FileUpload";
import '../css/FileUpload.css';

export function UploadPage() {
  const [file, setFile] = useState(null);
  const [upload, setUpload] = useState(false);


  // TODO : refactor later
  function handleFileSelect(file) {
    setFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      const existing = JSON.parse(localStorage.getItem("savedPDFs") || "[]");
      const filtered = existing.filter((p) => p.name !== file.name); // no duplicates
      const updated = [{ name: file.name, data: reader.result, savedAt: new Date().toLocaleDateString() }, ...filtered];
      localStorage.setItem("savedPDFs", JSON.stringify(updated));
    };
    reader.readAsDataURL(file);
  }

  return (
    <>
      <FileUpload onFileSelect={handleFileSelect} onUpload={setUpload} />
      
    </>
  );
}