import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, role } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login({ email, password });
    if (!success) {
      setError('Credenciales inválidas. Intenta nuevamente.');
      return;
    }

    if (role === 'admin') navigate('/admin/dashboard');
    else if (role === 'psicologo') navigate('/psychologist/panel');
    else if (role === 'paciente') navigate('/patient/home');
    else navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-50 px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-teal-800 text-center mb-6">
          Iniciar sesión
        </h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-teal-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-teal-500"
          />
        </div>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 transition"
        >
          Ingresar
        </button>

        {/* Sección de registro */}
        <div className="mt-6 text-center space-y-3">
          <p className="text-sm text-gray-700">
            ¿Aún no tienes una cuenta?
          </p>
          <Link
            to="/register/patient"
            className="inline-block px-4 py-2 bg-teal-100 text-teal-800 font-semibold rounded-md hover:bg-teal-200 transition"
          >
            Registrate
          </Link>

          <p className="text-sm text-gray-700 pt-4">
            ¿Deseas trabajar con nosotros?
          </p>
          <Link
            to="/register/psychologist"
            className="inline-block px-4 py-2 bg-purple-100 text-purple-800 font-semibold rounded-md hover:bg-purple-200 transition"
          >
            Registrate como psicólogo
          </Link>
        </div>
      </form>
    </div>
  );
}
