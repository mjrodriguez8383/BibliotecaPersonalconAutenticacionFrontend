import { useState } from "react"
import { Layout } from "../components/Layout"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"

const NODE_DEV = import.meta.env.VITE_NODE_DEV ?? "development"

const API_URL = NODE_DEV === "production" ? import.meta.env.VITE_BASE_API_URL : "http://localhost:2222/tasks"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState()

  const { user, login } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      })

      const data = await response.json()
      console.log(data)

      setName("")
      setEmail("")
      setPassword("")
      login(data)

      navigate("/dashboard")
    } catch (error) {
      setError(error.message)
    }
  }

  return <Layout>
    {user && <h2>Hola, {user.name} 😎</h2>}
    {!user && <form onSubmit={handleSubmit}>
      <h2>Registro</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
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
      <button>Registrarse</button>
    </form>}
  </Layout>
}

export { Register }