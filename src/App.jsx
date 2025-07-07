import { useState } from 'react'
import { Nombre } from './components/Nombre.jsx'
import { Layout } from './components/Layout.jsx'
import { Boton } from "./components/Boton.jsx"

function App() {
  const [nombre, setNombre] = useState("Gabriel")


  // let nombre = "Gabriel";
  return (
    <Layout>
      <Nombre apodo="Pepe" email="pepe@gmail.com" />
      <Nombre apodo="Luis" email="pepe@gmail.com" />
      <Nombre apodo="Maria" email="pepe@gmail.com" />

      <Boton text="Ir al link">
        ✔
      </Boton>

      <button onClick={() => setNombre("Luis")}>Cambiar nombre</button>
    </Layout>
  )
}

export { App }
