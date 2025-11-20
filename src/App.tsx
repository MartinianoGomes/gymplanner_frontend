import { Routes, Route } from "react-router"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/gymplanner" element={<div>Gymplanner</div>} />
      </Routes>
    </div>
  )
}

export default App
