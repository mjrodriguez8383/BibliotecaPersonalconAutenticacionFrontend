import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterApp } from './router/RouterApp.jsx'
import { AuthProvider } from './context/authContext.jsx'
import "./index.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterApp />
    </AuthProvider>
  </StrictMode>,
)
