import  { useEffect, useState } from 'react';
import axiosInstance from '../api/axios'; // tu axios configurado
import { useAuth } from '../context/AuthContext'; // tu contexto de auth
interface Paciente {
  id: number;
  nombres: string;
  apellidos: string;
  // ...otros campos si los necesitas
}

interface Disponibilidad {
  id: number;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  estado: string;
  psicologo: {
    id: number;
    nombre?: string;
  };
}

export default function PsicologoDisponibilidadPage() {
  const { userId, isAuthenticated } = useAuth();

  const [disponibilidades, setDisponibilidades] = useState<Disponibilidad[]>([]);
  const [nombreCliente, setNombreCliente] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Nuevo: estado para el paciente
  const [paciente, setPaciente] = useState<Paciente | null>(null);

  useEffect(() => {
    const fetchDisponibilidades = async () => {
      try {
        const res = await axiosInstance.get('/disponibilidades/libres');
        const data = res.data as Disponibilidad[];
        const disponibles = data.filter(d => d.estado === 'libre');
        setDisponibilidades(disponibles);
      } catch (err) {
        console.error('Error al obtener disponibilidades', err);
        setMensaje('Error al cargar disponibilidades');
      }
    };
    fetchDisponibilidades();

    // Si está autenticado, obtener el perfil del paciente
    const fetchPaciente = async () => {
      if (!isAuthenticated) return;
      try {
        const res = await axiosInstance.get<Paciente>('/pacientes/me');
        setPaciente(res.data);
      } catch (err) {
        console.error('No se pudo obtener el perfil del paciente', err);
        setPaciente(null);
      }
    };
    fetchPaciente();
  }, [isAuthenticated]);

  const agendarCita = async (disponibilidad: Disponibilidad) => {
    if (!isAuthenticated || !userId) {
      alert('Debes iniciar sesión para agendar una cita.');
      return;
    }
    if (!nombreCliente.trim()) {
      alert('Por favor ingresa tu nombre.');
      return;
    }
    if (!paciente) {
      alert('No se pudo obtener tu perfil de paciente.');
      return;
    }

    try {
      await axiosInstance.post('/citas', {
        fecha: disponibilidad.fecha, // formato ISO 8601
        hora: disponibilidad.horaInicio, // string
        psicologoId: disponibilidad.psicologo.id, // entero
        pacienteId: paciente.id, // entero
        nombreCliente, // si el backend lo requiere
      });

      setMensaje('Cita agendada con éxito');
      setNombreCliente('');
      setDisponibilidades(prev =>
        prev.filter(d => d.id !== disponibilidad.id)
      );
    } catch (error: any) {
      console.error('Error al agendar cita', error);
      const msg = error?.response?.data?.message || 'No se pudo agendar la cita. Intenta más tarde.';
      setMensaje(msg);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Agendar cita</h1>

      <label className="block mb-4">
        Tu nombre:
        <input
          type="text"
          value={nombreCliente}
          onChange={e => setNombreCliente(e.target.value)}
          className="border p-2 mt-1 w-full"
          placeholder="Escribe tu nombre completo"
        />
      </label>

      <h2 className="text-xl font-semibold mb-2">Disponibilidades libres:</h2>

      {mensaje && <p className="mb-4 text-center">{mensaje}</p>}

      {disponibilidades.length === 0 ? (
        <p>No hay disponibilidades disponibles.</p>
      ) : (
        <ul>
          {disponibilidades.map(disp => (
            <li
              key={disp.id}
              className="border p-4 mb-2 rounded shadow flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>Fecha:</strong> {disp.fecha}
                </p>
                <p>
                  <strong>Hora:</strong> {disp.horaInicio} - {disp.horaFin}
                </p>
                <p>
                  <strong>Psicólogo:</strong> {disp.psicologo.nombre || disp.psicologo.id}
                </p>
              </div>
              <button
                onClick={() => agendarCita(disp)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Agendar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
