import styles from './Header.module.css';

interface HeaderProps {
  title: string
  onMenuClick: () => void
  userName?: string
  onLogout?: () => void
}

export default function Header({ title, onMenuClick, userName, onLogout }: HeaderProps) {

  return (
    <header className={styles.header}>
      
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={onMenuClick}>☰</button>
        <h1 className={styles.logo}>{title}</h1>
      </div>

      <div style={{display:"flex",alignItems:"center",gap:"10px"}}>

        {userName && (
          <span style={{fontWeight:"bold"}}>
            {userName}
          </span>
        )}

        {onLogout && (
          <button
            onClick={onLogout}
            style={{
              padding:"4px 10px",
              cursor:"pointer"
            }}
          >
            Logout
          </button>
        )}

        <span className={styles.avatar}>JD</span>

      </div>

    </header>
  );
}