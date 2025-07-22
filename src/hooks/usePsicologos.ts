import { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import { useAuth } from '../context/AuthContext'; // Ajusta la ruta si es necesario

interface Psicologo {
  id: number;
  nombres: string;
  apellidos: string;
  especialidad: string;
  fotoUrl?: string;
}

interface PsicologoConDisponibilidad extends Psicologo {
  tieneDisponibilidad: boolean;
}

interface Cita {
  id: number;
  nombreCliente: string;
  fecha: string;
  hora: string;
  estado: string;
  psicologo: Psicologo;
}

interface Paciente {
  id: number;
  nombreCompleto: string;
  email: string;
}

export function usePsicologos() {
  const { isAuthenticated, role } = useAuth();

  const [psicologos, setPsicologos] = useState<PsicologoConDisponibilidad[]>([]);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Traer todos los psicólogos
        const psicologosRes = await axiosInstance.get<Psicologo[]>('/psicologos');

        // Consultar disponibilidad para cada psicólogo
        const psicologosConDisponibilidad = await Promise.all(
          psicologosRes.data.map(async (psico) => {
            try {
              const dispRes = await axiosInstance.get<{ disponible: boolean }>(
                `/psicologos/${psico.id}/tiene-disponibilidad`
              );
              return { ...psico, tieneDisponibilidad: dispRes.data.disponible };
            } catch {
              return { ...psico, tieneDisponibilidad: false };
            }
          })
        );

        setPsicologos(psicologosConDisponibilidad);

        // Si está logueado Y es psicólogo, traer citas y pacientes
        if (isAuthenticated && role === 'psicologo') {
          const [citasRes, pacientesRes] = await Promise.all([
            axiosInstance.get<Cita[]>('/psicologos/me/citas'),
            axiosInstance.get<Paciente[]>('/psicologos/me/pacientes'),
          ]);
          setCitas(citasRes.data);
          setPacientes(pacientesRes.data);
        } else {
          // Si no es psicólogo o no está autenticado, no llamar a citas/pacientes
          setCitas([]);
          setPacientes([]);
        }
      } catch (err) {
        console.error('Error al cargar datos de psicólogos:', err);
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [isAuthenticated, role]);

  return {
    psicologos,
    citas,
    pacientes,
    loading,
    error,
  };
}
