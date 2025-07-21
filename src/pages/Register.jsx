// src/pages/Register.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { registerUser } from "../services/api";
import { useToast } from "../context/toastContext"; // <-- Importamos useToast

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); 

  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast(); // <-- Usamos el hook de toast


  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true); 

    // Se implementa validacion con algunos valores caprichosos, pero para probas nomás
    const errors = {};
    if (!firstName.trim()) {
      errors.firstName = "El nombre es obligatorio.";
    }
    if (!lastName.trim()) {
      errors.lastName = "El apellido es obligatorio.";
    }
    if (!email.trim()) {
      errors.email = "El email es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "El email no es válido.";
    }
    if (!password.trim()) {
      errors.password = "La contraseña es obligatoria.";
    } else if (password.length < 6) { 
      errors.password = "La contraseña debe tener al menos 6 caracteres.";
    }
    
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      showToast("Por favor, corrige los errores en el formulario.", "error");
      setLoading(false);
      return;
    }

    setLoading(true);

    try {

      const data = await registerUser(email, password, firstName, lastName);

      if (data.success) {
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setFormErrors({}); 
        setIsFormSubmitted(false); 
        showToast("¡Registro exitoso! Por favor, inicia sesión.", "success"); // <-- Usamos Toast
        navigate("/login");
      } else {
        showToast(data.message || "Error desconocido al registrar.", "error"); // <-- Usamos Toast
      }
    } catch (err) {
      console.error("Error en el registro:", err);
      showToast(err.message || "Error al intentar registrarse. Intenta de nuevo.", "error"); // <-- Usamos Toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!user ? (
        <form onSubmit={handleSubmit}>
          <h2>Registrarse</h2>
          <div className={`form-group ${isFormSubmitted && formErrors.firstName ? 'has-error' : ''}`}>
            <input
              type="text"
              placeholder="Nombre"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                if (isFormSubmitted) {
                    setFormErrors(prev => ({ ...prev, firstName: e.target.value.trim() ? '' : "El nombre es obligatorio." }));
                }
              }}
              required
              className={isFormSubmitted && formErrors.firstName ? 'input-error' : ''}
            />
            {isFormSubmitted && formErrors.firstName && <p className="validation-error">{formErrors.firstName}</p>}
          </div>

          <div className={`form-group ${isFormSubmitted && formErrors.lastName ? 'has-error' : ''}`}>
            <input
              type="text"
              placeholder="Apellido"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                if (isFormSubmitted) {
                    setFormErrors(prev => ({ ...prev, lastName: e.target.value.trim() ? '' : "El apellido es obligatorio." }));
                }
              }}
              required
              className={isFormSubmitted && formErrors.lastName ? 'input-error' : ''}
            />
            {isFormSubmitted && formErrors.lastName && <p className="validation-error">{formErrors.lastName}</p>}
          </div>

          <div className={`form-group ${isFormSubmitted && formErrors.email ? 'has-error' : ''}`}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (isFormSubmitted) {
                    setFormErrors(prev => ({ 
                      ...prev, 
                      email: e.target.value.trim() 
                        ? (/\S+@\S+\.\S+/.test(e.target.value) ? '' : "El email no es válido.")
                        : "El email es obligatorio." 
                    }));
                }
              }}
              required
              className={isFormSubmitted && formErrors.email ? 'input-error' : ''}
            />
            {isFormSubmitted && formErrors.email && <p className="validation-error">{formErrors.email}</p>}
          </div>

          <div className={`form-group ${isFormSubmitted && formErrors.password ? 'has-error' : ''}`}>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (isFormSubmitted) {
                    setFormErrors(prev => ({ 
                      ...prev, 
                      password: e.target.value.trim() 
                        ? (e.target.value.length < 6 ? "La contraseña debe tener al menos 6 caracteres." : "")
                        : "La contraseña es obligatoria." 
                    }));
                }
              }}
              required
              className={isFormSubmitted && formErrors.password ? 'input-error' : ''}
            />
            {isFormSubmitted && formErrors.password && <p className="validation-error">{formErrors.password}</p>}
          </div>
          
          <button type="submit" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>
      ) : (
        <p>Ya estás logueado. Redirigiendo...</p>
      )}
    </>
  );
};

export { Register };