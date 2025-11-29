import { Routes, Route } from "react-router"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import { Toaster } from "sonner"

function App() {
  return (
    <>
      <Toaster richColors position="top-left" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
