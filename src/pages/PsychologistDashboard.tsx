import { useEffect, useState } from 'react';
import axiosInstance from '../api/axios'; // ✅ Importación correcta

interface Cita {
  id: number;
  nombreCliente: string;
  fecha: string;
  hora: string;
  estado: string;
}

interface Paciente {
  id: number;
  nombreCompleto: string;
  email: string;
}

export default function PsychologistDashboard() {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [citasRes, pacientesRes] = await Promise.all([
          axiosInstance.get<Cita[]>('/psicologos/me/citas'),
          axiosInstance.get<Paciente[]>('/psicologos/me/pacientes'),
        ]);
        setCitas(citasRes.data);
        setPacientes(pacientesRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <p className="p-6 text-center">Cargando datos...</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">Panel de Psicólogo</h1>

      <section>
        <h2 className="text-2xl mb-4">Mis Citas</h2>
        {citas.length === 0 ? (
          <p>No tienes citas agendadas.</p>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border px-2 py-1">Cliente</th>
                <th className="border px-2 py-1">Fecha</th>
                <th className="border px-2 py-1">Hora</th>
                <th className="border px-2 py-1">Estado</th>
              </tr>
            </thead>
            <tbody>
              {citas.map(c => (
                <tr key={c.id}>
                  <td className="border px-2 py-1">{c.nombreCliente}</td>
                  <td className="border px-2 py-1">
                    {new Date(c.fecha).toLocaleDateString()}
                  </td>
                  <td className="border px-2 py-1">{c.hora}</td>
                  <td className="border px-2 py-1 capitalize">{c.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section>
        <h2 className="text-2xl mb-4">Mis Pacientes</h2>
        {pacientes.length === 0 ? (
          <p>No tienes pacientes asignados.</p>
        ) : (
          <ul className="list-disc list-inside">
            {pacientes.map(p => (
              <li key={p.id}>
                {p.nombreCompleto} &mdash; {p.email}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
