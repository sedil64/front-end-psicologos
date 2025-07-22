import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal'; // Asegúrate que la ruta sea correcta

export default function Header() {
  const { isAuthenticated, role, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <header className="bg-teal-600 text-white px-6 py-4 flex items-center justify-between flex-wrap gap-y-4 shadow">
        <h1 className="text-xl font-bold">Insightia  🧠</h1>

        <nav className="flex items-center gap-2 flex-wrap text-sm">
          <Link to="/" className="hover:underline">Inicio</Link>
          <Link to="/services" className="hover:underline">Servicios</Link>
          <Link to="/psicologos" className="hover:underline">Psicólogos</Link>

          {!isAuthenticated ? (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowLoginModal(true)}
                className="px-4 py-2 text-teal-600 bg-white rounded-md font-bold transition hover:bg-teal-100 hover:scale-105"
              >
                Ingresar
              </button>
              <Link
                to="/register/patient"
                className="px-4 py-2 text-teal-600 bg-white rounded-md font-bold transition hover:bg-teal-100 hover:scale-105"
              >
                Registrarse
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {role === 'admin' && (
                <Link to="/admin/dashboard" className="hover:underline">
                  Panel Admin
                </Link>
              )}
              {role === 'psicologo' && (
                <Link to="/dashboard/psicologo" className="hover:underline">
                  Panel Psicólogo
                </Link>
              )}
              {role === 'paciente' && (
                <Link to="/mis-citas" className="hover:underline">
                  Mis Citas
                </Link>
              )}
              <button
                type="button"
                onClick={logout}
                className="px-4 py-2 text-teal-600 bg-white rounded-md font-bold transition hover:bg-teal-100 hover:scale-105"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </nav>
      </header>

      {showLoginModal && <LoginModal close={() => setShowLoginModal(false)} />}
    </>
  );
}
