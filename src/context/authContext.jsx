import { createContext, useContext, useState } from "react"
import { jwtDecode } from "jwt-decode"

// Creación del contexto
const AuthContext = createContext()

// Provedor del contexto
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [user, setUser] = useState(() => {
    const savedToken = localStorage.getItem("token")
    return savedToken ? jwtDecode(savedToken) : null
  })

  const login = ({ token }) => {
    localStorage.setItem("token", token)
    setToken(token)
    setUser(jwtDecode(token))
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook
const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }