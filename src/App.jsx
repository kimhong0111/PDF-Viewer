import { Home } from "./components/Home";
import { Layout } from "./components/Layout";
import { UploadPage } from "./pages/UploadPage";
import { BrowserRouter, Route ,Routes } from "react-router-dom";
import './App.css'

export default function App() {
  
  return (
   <BrowserRouter>
    <Layout>
     <Routes>
    <Route  path="/" element={<Home />} />
    <Route   path="/upload" element={<UploadPage />}  />
   </Routes>
   </Layout>
   </BrowserRouter>
  );
}