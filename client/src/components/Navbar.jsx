import { useState } from 'react'; // NEW: Import useState for mobile menu toggle
import { NavLink } from 'react-router-dom'; // NEW: Import NavLink for active styling and SPA routing
import { isLoggedIn, logout, getCurrentUser } from "../services/auth.js";
import { House, Menu, LogIn, LogOut, X } from "lucide-react"; // NEW: Added X for close icon
import '../styles/Navbar.css'; // NEW: Import the new CSS file

export default function Navbar() {
    // NEW: State to manage the mobile menu's visibility
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const user = getCurrentUser();
    const userType = user?.accountType;
    const loggedIn = isLoggedIn();

    const handleAuthButtonClick = () => {
        if (loggedIn) {
            logout();
            window.location.href = "/login"; // Redirect to login page after logout
        } else {
            window.location.href = "/login"; // Redirect to login page
        }
    };

    // NEW: Function to toggle the mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // NEW: Function to close the mobile menu (e.g., when a link is clicked)
    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    }

    const verifiedUser = (userType === "technical_specialist" || userType === "project_manager" || userType === "admin");

    // NEW: We define the links here to reuse them in desktop and mobile
    const navLinks = (
        <>
            <li className="nav-item">
                <NavLink to="/" className="nav-link" onClick={closeMobileMenu}>Dashboard</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/forum" className="nav-link" onClick={closeMobileMenu}>Forum</NavLink>
            </li>
            {/* Show these links only if the user is verified */}
            {verifiedUser && (
                <>
                    <li className="nav-item">
                        <NavLink to="/todos" className="nav-link" onClick={closeMobileMenu}>Todos</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/tasks" className="nav-link" onClick={closeMobileMenu}>Tasks</NavLink>
                    </li>
                </>
            )}
        </>
    );

    // NEW: Re-structured the entire return for responsiveness
    return (
        <nav className="navbar">
            <div className="navbar-container">

                {/* Home/Brand Link */}
                <NavLink to="/" className="navbar-logo" onClick={closeMobileMenu}>
                    {/*<House size={28} />*/}
                    <span className="navbar-logo-text">Make It All</span>
                </NavLink>

                {/* Desktop Navigation */}
                <ul className="navbar-nav-desktop">
                    {navLinks}
                </ul>

                {/* Desktop Auth Button */}
                <div className="navbar-auth-desktop">
                    <button onClick={handleAuthButtonClick} className="auth-button">
                        {loggedIn ? <LogOut size={20} /> : <LogIn size={20} />}
                        <span>{loggedIn ? 'Logout' : 'Login'}</span>
                    </button>
                </div>

                {/* Mobile Menu Toggle Button */}
                <button className="navbar-toggle" onClick={toggleMobileMenu}>
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu (Dropdown) */}
            <div className={`navbar-mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                <ul className="navbar-nav-mobile">
                    {navLinks}
                </ul>
                <div className="navbar-auth-mobile">
                    <button onClick={handleAuthButtonClick} className="auth-button">
                        {loggedIn ? <LogOut size={20} /> : <LogIn size={20} />}
                        <span>{loggedIn ? 'Logout' : 'Login'}</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}