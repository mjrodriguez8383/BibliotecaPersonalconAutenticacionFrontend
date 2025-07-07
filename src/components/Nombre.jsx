const Nombre = ({ apodo, email, edad = "Sin edad" }) => {
  return <h1>Hola {apodo}: {email} | {edad}</h1>
}

export { Nombre }