// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RouterApp } from './router/RouterApp.jsx';
import { AuthProvider } from './context/authContext.jsx';
import { ToastProvider } from './context/toastContext.jsx'; // Importa el ToastProvider
import { Layout } from './components/Layout.jsx';
import "./index.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Layout>
            <RouterApp />
          </Layout>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);