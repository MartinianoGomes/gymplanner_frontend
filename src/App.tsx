import { Routes, Route } from "react-router"

function App() {
  return (
    <Routes>
      <Route path="/gymplanner" element={<div />} />
      <Route path="/gymplanner/login" element={<div />} />
      <Route path="/gymplanner/register" element={<div />} />
      <Route path="/gymplanner/me" element={<div />} />
    </Routes>
  )
}

export default App
