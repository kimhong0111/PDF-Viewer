import {PDFViewer} from './PDFViewer.jsx'
import {useEffect , useState } from "react";
import '../css/Home.css'

export function Home(){
const [savePdf,setSavePdf]=useState([]);
const [selectedPdf , setSelectedPdf]=useState(null);

 useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedPDFs") || "[]");
    setSavePdf(stored);
  }, []);



function handleView(entry){
 fetch(entry.data)
    .then((res)=>res.blob())
    .then((blob)=>{
        const file = new File([blob],entry.name,{type :"application/pdf"});
    setSelectedPdf(file);
    });
}

 function handleDelete(name) {
    const updated = pdfs.filter((p) => p.name !== name);
    localStorage.setItem("savedPDFs", JSON.stringify(updated));
    setPdfs(updated);
    if (selectedPdf?.name === name) setSelectedPdf(null);
  }

    return (
        <> 
        <p>Welcome! Here is a list of your book .</p> 
        {savePdf.length == 0 && <p>No PDF saved yet !</p>}
        { savePdf.map((element)=>(
        <div key={element.name}>
          <span>{element.name} — {element.savedAt}</span>
          <button onClick={() => handleView(element)}>View</button>
          <button onClick={() => handleDelete(element.name)}>Delete</button>
        </div>
    
         ))}

        {selectedPdf && <PDFViewer file={selectedPdf} />}
       
        </>
    )
}