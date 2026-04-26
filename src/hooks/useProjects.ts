import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import api from "../api/axios";

export interface Project {
  id: string;
  name: string;
  color: string;
}

export interface Column {
  id: string;
  title: string;
  tasks: string[];
}

interface UseProjectsReturn {
  projects: Project[];
  columns: Column[];
  loading: boolean;
  error: string | null;
  addProject: (name: string, color: string) => Promise<void>;
  renameProject: (project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
}

export function useProjects(): UseProjectsReturn {
  const [projects, setProjects] = useState<Project[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects and columns on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const [projRes, colRes] = await Promise.all([
          api.get("/projects"),
          api.get("/columns"),
        ]);
        setProjects(projRes.data);
        setColumns(colRes.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // POST — ajouter un projet
  const addProject = useCallback(async (name: string, color: string) => {
    setError(null);
    try {
      const { data } = await api.post("/projects", { name, color });
      setProjects((prev) => [...prev, data]);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || `Erreur ${err.response?.status}`,
        );
      } else {
        setError("Erreur inconnue");
      }
      throw err;
    }
  }, []);

  // PUT — renommer un projet
  const renameProject = useCallback(async (project: Project) => {
    const newName = prompt("Nouveau nom :", project.name);
    if (!newName || newName === project.name) return;

    setError(null);
    try {
      const { data } = await api.put(`/projects/${project.id}`, {
        ...project,
        name: newName,
      });
      setProjects((prev) => prev.map((p) => (p.id === project.id ? data : p)));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || `Erreur ${err.response?.status}`,
        );
      } else {
        setError("Erreur inconnue");
      }
      throw err;
    }
  }, []);

  // DELETE — supprimer un projet
  const deleteProject = useCallback(async (id: string) => {
    if (!confirm("Êtes-vous sûr ?")) return;

    setError(null);
    try {
      await api.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || `Erreur ${err.response?.status}`,
        );
      } else {
        setError("Erreur inconnue");
      }
      throw err;
    }
  }, []);

  return {
    projects,
    columns,
    loading,
    error,
    addProject,
    renameProject,
    deleteProject,
  };
}
