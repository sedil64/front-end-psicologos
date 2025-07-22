import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-100 to-blue-50 px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-teal-800 mb-4 text-center">
        Encuentra apoyo profesional para tu bienestar emocional
      </h1>
      <p className="max-w-2xl text-center text-teal-700 mb-8 text-lg md:text-xl">
        Agenda sesiones online con psicólogos certificados y comienza tu camino hacia una vida más equilibrada y feliz.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/login"
          className="px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold text-lg shadow hover:bg-teal-700 transition text-center"
        >
          Iniciar sesión
        </Link>
        <Link
          to="/register/patient"
          className="px-6 py-3 border border-teal-600 text-teal-600 rounded-lg font-semibold text-lg shadow hover:bg-teal-600 hover:text-white transition text-center"
        >
          Registrarse
        </Link>
      </div>
    </section>
  );
}
