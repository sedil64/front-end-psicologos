import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { useAuth } from '../context/AuthContext';
import SuccessModal from '../components/SuccessModal';
import { patientRegisterSchema } from '../schemas/patientRegister.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type FormData = z.infer<typeof patientRegisterSchema>;

export default function RegisterPatient() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(patientRegisterSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const birthDate = new Date(data.fechaNacimiento);
      const payload = {
        ...data,
        role: 'paciente' as const,
        fechaNacimiento: birthDate.toISOString(),
      };

      console.log('Payload enviado al backend:', payload);

      await axiosInstance.post('/auth/register', payload);

      const ok = await login({ email: data.email, password: data.password });
      if (!ok) throw new Error('Login tras registro falló');

      setShowModal(true);
    } catch (error) {
      console.error('Error en registro o login:', error);
      alert('Hubo un error al registrarte. Intenta más tarde.');
    }
  };

  const inputClasses =
    'w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500';

  const errorText = (field: keyof FormData) =>
    errors[field] && (
      <p className="text-red-500 text-xs mt-1">
        {(errors[field]?.message as string) || 'Campo obligatorio'}
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
        Registro de Paciente
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
          { name: 'direccion', label: 'Dirección' },
          { name: 'antecedentesClinicos', label: 'Antecedentes clínicos', type: 'textarea' },
        ].map(({ name, label, type = 'text' }) =>
          type === 'textarea' ? (
            <div key={name} className="md:col-span-2">
              <label className="block mb-1 text-sm font-medium">{label}</label>
              <textarea
                {...register(name as keyof FormData)}
                rows={4}
                className={inputClasses}
                placeholder={`Ingresa ${label.toLowerCase()}`}
              />
              {errorText(name as keyof FormData)}
            </div>
          ) : (
            <div key={name}>
              <label className="block mb-1 text-sm font-medium">{label}</label>
              <input
                {...register(name as keyof FormData)}
                type={type}
                className={inputClasses}
                placeholder={`Ingresa ${label.toLowerCase()}`}
              />
              {errorText(name as keyof FormData)}
            </div>
          )
        )}

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
          className="col-span-1 md:col-span-2 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Regístrate como Paciente
        </button>
      </form>

      <SuccessModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => navigate('/patient/home')}
      />

      <p className="mt-4 text-center text-sm text-gray-600">
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="text-green-600 hover:underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}
