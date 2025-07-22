import { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';

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

interface Disponibilidad {
  id: number;
  fecha: string;
  horaInicio: string;
  horaFin: string;
}

export default function PsychologistDashboard() {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [disponibilidades, setDisponibilidades] = useState<Disponibilidad[]>([]);
  const [loading, setLoading] = useState(true);

  // Estado para crear disponibilidad
  const [fecha, setFecha] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [dispoMensaje, setDispoMensaje] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const [citasRes, pacientesRes, dispoRes] = await Promise.all([
          axiosInstance.get<Cita[]>('/psicologos/me/citas'),
          axiosInstance.get<Paciente[]>('/psicologos/me/pacientes'),
          axiosInstance.get<Disponibilidad[]>('/psicologos/me/disponibilidad'),
        ]);

        setCitas(citasRes.data);
        setPacientes(pacientesRes.data);
        setDisponibilidades(dispoRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  async function crearDisponibilidad() {
    try {
      if (!fecha || !horaInicio || !horaFin) {
        setDispoMensaje('Todos los campos son obligatorios.');
        return;
      }

      await axiosInstance.post('/disponibilidades', {
        fecha,
        horaInicio,
        horaFin,
      });

      setDispoMensaje('Disponibilidad creada exitosamente.');
      setFecha('');
      setHoraInicio('');
      setHoraFin('');

      // Volver a cargar disponibilidades
      const res = await axiosInstance.get<Disponibilidad[]>('/psicologos/me/disponibilidad');
      setDisponibilidades(res.data);
    } catch (err) {
      console.error(err);
      setDispoMensaje('Error al crear disponibilidad.');
    }
  }

  if (loading) {
    return <p className="p-6 text-center">Cargando datos...</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">Panel de Psicólogo</h1>

      {/* Sección: Citas */}
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
                  <td className="border px-2 py-1">{new Date(c.fecha).toLocaleDateString()}</td>
                  <td className="border px-2 py-1">{c.hora}</td>
                  <td className="border px-2 py-1 capitalize">{c.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Sección: Pacientes */}
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

      {/* Sección: Crear Disponibilidad */}
      <section>
        <h2 className="text-2xl mb-4">Crear Disponibilidad</h2>

        {dispoMensaje && (
          <p className="mb-2 text-sm text-blue-700">{dispoMensaje}</p>
        )}

        <form
          onSubmit={e => {
            e.preventDefault();
            crearDisponibilidad();
          }}
          className="space-y-2"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium">Fecha</label>
              <input
                type="date"
                value={fecha}
                onChange={e => setFecha(e.target.value)}
                className="border px-2 py-1 rounded w-full"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium">Hora Inicio</label>
              <input
                type="time"
                value={horaInicio}
                onChange={e => setHoraInicio(e.target.value)}
                className="border px-2 py-1 rounded w-full"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium">Hora Fin</label>
              <input
                type="time"
                value={horaFin}
                onChange={e => setHoraFin(e.target.value)}
                className="border px-2 py-1 rounded w-full"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Crear Disponibilidad
          </button>
        </form>
      </section>

      {/* Sección: Ver Disponibilidades */}
      <section>
        <h2 className="text-2xl mb-4">Mis Disponibilidades</h2>
        {disponibilidades.length === 0 ? (
          <p>No tienes disponibilidades creadas.</p>
        ) : (
          <ul className="list-disc list-inside">
            {disponibilidades.map(d => (
              <li key={d.id}>
                {new Date(d.fecha).toLocaleDateString()} &mdash; {d.horaInicio} - {d.horaFin}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
