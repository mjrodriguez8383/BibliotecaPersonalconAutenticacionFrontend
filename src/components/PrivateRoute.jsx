import { Navigate } from "react-router-dom"
import { useAuth } from "../context/authContext"

const PrivateRoute = ({ children }) => {
  // Recuperar user a través del contexto del usuario
  const { user } = useAuth(true)
  return user ? children : <Navigate to={"/login"} />
}

export { PrivateRoute }