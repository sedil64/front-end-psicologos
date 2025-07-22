// components/LoginModal.tsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginModal({ close }: { close: () => void }) {
  const { login, role } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await login({ email, password });
    if (!success) {
      setError('Credenciales inválidas. Intenta nuevamente.');
      return;
    }

    close();
    if (role === 'admin') navigate('/admin/dashboard');
    else if (role === 'psicologo') navigate('/psychologist/panel');
    else if (role === 'paciente') navigate('/patient/home');
    else navigate('/');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-teal-800 text-center mb-6">
          Iniciar sesión
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-teal-500"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-teal-500"
            required
          />
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 transition"
          >
            Ingresar
          </button>
        </form>

        <div className="mt-6 text-center space-y-3 text-sm text-gray-700">
          <p>¿Aún no tienes una cuenta?</p>
          <a href="/register/patient" className="text-teal-600 hover:underline">Registrarse como paciente</a>
          <p className="pt-2">¿Deseas trabajar con nosotros?</p>
          <a href="/register/psychologist" className="text-purple-600 hover:underline">Registrarse como psicólogo</a>
        </div>
      </div>
    </div>
  );
}
