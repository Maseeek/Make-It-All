import {isLoggedIn, logout} from "../services/auth.js";
import {House, Menu, LogIn, LogOut} from "lucide-react";


export default function Navbar() {
    const handleAuthButtonClick = () => {
        if (isLoggedIn()) {
        logout();
        window.location.href = "/login"; // Redirect to login page after logout
        } else {
        window.location.href = "/login"; // Redirect to login page
        }
    };

    return (
        <nav className="navbar">
        <a href="/" className="nav-logo">
            <House size={24} />
            <span>Make It All</span>
        </a>
        <button className="nav-auth-button" onClick={handleAuthButtonClick}>
            {isLoggedIn() ? (
            <>
                <LogOut size={20} />
                <span>Logout</span>
            </>
            ) : (
            <>
                <LogIn size={20} />
                <span>Login</span>
            </>
            )}
        </button>
        </nav>
    );
}
