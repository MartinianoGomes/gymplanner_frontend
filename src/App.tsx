import { Routes, Route } from "react-router"
import Login from "./pages/Login/Login"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
