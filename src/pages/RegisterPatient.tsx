import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

type PatientForm = {
  nombreCompleto: string;
  email: string;
  password: string;
  fechaNacimiento?: string;
  genero?: 'MASCULINO' | 'FEMENINO' | 'OTRO';
};

export default function RegisterPatient() {
  const { register, handleSubmit, formState: { errors } } = useForm<PatientForm>();

  const onSubmit = async (data: PatientForm) => {
    try {
      await axios.post('https://tu-backend/api/pacientes/register', data);
      alert('¡Registro de paciente exitoso!');
    } catch {
      alert('Error al registrarte.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl mb-4">Registro de Paciente</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input {...register('nombreCompleto', { required: true })} placeholder="Nombre completo" className="input" />
        {errors.nombreCompleto && <p className="text-red-500">Requerido</p>}
        <input {...register('email', { required: true })} placeholder="Email" className="input" />
        {errors.email && <p className="text-red-500">Requerido</p>}
        <input {...register('password', { required: true, minLength: 6 })} type="password" placeholder="Contraseña" className="input" />
        {errors.password && <p className="text-red-500">Mínimo 6 caracteres</p>}
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Regístrate como Paciente
        </button>
      </form>
    </div>
  );
}
