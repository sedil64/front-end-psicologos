import { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import { useAuth } from '../context/AuthContext';

interface Cita {
  id: number;
  paciente: { nombre: string };
  fecha: string;
  horaInicio: string;
  estado: string;
}

interface Paciente {
  id: number;
  nombre: string;
}

export default function PsychologistPanel() {
  const { userId, role } = useAuth();
  const [sesiones, setSesiones] = useState<Cita[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);

  useEffect(() => {
    if (!userId || role !== 'psicologo') return;

    // Fetch sesiones próximas (ejemplo: citas confirmadas futuras)
    const fetchSesiones = async () => {
      try {
        const res = await axiosInstance.get(`/citas/psicologo/${userId}/proximas`);
        setSesiones(res.data);
      } catch (error) {
        console.error('Error al cargar sesiones', error);
      }
    };

    // Fetch pacientes asignados al psicólogo
    const fetchPacientes = async () => {
      try {
        const res = await axiosInstance.get(`/psicologos/${userId}/pacientes`);
        setPacientes(res.data);
      } catch (error) {
        console.error('Error al cargar pacientes', error);
      }
    };

    fetchSesiones();
    fetchPacientes();
  }, [userId, role]);

  return (
    <div className="min-h-screen bg-white text-gray-900 px-6 py-8">
      <h1 className="text-4xl font-bold text-teal-800 mb-6 text-center">
        Panel del Psicólogo 🧑‍⚕️
      </h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Sesiones próximas</h2>
        {sesiones.length === 0 ? (
          <p>No tienes sesiones próximas.</p>
        ) : (
          <ul className="space-y-4">
            {sesiones.map((s) => (
              <li
                key={s.id}
                className="p-4 border rounded-lg shadow-sm hover:shadow transition"
              >
                <p className="text-teal-700 font-semibold">{s.paciente.nombre}</p>
                <p className="text-sm text-gray-600">
                  {s.fecha} a las {s.horaInicio}
                </p>
                <p className="text-sm text-gray-600">Estado: {s.estado}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Pacientes asignados</h2>
        {pacientes.length === 0 ? (
          <p>No tienes pacientes asignados.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pacientes.map((paciente) => (
              <div
                key={paciente.id}
                className="p-4 border rounded-lg bg-teal-50 text-center shadow-sm hover:shadow transition"
              >
                <h3 className="text-lg font-semibold text-teal-900 mb-1">{paciente.nombre}</h3>
                <p className="text-sm text-gray-700 cursor-pointer hover:underline">
                  Ver historial clínico
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
