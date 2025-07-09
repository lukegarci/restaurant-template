import { Link } from "react-router-dom";
import Hamburger from "hamburger-react";

function NavBar(){
    return <div>
        <nav className="navbar">
            <div className="navbar-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/Menu" className="nav-link">Menu</Link>
                <Link to="/OnlineOrder" className="nav-link">Online Order</Link>
            </div>
        </nav>
    </div>
}

export default NavBar;