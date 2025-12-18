import { Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import UsersManagement from "./pages/UsersManagement"
import Home from "./pages/Home"
import LoginPage from './pages/LoginPage';
import UserHomepage from "./pages/UserHomepage"

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    })
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<UsersManagement />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/userhome" element={<UserHomepage />} />
    </Routes>
  )
}
