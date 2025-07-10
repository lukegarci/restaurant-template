import { Link } from "react-router-dom";
import Hamburger from "hamburger-react";
import { useState } from "react";
import '../css/NavBar.css';

'use client';

function NavBar() {
    const [open, setOpen] = useState(false);

    // Close menu function for reuse
    const closeMenu = () => setOpen(false);

    return (
        <div>
            <div className="hamburger-wrapper">
                <Hamburger 
                    size={24}
                    toggled={open}
                    toggle={setOpen}
                    color={open ? "#ffffff" : "#000000"}
                />
            </div>

            <div
                className={`overlay ${open ? "open" : ""}`}
                onClick={closeMenu}
            >
                <nav className="navbar" onClick={e => e.stopPropagation()}>
                    <div className="navbar-links">
                        <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
                        <Link to="/Menu" className="nav-link" onClick={closeMenu}>Menu</Link>
                        <Link to="/OnlineOrder" className="nav-link" onClick={closeMenu}>Online Order</Link>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default NavBar;
