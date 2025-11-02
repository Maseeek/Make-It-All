import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles/App.css'
import RegisterPage from './features/auth/Register.jsx'
import LoginPage from './features/auth/Login.jsx'

function App() {
  return (
    <Router>
      <div className="App">
        {/*<header >*/}
        {/*  <h1>Make-It-All</h1>*/}
        {/*  <p>The best forum/to-do list thing ever!</p>*/}
        {/*</header>*/}
        <main>
          <Routes>
            <Route path="/" element={<div>Welcome to Make-It-All</div>} />

            {/* Add more routes here */}
            <Route path={"/login"} element={<LoginPage />} />
            <Route path={"/register"} element={<RegisterPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
