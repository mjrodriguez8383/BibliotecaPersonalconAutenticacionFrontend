import { Link } from "react-router-dom"
import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom"

const Layout = ({ children }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <>
      <header>
        <ul>
          {
            user && <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <button onClick={handleLogout}>Cerrar sesión</button>
            </>
          }
          {
            !user && <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          }

        </ul>
      </header>
      <main>{children}</main>
      <footer><h2>Sitio desarrollado por Pepito</h2></footer>
    </>
  )
}

export { Layout }