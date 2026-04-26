import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useProjects } from "../hooks/useProjects";
import Sidebar from "../component/Sidebar";
import MainContent from "../component/MainContent";
import ProjectForm from "../component/ProjectForm";
import styles from "./Dashboard.module.css";
import HeaderMUI from "../component/HeaderMUI";
import type { RootState } from "../store";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    projects,
    columns,
    loading,
    error,
    addProject,
    renameProject,
    deleteProject,
  } = useProjects();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleAddProject = useCallback(
    async (name: string, color: string) => {
      setSaving(true);
      try {
        await addProject(name, color);
        setShowForm(false);
      } catch {
        // Error is handled by the hook
      } finally {
        setSaving(false);
      }
    },
    [addProject],
  );

  const handleRenameProject = useCallback(
    async (project: { id: string; name: string; color: string }) => {
      setSaving(true);
      try {
        await renameProject(project);
      } catch {
        // Error is handled by the hook
      } finally {
        setSaving(false);
      }
    },
    [renameProject],
  );

  const handleDeleteProject = useCallback(
    async (id: string) => {
      setSaving(true);
      try {
        await deleteProject(id);
      } catch {
        // Error is handled by the hook
      } finally {
        setSaving(false);
      }
    },
    [deleteProject],
  );

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  if (loading) return <div className={styles.loading}>Chargement...</div>;

  return (
    <div className={styles.layout}>
      <HeaderMUI
        title="TaskFlow"
        onMenuClick={() => setSidebarOpen((p) => !p)}
        userName={user?.name}
        onLogout={handleLogout}
      />
      <div className={styles.body}>
        <Sidebar
          projects={projects}
          isOpen={sidebarOpen}
          onRename={handleRenameProject}
          onDelete={handleDeleteProject}
        />
        <div className={styles.content}>
          <div className={styles.toolbar}>
            {!showForm ? (
              <button
                className={styles.addBtn}
                onClick={() => setShowForm(true)}
                disabled={saving}
              >
                + Nouveau projet
              </button>
            ) : (
              <ProjectForm
                submitLabel="Créer"
                onSubmit={(name: string, color: string) => {
                  handleAddProject(name, color);
                }}
                onCancel={() => setShowForm(false)}
              />
            )}
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <MainContent columns={columns} sidebarOpen={sidebarOpen} />
        </div>
      </div>
    </div>
  );
}
