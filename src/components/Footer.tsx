import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-teal-900 text-white py-10 mt-auto">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
          <div className="text-center md:text-left space-y-2">
            <p className="font-bold text-lg">Psicólogos App</p>
            <p className="text-sm text-teal-200">
              Conectamos profesionales de la salud mental con quienes lo necesitan.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-teal-100">
            <a href="#" className="hover:text-white transition">Política de privacidad</a>
            <a href="#" className="hover:text-white transition">Términos y condiciones</a>
            <a href="#" className="hover:text-white transition">Contacto</a>
          </div>
        </div>

        <div className="border-t border-teal-700 pt-4 text-center">
          <p className="text-sm text-teal-300">
            © {new Date().getFullYear()} Insightia. Todos los derechos reservados.
          </p>
          <Link
            to="/join-us"
            className="inline-block mt-2 text-sm text-teal-100 hover:text-white underline font-medium transition"
          >
            ¿Deseas trabajar con nosotros?
          </Link>
        </div>
      </div>
    </footer>
  );
}
