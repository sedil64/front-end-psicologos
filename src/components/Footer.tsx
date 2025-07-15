import { Link } from 'react-router-dom';
export default function Footer() {
  return (
    <footer className="bg-gray-100 text-teal-700 text-center py-4 mt-auto">
      <div className="flex flex-col md:flex-row justify-center gap-6 text-blue-600 font-medium">
        <a href="#">Política de privacidad</a>
        <a href="#">Términos y condiciones</a>
        <a href="#">Contacto</a>
      </div>
      <p className="text-sm">
        © {new Date().getFullYear()} Psicólogos App. Todos los derechos reservados.
      </p>
        <Link to="/join-us" className="text-blue-500 hover:underline font-medium">
          ¿Deseas trabajar con nosotros?
        </Link>
    </footer>
  );
}