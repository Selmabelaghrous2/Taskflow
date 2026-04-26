import styles from './Sidebar.module.css';

interface Project { id: string; name: string; color: string; }
interface SidebarProps { projects: Project[]; isOpen: boolean; }

export default function Sidebar({ projects, isOpen }: SidebarProps) {
	return (
		<aside className={isOpen ? styles.sidebar : styles.closed}>
			<div className={styles.header}>Projets</div>
			<ul className={styles.list}>
				{projects.map(p => (
					<li key={p.id} className={styles.item}>
						<span className={styles.color} style={{ background: p.color }} />
						{p.name}
					</li>
				))}
			</ul>
		</aside>
	);
}

