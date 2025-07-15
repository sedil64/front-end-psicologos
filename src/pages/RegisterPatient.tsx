// src/pages/RegisterPatient.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import axiosInstance from '../api/axios';
import { useAuth } from '../context/AuthContext';
import SuccessModal from '../components/SuccessModal';
import { patientRegisterSchema } from '../schemas/patientRegister.schema';
import { z } from 'zod';

type FormValues = z.infer<typeof patientRegisterSchema>;

export default function RegisterPatient() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(patientRegisterSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const payload = {
        ...data,
        role: 'paciente' as const,
        fechaNacimiento: new Date(data.fechaNacimiento).toISOString(),
      };

      await axiosInstance.post('/pacientes/register', payload);

      const ok = await login({ email: data.email, password: data.password });
      if (!ok) throw new Error('Login tras registro falló');

      setShowModal(true);
    } catch (err) {
      console.error('Error al registrar paciente:', err);
      alert('No se pudo completar el registro');
    }
  };

  const inputClass =
    'w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500';

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-8 text-center text-green-700">
        Registro de Paciente
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {[
          { name: 'nombres', label: 'Nombres' },
          { name: 'apellidos', label: 'Apellidos' },
          { name: 'identificacion', label: 'Identificación' },
          { name: 'fechaNacimiento', label: 'Fecha de Nacimiento', type: 'date' },
          { name: 'telefono', label: 'Teléfono' },
          { name: 'telefonoEmergencia', label: 'Teléfono de emergencia', required: false },
          { name: 'correoElectronico', label: 'Correo personal', type: 'email' },
          { name: 'direccion', label: 'Dirección', required: false },
          { name: 'edad', label: 'Edad', type: 'number' },
          { name: 'email', label: 'Email de cuenta', type: 'email' },
          { name: 'password', label: 'Contraseña', type: 'password' },
        ].map(({ name, label, type = 'text' }) => (
          <div key={name}>
            <label className="block mb-1 text-sm font-medium">{label}</label>
            <input
              type={type}
              {...register(name as keyof FormValues)}
              className={inputClass}
              placeholder={`Ingresa ${label.toLowerCase()}`}
            />
            {errors[name as keyof FormValues] && (
              <p className="text-red-500 text-xs mt-1">
                {errors[name as keyof FormValues]?.message}
              </p>
            )}
          </div>
        ))}

          <div>
            <label className="block mb-1 text-sm font-medium">Género</label>
            <select {...register('genero')} className={inputClass}>
              <option value="">– Selecciona –</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="No binario">No binario</option>
              <option value="Otro">Otro</option>
              <option value="Prefiero no decir">Prefiero no decir</option>
            </select>
            {errors.genero && (
              <p className="text-red-500 text-xs mt-1">
                {errors.genero.message}
              </p>
            )}
          </div>


        <div className="md:col-span-2">
          <label className="block mb-1 text-sm font-medium">
            Antecedentes clínicos
          </label>
          <textarea
            {...register('antecedentesClinicos')}
            rows={4}
            className={inputClass}
            placeholder="Describe cualquier condición médica relevante"
          />
        </div>

        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition"
        >
          Regístrate como Paciente
        </button>
      </form>

      <SuccessModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => navigate('/patient/home')}
      />

      <p className="mt-6 text-center text-sm text-gray-600">
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="text-green-600 font-medium hover:underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}
