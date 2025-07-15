import { useForm } from 'react-hook-form';
import type { Psicologo, Cita } from '../types';
import axiosInstance from '../api/axios';
import { useAuth } from '../context/AuthContext';

interface FormValues {
  nombreCliente: string;
  fecha: string;
  hora: string;
}

interface Props {
  psicologo: Psicologo;
  visible: boolean;
  onClose: () => void;
  onSuccess: (cita: Cita) => void;
}

export default function AppointmentForm({
  psicologo,
  visible,
  onClose,
  onSuccess,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const { userId } = useAuth();

  const onSubmit = async (data: FormValues) => {
    try {
      const payload = {
        ...data,
        psicologoId: psicologo.id,
        pacienteId: userId!,
      };
      const res = await axiosInstance.post<Cita>('/citas', payload);
      onSuccess(res.data);
      onClose();
    } catch (err) {
      console.error(
        'Error al agendar cita:',
        err instanceof Error ? err.message : err,
      );
      alert('No se pudo agendar la cita');
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4">
      <div className="bg-white rounded p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          Agendar con {psicologo.nombres}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm">Tu nombre</label>
            <input
              {...register('nombreCliente', { required: true })}
              className="w-full border px-2 py-1 rounded"
            />
            {errors.nombreCliente && (
              <p className="text-red-500 text-xs">Requerido</p>
            )}
          </div>
          <div>
            <label className="block text-sm">Fecha</label>
            <input
              type="date"
              {...register('fecha', { required: true })}
              className="w-full border px-2 py-1 rounded"
            />
            {errors.fecha && (
              <p className="text-red-500 text-xs">Requerido</p>
            )}
          </div>
          <div>
            <label className="block text-sm">Hora</label>
            <input
              type="time"
              {...register('hora', { required: true })}
              className="w-full border px-2 py-1 rounded"
            />
            {errors.hora && (
              <p className="text-red-500 text-xs">Requerido</p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Agendando…' : 'Agendar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
