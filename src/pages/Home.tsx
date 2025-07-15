// src/pages/Home.tsx
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-teal-100">

      {/* Hero */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl font-extrabold text-teal-800 mb-4">
          Bienvenido a tu consulta virtual
        </h1>
        <p className="text-xl text-teal-600 mb-8 max-w-2xl">
          Administra pacientes, psicólogos y citas de manera simple y segura.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition"
          >
            Iniciar sesión
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 border border-teal-600 text-teal-600 rounded-lg font-semibold hover:bg-teal-600 hover:text-white transition"
          >
            Registrarse
          </Link>
        </div>
      </main>

      {/* Callouts */}
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <div className="p-6 bg-teal-50 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold text-teal-700 mb-2">Pacientes</h3>
            <p className="text-teal-600">
              Regístrate, edita tu perfil y agenda citas con tu psicólogo de confianza.
            </p>
          </div>
          <div className="p-6 bg-teal-50 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold text-teal-700 mb-2">Psicólogos</h3>
            <p className="text-teal-600">
              Gestiona tu consulta, confirma o cancela citas y mantén tu agenda al día.
            </p>
          </div>
          <div className="p-6 bg-teal-50 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold text-teal-700 mb-2">Administrador</h3>
            <p className="text-teal-600">
              Control total: usuarios, roles, pacientes, psicólogos y citas desde un panel único.
            </p>

          </div>
        </div>
      </section>

    </div>
  );
}
