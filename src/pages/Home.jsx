import { Layout } from "../components/Layout"
import { useTasks } from "../hooks/useTasks"

const Home = () => {
  const {
    tasks,
    loader,
    error,
    isListening,
    toggleListening,
    handleDelete,
    handleComplete
  } = useTasks()

  return (
    <Layout>
      {loader && <h2>Cargando...</h2>}
      {error && <h2>{error}</h2>}
      <div>
        <button onClick={toggleListening}>{isListening ? "Grabando..." : "Grabar"}</button>
      </div>
      {
        tasks.length > 0 ?
        <ul>
          {
            tasks.map((task) => (
              <li key={task._id}>
                {task.text}
                <button onClick={() => handleComplete(task)}>
                  {task.completed ? "No completado" : "Realizada"}
                </button>
                <button onClick={() => handleDelete(task._id)}>Borrar</button>
              </li>
            ))
          }
        </ul> :
        <p>No hay tareas</p>
      }
    </Layout>
  )
}

export { Home }