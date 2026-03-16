import { Link } from "react-router-dom";
import "../css/Nav.css"

export function Nav(){
    return (
        <div className="nav">
        <header className="navHeader">
        <h1><Link to="/">Home</Link></h1>
        <h1><Link to="/upload">Upload</Link></h1>
        </header>
         </div>

    )
}