import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Dash from "./features/dashboard/Dashboard";
import Topics from "./features/forum/Topics.jsx";
import Posts from "./features/forum/Posts.jsx";
function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            {/* default to dashboard */}
            <Route path="/" element={<Dash />} />
            <Route path="/forum" element={<Topics />} />
            <Route path="/forum/:id" element={<Posts />} />
            {/* Add more routes here */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
