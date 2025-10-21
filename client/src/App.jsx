import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles/App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Make-It-All</h1>
          <p>The best forum/to-do list thing ever!</p>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<div>Welcome to Make-It-All</div>} />
            {/* Add more routes here */}
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
