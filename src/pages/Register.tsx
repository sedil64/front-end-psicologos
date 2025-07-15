import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '../components/RegisterForm';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async ({
    nombreCompleto,
    email,
    password,
    rol,
  }: {
    nombreCompleto: string;
    email: string;
    password: string;
    rol: 'admin' | 'psychologist' | 'patient';
  }) => {
    try {
      await axios.post('https://resultados-deportivos-backend.desarrollo-software.xyz/auth/register', {
        nombreCompleto,
        email,
        password,
        rol,
      });

      const success = await login({ email, password });

      if (success) {
        if (rol === 'admin') navigate('/admin/dashboard');
        else if (rol === 'psychologist') navigate('/psychologist/panel');
        else navigate('/patient/home');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const mensaje = err.response?.data?.message;
        console.log('Respuesta backend:', err.response?.data);

        // Opcional: mostrar mensaje al usuario (si lo pasas como prop)
        // alert(Array.isArray(mensaje) ? mensaje.join(', ') : mensaje);
      } else {
        console.log('Error inesperado:', err);
      }
    }
  };

  return <RegisterForm onSubmit={handleSubmit} />;
}
