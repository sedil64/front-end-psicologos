// src/pages/AgendarCita.tsx
import { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';

interface Disponibilidad {
  id: number;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  psicologo: {
    id: number;
    nombres: string;
    apellidos: string;
  };
}

export default function AgendarCita() {
  const [disponibilidades, setDisponibilidades] = useState<Disponibilidad[]>([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    async function fetchDisponibilidades() {
      try {
        const res = await axiosInstance.get<Disponibilidad[]>('/disponibilidades/libres');
        setDisponibilidades(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchDisponibilidades();
  }, []);

  async function agendar(disponibilidadId: number) {
    try {
      const nombreCliente = prompt('Confirma tu nombre completo:');
      if (!nombreCliente) return;

      await axiosInstance.post('/citas/agendar', {
        disponibilidadId,
        nombreCliente,
      });

      setMensaje('Cita agendada con éxito.');
      setDisponibilidades(d => d.filter(dispo => dispo.id !== disponibilidadId));
    } catch (err) {
      console.error(err);
      setMensaje('Error al agendar la cita.');
    }
  }

  if (loading) return <p className="p-4">Cargando disponibilidades...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center">Agendar Cita</h1>

      {mensaje && <div className="bg-green-100 text-green-800 p-2 rounded">{mensaje}</div>}

      {disponibilidades.length === 0 ? (
        <p>No hay disponibilidades abiertas en este momento.</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-2 py-1">Psicólogo</th>
              <th className="border px-2 py-1">Fecha</th>
              <th className="border px-2 py-1">Hora</th>
              <th className="border px-2 py-1">Acción</th>
            </tr>
          </thead>
          <tbody>
            {disponibilidades.map(d => (
              <tr key={d.id}>
                <td className="border px-2 py-1">
                  {d.psicologo.nombres} {d.psicologo.apellidos}
                </td>
                <td className="border px-2 py-1">
                  {new Date(d.fecha).toLocaleDateString()}
                </td>
                <td className="border px-2 py-1">{d.horaInicio}</td>
                <td className="border px-2 py-1 text-center">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => agendar(d.id)}
                  >
                    Agendar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
