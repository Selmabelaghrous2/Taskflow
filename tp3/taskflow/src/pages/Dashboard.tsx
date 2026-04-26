import { useState, useEffect } from "react"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import MainContent from "../components/MainContent"
import { useAuth } from "../features/auth/AuthContext"
import api from "../api/axios"

interface Project {
  id: string
  name: string
  color: string
}

interface Column {
  id: string
  title: string
  tasks: string[]
}

export default function Dashboard() {

  const { dispatch } = useAuth()

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [projects, setProjects] = useState<Project[]>([])
  const [columns, setColumns] = useState<Column[]>([])
  const [loading, setLoading] = useState(true)

  const logout = () => {
    dispatch({ type: "LOGOUT" })
  }

  // 🔹 GET DATA
  useEffect(() => {

    async function fetchData() {
      try {

        const [projRes, colRes] = await Promise.all([
          api.get("/projects"),
          api.get("/columns")
        ])

        setProjects(projRes.data)
        setColumns(colRes.data)

      } catch (error) {

        console.error("Erreur:", error)

      } finally {

        setLoading(false)

      }
    }

    fetchData()

  }, [])

  // 🔹 PUT : rename project
  async function renameProject(project: Project) {

    const newName = prompt("Nouveau nom :", project.name)

    if (!newName || newName === project.name) return

    const { data } = await api.put("/projects/" + project.id, {
      ...project,
      name: newName
    })

    setProjects(prev =>
      prev.map(p => (p.id === project.id ? data : p))
    )

  }

  // 🔹 DELETE project
  async function deleteProject(id: string) {

    const confirmed = confirm("Êtes-vous sûr ?")

    if (!confirmed) return

    await api.delete("/projects/" + id)

    setProjects(prev =>
      prev.filter(p => p.id !== id)
    )

  }

  if (loading) return <div style={{ padding: "2rem" }}>Chargement...</div>

  return (

    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>

      <Header
        title="TaskFlow"
        onMenuClick={() => setSidebarOpen(p => !p)}
      />

      <button
        onClick={logout}
        style={{
          position: "absolute",
          top: 10,
          right: 20,
          padding: "6px 12px",
          cursor: "pointer"
        }}
      >
        Logout
      </button>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        <Sidebar
          projects={projects}
          isOpen={sidebarOpen}
          renameProject={renameProject}
          deleteProject={deleteProject}
        />

        <MainContent columns={columns} />

      </div>

    </div>

  )
}