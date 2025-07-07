import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "../pages/Home"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register"
import { Dashboard } from "../pages/Dashboard"
import { Ajustes } from "../pages/Ajustes"
import { PrivateRoute } from "../components/PrivateRoute"


const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute>
          <Home />
        </PrivateRoute>}>
        </Route>
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }>
          <Route path="ajustes" element={<Ajustes />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<h2>Página no encontrada...</h2>} />
      </Routes>
    </BrowserRouter>
  )
}

export { RouterApp }



