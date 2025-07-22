import { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import SimpleSuccessModal from '../components/SimpleSuccessModal';
import type { Paciente } from '../types';

interface Cita {
  id: number;
  fecha: string;
  hora: string;
  estado: string;
  paciente?: {
    id: number;
    nombres: string;
    apellidos: string;
  };
  psicologo?: {
    id: number;
    nombre?: string;
  };
}

export default function MisCitasPage() {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [mensaje, setMensaje] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [paciente, setPaciente] = useState<Paciente | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citasRes, pacienteRes] = await Promise.all([
          axiosInstance.get<Cita[]>('/citas'),
          axiosInstance.get<Paciente>('/pacientes/me'),
        ]);

        const currentPaciente = pacienteRes.data;
        setPaciente(currentPaciente);

        // Filtramos solo las citas de este paciente
        const misCitas = citasRes.data.filter(
          c => c.paciente?.id === currentPaciente.id
        );
        setCitas(misCitas);
      } catch (error) {
        console.error(error);
        setMensaje('Error cargando datos. Intenta de nuevo más tarde.');
      }
    };

    fetchData();
  }, []);

  const cancelarCita = async (id: number) => {
    if (!window.confirm('¿Seguro que deseas cancelar esta cita?')) return;
    try {
      await axiosInstance.patch(`/citas/${id}`, { estado: 'Cancelada' });
      setCitas(prev =>
        prev.map(c => (c.id === id ? { ...c, estado: 'Cancelada' } : c))
      );
      setShowSuccess(true);
      setMensaje('');
    } catch (error) {
      console.error(error);
      setMensaje('No se pudo cancelar la cita');
    }
  };

  if (mensaje && !citas.length && paciente === null) {
    return <p className="p-4 text-red-600">{mensaje}</p>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Mis citas</h1>

      {paciente && (
        <section className="mb-6 p-4 bg-gray-100 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Datos del paciente</h2>
          <p>
            <strong>Nombre:</strong> {paciente.nombres} {paciente.apellidos}
          </p>
          <p>
            <strong>Identificación:</strong> {paciente.identificacion}
          </p>
          <p>
            <strong>Fecha de nacimiento:</strong> {paciente.fechaNacimiento}
          </p>
          <p>
            <strong>Teléfono:</strong> {paciente.telefono}
          </p>
          {paciente.direccion && (
            <p>
              <strong>Dirección:</strong> {paciente.direccion}
            </p>
          )}
        </section>
      )}

      {mensaje && citas.length > 0 && (
        <p className="mb-4 text-red-600">{mensaje}</p>
      )}

      {showSuccess && (
        <SimpleSuccessModal
          message="Su cita ha sido cancelada con éxito."
          onClose={() => setShowSuccess(false)}
        />
      )}

      {citas.length === 0 ? (
        <p>No tienes citas agendadas.</p>
      ) : (
        <ul>
          {citas.map(cita => (
            <li
              key={`${cita.id}-${cita.estado}`}
              className="border p-4 mb-2 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p>
                  <strong>Fecha:</strong> {cita.fecha}
                </p>
                <p>
                  <strong>Hora:</strong> {cita.hora}
                </p>
                <p>
                  <strong>Estado:</strong>{' '}
                  <span
                    className={`font-bold ${
                      cita.estado === 'Cancelada'
                        ? 'text-red-600'
                        : cita.estado === 'Confirmada'
                        ? 'text-green-600'
                        : 'text-yellow-600'
                    }`}
                  >
                    {cita.estado}
                  </span>
                </p>
                {cita.psicologo && (
                  <p>
                    <strong>Psicólogo:</strong>{' '}
                    {cita.psicologo.nombre || cita.psicologo.id}
                  </p>
                )}
              </div>

              {cita.estado !== 'Cancelada' && (
                <button
                  onClick={() => cancelarCita(cita.id)}
                  className="mt-4 md:mt-0 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  aria-label={`Cancelar cita ${cita.id}`}
                >
                  Cancelar cita
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
