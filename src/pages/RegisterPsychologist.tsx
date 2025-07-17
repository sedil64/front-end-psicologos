import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axios'; // ✅ Importación correcta
import { useAuth } from '../context/AuthContext';
import SuccessModal from '../components/SuccessModal';
import { psychologistRegisterSchema } from '../schemas/psychologistRegister.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type FormData = z.infer<typeof psychologistRegisterSchema>;

export default function RegisterPsychologist() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(psychologistRegisterSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        ...data,
        role: 'psicologo' as const,
        fechaNacimiento: new Date(data.fechaNacimiento).toISOString(),
      };

      await axiosInstance.post('/psicologos/register', payload);

      const ok = await login({
        email: data.email,
        password: data.password,
      });

      if (!ok) throw new Error('Login tras registro falló');
      setShowModal(true);
    } catch (error) {
      console.error('Error en registro o login:', error);
      alert('Hubo un error al registrarte. Revisa la consola.');
    }
  };

  const inputClasses =
    'w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500';

  const errorText = (field: keyof FormData) =>
    errors[field] && (
      <p className="text-red-500 text-xs mt-1">
        {(errors[field]?.message as string) || 'Campo obligatorio'}
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Registro de Psicólogo
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {[
          { name: 'nombres', label: 'Nombres' },
          { name: 'apellidos', label: 'Apellidos' },
          { name: 'email', label: 'Email', type: 'email' },
          { name: 'password', label: 'Contraseña', type: 'password' },
          { name: 'identificacion', label: 'Identificación' },
          { name: 'fechaNacimiento', label: 'Fecha de Nacimiento', type: 'date' },
          { name: 'telefono', label: 'Teléfono' },
          { name: 'telefonoEmergencia', label: 'Teléfono emergencia' },
          { name: 'correoElectronico', label: 'Correo personal', type: 'email' },
          { name: 'direccion', label: 'Dirección' },
          { name: 'licencia', label: 'Licencia' },
          { name: 'especialidad', label: 'Especialidad' },
          { name: 'universidad', label: 'Universidad' },
          { name: 'experiencia', label: 'Años de experiencia', type: 'number' },
          { name: 'certificaciones', label: 'Certificaciones' },
        ].map(({ name, label, type = 'text' }) => (
          <div key={name}>
            <label className="block mb-1 text-sm font-medium">{label}</label>
            <input
              {...register(name as keyof FormData)}
              type={type}
              className={inputClasses}
              placeholder={label}
            />
            {errorText(name as keyof FormData)}
          </div>
        ))}

        <div>
          <label className="block mb-1 text-sm font-medium">Género</label>
          <select {...register('genero')} className={inputClasses}>
            <option value="">– Selecciona –</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="No binario">No binario</option>
            <option value="Otro">Otro</option>
            <option value="Prefiero no decir">Prefiero no decir</option>
          </select>
          {errorText('genero')}
        </div>

        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Regístrate como Psicólogo
        </button>
      </form>

      <SuccessModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => navigate('/dashboard/psicologo')}
      />

      <p className="mt-4 text-center text-sm text-gray-600">
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}
