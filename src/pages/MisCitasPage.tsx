import { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import SimpleSuccessModal from '../components/SimpleSuccessModal';
import { Paciente } from '../types';


interface Cita {
  id: number;
  fecha: string;
  hora: string;
  estado: string;
  paciente?: { nombres: string; apellidos: string };
  psicologo?: { nombre?: string; id: number };
  // ...otros campos según tu modelo
}

export default function MisCitasPage() {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [mensaje, setMensaje] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [paciente, setPaciente] = useState<Paciente | null>(null);

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const res = await axiosInstance.get<Cita[]>('/citas');
        setCitas(res.data);
      } catch (err) {
        setMensaje('No se pudieron cargar tus citas');
        console.error(err);
      }
    };
    const fetchPaciente = async () => {
      try {
        const res = await axiosInstance.get<Paciente>('/pacientes/me');
        setPaciente(res.data);
      } catch (err) {
        setPaciente(null);
      }
    };
    fetchCitas();
    fetchPaciente();
  }, []);

  // Función para cancelar cita
  const cancelarCita = async (id: number) => {
    if (!window.confirm('¿Seguro que deseas cancelar esta cita?')) return;
    try {
      await axiosInstance.post(`/citas/${id}/cancelar`);
      setCitas(prev => prev.map(c => c.id === id ? { ...c, estado: 'Cancelada' } : c));
      setShowSuccess(true);
      setMensaje('');
    } catch (err) {
      setMensaje('No se pudo cancelar la cita');
      console.error(err);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Mis citas</h1>
      {paciente && (
        <div className="mb-6 p-4 bg-gray-100 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Datos del paciente</h2>
          <p><strong>Nombre:</strong> {paciente.nombres} {paciente.apellidos}</p>
          <p><strong>Identificación:</strong> {paciente.identificacion}</p>
          <p><strong>Fecha de nacimiento:</strong> {paciente.fechaNacimiento}</p>
          <p><strong>Teléfono:</strong> {paciente.telefono}</p>
          {paciente.direccion && <p><strong>Dirección:</strong> {paciente.direccion}</p>}
        </div>
      )}
      {mensaje && <p className="mb-4 text-red-600">{mensaje}</p>}
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
            <li key={cita.id} className="border p-4 mb-2 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <p><strong>Fecha:</strong> {cita.fecha}</p>
                <p><strong>Hora:</strong> {cita.hora}</p>
                <p>
                  <strong>Estado:</strong>{' '}
                  <span className={
                    cita.estado === 'Cancelada'
                      ? 'text-red-600 font-bold'
                      : cita.estado === 'Confirmada'
                        ? 'text-green-600 font-bold'
                        : 'text-yellow-600 font-bold'
                  }>
                    {cita.estado}
                  </span>
                </p>
                {cita.psicologo && (
                  <p><strong>Psicólogo:</strong> {cita.psicologo.nombre || cita.psicologo.id}</p>
                )}
                {cita.paciente && (
                  <p><strong>Paciente:</strong> {cita.paciente.nombres} {cita.paciente.apellidos}</p>
                )}
              </div>
              {/* Botón cancelar solo si la cita no está cancelada */}
              {cita.estado !== 'Cancelada' && (
                <button
                  onClick={() => cancelarCita(cita.id)}
                  className="mt-4 md:mt-0 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
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