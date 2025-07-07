import { useState } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom"

const NODE_DEV = import.meta.env.VITE_NODE_DEV ?? "development"

const API_URL = NODE_DEV === "production" ? import.meta.env.VITE_BASE_API_URL : "http://localhost:2222/tasks"

const Login = () => {
  // Recuperar user a través del contexto del usuario
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const { user, login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
      console.log(response)
      const data = await response.json()
      setEmail("")
      setPassword("")

      login(data)
      navigate("/dashboard")
    } catch (error) {
      setError(error.message)
    }
  }

  return <Layout>
    <>
      {
        !user ? <form onSubmit={handleSubmit}>
          <h2>Iniciar sesión</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form> : <h1>Usuario logueado</h1>
      }
    </>
  </Layout>
}

export { Login }