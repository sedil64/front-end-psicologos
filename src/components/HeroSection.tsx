import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-100 px-4 py-24 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('/images/pattern.png')] bg-contain bg-right bg-no-repeat" />
      <div className="z-10 text-center max-w-3xl">
        <h1 className="text-5xl font-bold text-teal-800 mb-6 leading-tight">
          Encuentra apoyo profesional <br /> para tu bienestar emocional
        </h1>
        <p className="text-lg md:text-xl text-teal-700 mb-10">
          Agenda sesiones online con psicólogos certificados y comienza tu camino hacia una vida más equilibrada y feliz.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold text-lg shadow hover:bg-teal-700 transition"
          >
            Iniciar sesión
          </Link>
          <Link
            to="/register/patient"
            className="px-6 py-3 border border-teal-600 text-teal-600 rounded-lg font-semibold text-lg shadow hover:bg-teal-600 hover:text-white transition"
          >
            Registrarse
          </Link>
        </div>
      </div>
    </section>
  );
}
