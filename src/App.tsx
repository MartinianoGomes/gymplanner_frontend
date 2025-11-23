import { Routes, Route } from "react-router"
import Login from "./pages/Login/Login"

function App() {
  return (
    <Routes>
      <Route path="/gymplanner/login" element={<Login />} />
    </Routes>
  )
}

export default App
