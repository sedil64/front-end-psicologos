// src/pages/RegisterPsychologist.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { useAuth } from '../context/AuthContext';
import SuccessModal from '../components/SuccessModal';

type FormData = {
  nombres: string;
  apellidos: string;
  identificacion: string;
  fechaNacimiento: Date;
  genero?: 'Masculino' | 'Femenino' | 'No binario' | 'Otro' | 'Prefiero no decir';
  telefono: string;
  telefonoEmergencia?: string;
  correoElectronico: string;
  direccion?: string;
  licencia: string;
  especialidad: string;
  universidad?: string;
  experiencia?: number;
  certificaciones?: string;
  email: string;
  password: string;
};

export default function RegisterPsychologist() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        ...data,
        role: 'psicologo' as const,
        // si tu backend espera fecha en ISO:
        fechaNacimiento: data.fechaNacimiento.toISOString(),
      };

      console.log('Payload de registro:', payload);
      await axiosInstance.post('/psicologos/register', payload);

      // Auto-login para guardar token en localStorage e interceptor
      const ok = await login({
        email: data.email,
        password: data.password,
      });
      if (!ok) {
        throw new Error('Login tras registro falló');
      }

      // Mostrar modal de éxito
      setShowModal(true);
    } catch (error: any) {
      console.error('Error en registro o login:', error);
      alert('Hubo un error al registrarte. Revisa la consola.');
    }
  };

  const inputClasses =
    'w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500';

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Registro de Psicólogo
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Nombres */}
        <div>
          <label className="block mb-1 text-sm font-medium">Nombres</label>
          <input
            {...register('nombres', { required: true })}
            className={inputClasses}
            placeholder="Nombres"
          />
          {errors.nombres && (
            <p className="text-red-500 text-xs mt-1">Requerido</p>
          )}
        </div>

        {/* Apellidos */}
        <div>
          <label className="block mb-1 text-sm font-medium">Apellidos</label>
          <input
            {...register('apellidos', { required: true })}
            className={inputClasses}
            placeholder="Apellidos"
          />
          {errors.apellidos && (
            <p className="text-red-500 text-xs mt-1">Requerido</p>
          )}
        </div>

        {/* Email / Contraseña */}
        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            {...register('email', { required: true })}
            type="email"
            className={inputClasses}
            placeholder="correo@ejemplo.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">Requerido</p>
          )}
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Contraseña</label>
          <input
            {...register('password', { required: true, minLength: 6 })}
            type="password"
            className={inputClasses}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              Mínimo 6 caracteres
            </p>
          )}
        </div>

        {/* Identificación / Fecha de Nac. */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Identificación
          </label>
          <input
            {...register('identificacion', { required: true })}
            className={inputClasses}
            placeholder="Cédula o pasaporte"
          />
          {errors.identificacion && (
            <p className="text-red-500 text-xs mt-1">Requerido</p>
          )}
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">
            Fecha de Nacimiento
          </label>
          <input
            type="date"
            {...register('fechaNacimiento', {
              required: true,
              valueAsDate: true,
            })}
            className={inputClasses}
          />
          {errors.fechaNacimiento && (
            <p className="text-red-500 text-xs mt-1">Requerido</p>
          )}
        </div>

        {/* Teléfonos */}
        <div>
          <label className="block mb-1 text-sm font-medium">Teléfono</label>
          <input
            {...register('telefono', { required: true })}
            className={inputClasses}
            placeholder="+593 349987254"
          />
          {errors.telefono && (
            <p className="text-red-500 text-xs mt-1">Requerido</p>
          )}
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">
            Teléfono emergencia
          </label>
          <input
            {...register('telefonoEmergencia')}
            className={inputClasses}
            placeholder="+58 987 654 321"
          />
        </div>

        {/* Correo personal / Dirección */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Correo personal
          </label>
          <input
            {...register('correoElectronico', { required: true })}
            type="email"
            className={inputClasses}
            placeholder="ejemplo@mail.com"
          />
          {errors.correoElectronico && (
            <p className="text-red-500 text-xs mt-1">Requerido</p>
          )}
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Dirección</label>
          <input
            {...register('direccion')}
            className={inputClasses}
            placeholder="Ciudad, País"
          />
        </div>

        {/* Licencia / Especialidad */}
        <div>
          <label className="block mb-1 text-sm font-medium">Licencia</label>
          <input
            {...register('licencia', { required: true })}
            className={inputClasses}
            placeholder="Número de licencia"
          />
          {errors.licencia && (
            <p className="text-red-500 text-xs mt-1">Requerido</p>
          )}
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">
            Especialidad
          </label>
          <input
            {...register('especialidad', { required: true })}
            className={inputClasses}
            placeholder="Ej. Psicología clínica"
          />
          {errors.especialidad && (
            <p className="text-red-500 text-xs mt-1">Requerido</p>
          )}
        </div>

        {/* Universidad / Experiencia */}
        <div>
          <label className="block mb-1 text-sm font-medium">Universidad</label>
          <input
            {...register('universidad')}
            className={inputClasses}
            placeholder="Nombre de la Universidad"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">
            Años de experiencia
          </label>
          <input
            type="number"
            {...register('experiencia', { valueAsNumber: true })}
            className={inputClasses}
            placeholder="0"
          />
        </div>

        {/* Género */}
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
        </div>

        {/* Certificaciones */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Certificaciones
          </label>
          <input
            {...register('certificaciones')}
            className={inputClasses}
            placeholder="Opcional"
          />
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Regístrate como Psicólogo
        </button>
      </form>

      {/* Success Modal y enlace a login */}
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
