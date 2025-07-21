// src/context/authContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// NO necesitamos jwtDecode para los datos del usuario si el backend los envía
// import { jwtDecode } from 'jwt-decode'; // <-- REMOVER ESTA LÍNEA
import { loginUser, registerUser, fetchUserProfile } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Esto almacenará el objeto de usuario completo (firstName, lastName, email, etc.)
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true); // Para indicar si estamos cargando los datos iniciales del usuario

  const navigate = useNavigate();

  // Función para cerrar sesión, la hacemos useCallback para evitar re-creación innecesaria
  const logout = useCallback(() => {
    setToken(null);
    setUser(null); // Limpia el usuario del contexto
    localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  // Efecto para cargar el usuario al inicio de la aplicación o cuando el token cambia
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      if (token) {
        try {
          const result = await fetchUserProfile(token);
          if (result.success && result.user) {
            setUser(result.user); 
          } else {
            console.error("Failed to fetch user profile or invalid token:", result.message);
            logout();
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          logout(); // Error de red o del servidor, desloguear
        }
      } else {
        setUser(null); 
      }
      setLoading(false); 
    };
    initializeAuth();
  }, [token, logout]); 

  // Función de inicio de sesión
  const login = async (email, password) => {
    try {
      const response = await loginUser(email, password); 
      if (response.success) {
        setToken(response.token);
        setUser(response.user); // <-- ¡ALMACENA EL OBJETO USER COMPLETO AQUÍ!
        localStorage.setItem('token', response.token);
        navigate('/dashboard');
        return { success: true, message: response.message };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: error.message || 'Error de inicio de sesión.' };
    }
  };

  // Función de registro
  const register = async (email, password, firstName, lastName) => {
    try {
      // registerUser también debería devolver { success, message, token, user }
      const response = await registerUser(email, password, firstName, lastName);
      if (response.success) {
        setToken(response.token); 
        setUser(response.user);
        localStorage.setItem('token', response.token);
        navigate('/dashboard');
        return { success: true, message: response.message };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, message: error.message || 'Error de registro.' };
    }
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    loading, 
    setUser 
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};