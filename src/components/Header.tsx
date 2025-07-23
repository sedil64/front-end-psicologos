import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';

export default function Header() {
  const { isAuthenticated, role, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <header className="bg-teal-900 text-white shadow-md py-4 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Insightia 🧠</h1>

          <nav className="flex flex-wrap items-center gap-4 text-sm font-medium">
            <Link to="/" className="hover:text-teal-300 transition">Inicio</Link>
            <Link to="/services" className="hover:text-teal-300 transition">Servicios</Link>
            <Link to="/psicologos" className="hover:text-teal-300 transition">Psicólogos</Link>

            {!isAuthenticated ? (
              <>
                <button
                  type="button"
                  onClick={() => setShowLoginModal(true)}
                  className="bg-white text-teal-900 px-4 py-2 rounded-md font-semibold hover:bg-teal-100 transition"
                >
                  Ingresar
                </button>
                <Link
                  to="/register/patient"
                  className="bg-white text-teal-900 px-4 py-2 rounded-md font-semibold hover:bg-teal-100 transition"
                >
                  Registrarse
                </Link>
              </>
            ) : (
              <>
                {role === 'admin' && (
                  <Link to="/admin/dashboard" className="hover:text-teal-300 transition">
                    Panel Admin
                  </Link>
                )}
                {role === 'psicologo' && (
                  <Link to="/dashboard/psicologo" className="hover:text-teal-300 transition">
                    Panel Psicólogo
                  </Link>
                )}
                {role === 'paciente' && (
                  <Link to="/mis-citas" className="hover:text-teal-300 transition">
                    Mis Citas
                  </Link>
                )}
                <button
                  type="button"
                  onClick={logout}
                  className="bg-white text-teal-900 px-4 py-2 rounded-md font-semibold hover:bg-teal-100 transition"
                >
                  Cerrar sesión
                </button>
              </>
            )}
          </nav>
        </div>
      </header>

      {showLoginModal && <LoginModal close={() => setShowLoginModal(false)} />}
    </>
  );
}
