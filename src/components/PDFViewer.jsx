import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";  
import "react-pdf/dist/Page/TextLayer.css";    


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();


export function PDFViewer({ file }) {
 const [numPages, setNumPages]= useState(null)

 function onLoadSuccess({numPages}){
    setNumPages(numPages)
 }


 return (
    <Document file={file} onLoadSuccess={onLoadSuccess}>
    {numPages && Array.from({length : numPages}, (_,i) =>(
        <div>
        <Page 
         key={i+1}
         pageNumber={i+1}>
       </Page>
        <p>Page : {i+1}</p>
       </div>
       ))}
    </Document>
 )

}