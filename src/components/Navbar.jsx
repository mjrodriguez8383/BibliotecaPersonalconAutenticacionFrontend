// src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Importa useLocation para resaltar el enlace activo
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation(); // Obtiene la ruta actual para aplicar la clase 'active'

  const handleLogout = () => {
    logout();
    // La redirección post-logout debe ser manejada por el AuthProvider o el componente de login/home
    // para evitar redirecciones duplicadas o problemas de ciclo de vida.
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-brand">
        <Link to="/">Book Administrator 3000</Link>
      </div>
      <ul className="navbar-nav">
        {!user ? (
          <>
            <li>
              <Link 
                to="/login" 
                className={location.pathname === "/login" ? "active" : ""}
              >
                Iniciar Sesión
              </Link>
            </li>
            <li>
              <Link 
                to="/register" 
                className={location.pathname === "/register" ? "active" : ""}
              >
                Registrarse
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link 
                to="/dashboard" 
                // Activo si la ruta es /dashboard, /dashboard/ o /dashboard/mybooks
                className={location.pathname === "/dashboard" || location.pathname === "/dashboard/" || location.pathname === "/dashboard/mybooks" ? "active" : ""}
              >
                Mis Libros
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard/ajustes" 
                className={location.pathname === "/dashboard/ajustes" ? "active" : ""}
              >
                Ajustes
              </Link>
            </li>
            <li>
              <button 
                onClick={handleLogout} 
                className="btn-logout"
              >
                Cerrar Sesión
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export { Navbar };