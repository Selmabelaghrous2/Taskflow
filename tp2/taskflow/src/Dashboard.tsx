import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { useAuth } from "./features/auth/AuthContext"

interface Project { id: string; name: string; color: string; }
interface Column { id: string; title: string; tasks: string[]; }

export default function Dashboard() {

  const { dispatch } = useAuth()

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    dispatch({ type: "LOGOUT" })
  }

  useEffect(() => {
    console.log('useEffect déclenché !');

    async function fetchData() {
      try {
        const [projRes, colRes] = await Promise.all([
          fetch('http://localhost:4000/projects'),
          fetch('http://localhost:4000/columns'),
        ]);

        const projData = await projRes.json();
        const colData = await colRes.json();

        console.log('Projets:', projData);
        console.log('Colonnes:', colData);

        setProjects(projData);
        setColumns(colData);

      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div style={{ padding: '2rem' }}>Chargement...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
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

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar projects={projects} isOpen={sidebarOpen} />
        <MainContent columns={columns} />
      </div>
    </div>
  );
}