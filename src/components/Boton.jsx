const Boton = ({ children, text }) => {
  return <button>{text} <span>{children}</span></button>
}

export { Boton }