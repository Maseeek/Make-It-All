import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { getCurrentUser, logout } from "../../services/auth";
import "../../styles/Dashboard.css"

// Dashboard component
// Role-based dashboard for managers and technical specialists
// Shows task allocation, project progress, and resource management
export default function Dashboard() {
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    console.log("Current user in Dashboard:", user);
    if (user) {
      setUserRole(user.accountType);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/login");
  };

  const isTechnicalSpecialist = userRole === "technical_specialist";
  const isProjectManager = userRole === "project_manager";
  const isAdmin = userRole === "admin";
  const showTasks = isTechnicalSpecialist || isProjectManager || isAdmin;
  const showTodos = isTechnicalSpecialist || isProjectManager || isAdmin;

  return (
    <div>
      <h2>Dashboard</h2>
      <Link to="/forum">Forum</Link>
      {showTasks && (
        <>
          {" | "}
          <Link to="/tasks">Tasks</Link>
        </>
      )}
      {showTodos && (
        <>
          {" | "}
          <Link to="/todos">Todos</Link>
        </>
      )}
      {" | "}
      {!isLoggedIn && (
        <>
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </>
      )}
      {isLoggedIn && <Link onClick={handleLogout}>Logout</Link>}
    </div>
  );
}
