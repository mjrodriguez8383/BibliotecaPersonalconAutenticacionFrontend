import { Outlet } from "react-router-dom"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/authContext"

const Dashboard = () => {
  const { user } = useAuth()

  return <Layout>
    <h1>Página de Dashboard</h1>
    {
      user && <>
        <p><b>ID:</b> {user.userId}</p>
      </>
    }
    <Outlet />
  </Layout>
}

export { Dashboard }