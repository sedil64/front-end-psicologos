import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { isAuthenticated, role, logout } = useAuth();

  return (
    <header className="bg-teal-600 text-white px-6 py-4 flex items-center justify-between shadow">
      <h1 className="text-xl font-bold">Psicólogos App 🧠</h1>

      <nav className="flex items-center gap-4 text-sm">
        <Link to="/" className="hover:underline">Inicio</Link>
        <Link to="/services" className="hover:underline">Servicios</Link>

        {!isAuthenticated ? (
          <>
            <Link to="/login" className="hover:underline">Ingresar</Link>
            <Link to="/register/patient" className="hover:underline">Registrarse</Link>
          </>
        ) : (
          <>
            {role === 'admin' && (
              <Link to="/admin/dashboard" className="hover:underline">
                Panel Admin
              </Link>
            )}
            {role === 'psicologo' && (
              <Link to="/psychologist/panel" className="hover:underline">
                Panel Psicólogo
              </Link>
            )}
            {role === 'paciente' && (
              <Link to="/patient/home" className="hover:underline">
                Inicio Paciente
              </Link>
            )}

            <button
              onClick={logout}
              className="hover:underline text-sm bg-transparent border-none cursor-pointer text-white"
            >
              Cerrar sesión
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
