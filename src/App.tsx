import { Routes, Route, useLocation } from "react-router"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import { Toaster } from "sonner"
import Test from "./pages/Test"
import NavMenu from "./components/NavMenu"
import MyWorkouts from "./pages/MyWorkouts/MyWorkouts"


function App() {
  const location = useLocation();
  const showNavMenu = location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/';

  return (
    <div className="min-h-screen">
      <Toaster richColors position="top-left" />
      {showNavMenu && <NavMenu />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/workouts" element={<MyWorkouts />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  )
}

export default App
