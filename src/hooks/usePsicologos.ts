import { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';

interface Psicologo {
  id: number;
  nombres: string;
  apellidos: string;
  especialidad: string;
  fotoUrl?: string;
}

interface Cita {
  id: number;
  nombreCliente: string;
  fecha: string;
  hora: string;
  estado: string;
  psicologo: Psicologo; // asegúrate de que venga el psicólogo en la cita
}

interface Paciente {
  id: number;
  nombreCompleto: string;
  email: string;
}

export function usePsicologos() {
  const [psicologos, setPsicologos] = useState<Psicologo[]>([]);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [psicologosRes, citasRes, pacientesRes] = await Promise.all([
          axiosInstance.get<Psicologo[]>('/psicologos'),
          axiosInstance.get<Cita[]>('/psicologos/me/citas'),
          axiosInstance.get<Paciente[]>('/psicologos/me/pacientes'),
        ]);
        setPsicologos(psicologosRes.data);
        setCitas(citasRes.data);
        setPacientes(pacientesRes.data);
      } catch (err: any) {
        console.error('Error al cargar datos de psicólogos:', err);
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return {
    psicologos,
    citas,
    pacientes,
    loading,
    error,
  };
}
