import { logoutAction } from '@/app/actions/auth';

export default function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button className="btn secondary" type="submit">Déconnexion</button>
    </form>
  );
}
