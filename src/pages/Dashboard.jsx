// src/pages/Dashboard.jsx
import React from 'react';
import { Outlet } from 'react-router-dom'; 

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Panel de Usuario</h1>
      <p>Bienvenido a tu dashboard. Desde aquí puedes gestionar tus libros y ajustes de perfil.</p>
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export { Dashboard };