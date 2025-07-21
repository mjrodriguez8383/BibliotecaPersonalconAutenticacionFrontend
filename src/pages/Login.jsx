// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/toastContext"; // Importa useToast

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, login } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast(); // Usa el hook de toast

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setError(""); // Eliminar
    setLoading(true);

    try {
      const result = await login(email, password); 

      if (!result.success) {
        showToast(result.message || "Credenciales inválidas.", "error"); // Mostrar error con toast
      }
    } catch (err) {
      console.error("Error en el login:", err);
      showToast(err.message || "Error al intentar iniciar sesión. Intenta de nuevo.", "error"); // Mostrar error con toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!user ? (
        <form onSubmit={handleSubmit}>
          <h2>Iniciar sesión</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      ) : (
        <p>Redirigiendo al dashboard...</p>
      )}
    </>
  );
};

export { Login };