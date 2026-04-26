import styles from './MainContent.module.css'; 

interface Column { id: string; title: string; tasks: string[]; } 
interface MainContentProps { 
  columns: Column[]; 
  sidebarOpen?: boolean;
} 
  
export default function MainContent({ columns, sidebarOpen = true }: MainContentProps) { 
  return ( 
    <main className={`${styles.mainContent} ${!sidebarOpen ? styles.sidebarClosed : ''}`}> 
      <div className={styles.board}> 
        {columns.map(col => ( 
          <div key={col.id} className={styles.column}> 
            <h3 className={styles.columnHeader}>{col.title} ({col.tasks.length})</h3> 
            <div className={styles.cardsList}>
              {col.tasks.map((task, i) => ( 
                <div key={i} className={styles.card}>{task}</div> 
              ))} 
            </div>
          </div> 
        ))} 
      </div> 
    </main> 
  ); 
}