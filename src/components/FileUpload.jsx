
export function FileUpload({onFileSelect , onUpload}) {

  function checkFile(file) {
    if (!file) {
      alert("This is not a file");
      return
    }
    onFileSelect(file);
    onUpload(true)
  }

  return (
    <div className="container"> 
    <h1>File Upload</h1>
    <div className="uploadFile">
      <p>Choose a file</p>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => checkFile(e.target.files[0])}
      />
      </div>
    </div>
  );
}   