import { useState, useEffect } from 'react'; 
import Header from './component/Header'; 
import Sidebar from './component/Sidebar'; 
import MainContent from './component/MainContent'; 
  
interface Project { id: string; name: string; color: string; } 
interface Column { id: string; title: string; tasks: string[]; } 
  
export default function App() { 
  const [sidebarOpen, setSidebarOpen] = useState(true); 
  const [projects, setProjects] = useState<Project[]>([]); 
  const [columns, setColumns] = useState<Column[]>([]); 
  const [loading, setLoading] = useState(true); 
  
  useEffect(() => { 
    async function fetchData() { 
      try { 
        const [projRes, colRes] = await Promise.all([ 
          fetch('http://localhost:4000/projects'), 
          fetch('http://localhost:4000/columns'), 
        ]); 
        
        if (projRes.ok && colRes.ok) {
          setProjects(await projRes.json()); 
          setColumns(await colRes.json()); 
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) { 
        console.error('Erreur:', error); 
        // Fallback data in case server is not available
        setProjects([
          { id: "1", name: "Site E-commerce", color: "#e74c3c" },
          { id: "2", name: "App Mobile", color: "#3498db" },
          { id: "3", name: "API Backend", color: "#2ecc71" }
        ]);
        setColumns([
          { id: "todo", title: "À Faire", tasks: ["Maquettes UI", "Specs techniques"] },
          { id: "progress", title: "En Cours", tasks: ["API Auth", "Page Login"] },
          { id: "done", title: "Terminé", tasks: ["Setup projet", "Config ESLint"] }
        ]);
      } finally { 
        setLoading(false); 
      } 
    } 
    fetchData(); 
  }, []);  // [] = une seule fois au montage 
  
  if (loading) return <div style={{padding:'2rem'}}>Chargement...</div>; 
  
  return ( 
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}> 
      <Header title="TaskFlow" onMenuClick={() => setSidebarOpen(p => !p)} /> 
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}> 
        <Sidebar projects={projects} isOpen={sidebarOpen} /> 
        <MainContent columns={columns} /> 
      </div> 
    </div> 
  )
};