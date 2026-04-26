import { memo, useCallback } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

interface Project {
  id: string;
  name: string;
  color: string;
}
interface SidebarProps {
  projects: Project[];
  isOpen: boolean;
  onRename?: (project: Project) => void;
  onDelete?: (id: string) => void;
}

function Sidebar({ projects, isOpen, onRename, onDelete }: SidebarProps) {
  // Wrap callbacks with useCallback to maintain referential equality
  const handleRename = useCallback(
    (project: Project) => {
      onRename?.(project);
    },
    [onRename],
  );

  const handleDelete = useCallback(
    (id: string) => {
      onDelete?.(id);
    },
    [onDelete],
  );

  return (
    <aside
      className={`${styles.sidebar} ${isOpen ? styles.visible : styles.hidden}`}
    >
      <h2 style={{ marginBottom: "20px", fontSize: "18px", color: "#333" }}>
        Mes Projets
      </h2>
      <div className={styles.projectList}>
        {projects.map((p) => (
          <li key={p.id} style={{ listStyle: "none" }}>
            <NavLink
              to={`/projects/${p.id}`}
              className={({ isActive }) =>
                `${styles.item} ${isActive ? styles.active : ""}`
              }
            >
              <span
                className={styles.dot}
                style={{ backgroundColor: p.color }}
              />
              {p.name}
            </NavLink>
            <div className={styles.actions}>
              {onRename && (
                <button
                  onClick={() => handleRename(p)}
                  className={styles.actionBtn}
                  title="Renommer"
                >
                  ✎
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => handleDelete(p.id)}
                  className={styles.actionBtn}
                  title="Supprimer"
                >
                  ✕
                </button>
              )}
            </div>
          </li>
        ))}
      </div>
    </aside>
  );
}

export default memo(Sidebar);
