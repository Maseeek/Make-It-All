import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Dash from "./features/dashboard/Dashboard";
import Topics from "./features/forum/Topics.jsx";
import Posts from "./features/forum/Posts.jsx";
import ProjectTasks from "./features/tasks/Tasks.jsx";
import RegisterPage from "./features/auth/Register.jsx";
import LoginPage from "./features/auth/Login.jsx";
import Todo from "./features/todos/TodoList.jsx";
import NavBar from "./components/Navbar.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <main>
          <Routes>
            {/* default to dashboard */}
            <Route path="/" element={<Dash />} />
            {/* Add more routes here */}
            <Route path="/forum" element={<Topics />} />
            <Route path="/forum/:id" element={<Posts />} />
            <Route path={"/login"} element={<LoginPage />} />
            <Route path={"/register"} element={<RegisterPage />} />
            <Route path={"/todos"} element={<Todo />} />
            <Route path={"/tasks"} element={<ProjectTasks />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
