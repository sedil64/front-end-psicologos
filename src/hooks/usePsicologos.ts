import { useEffect, useState } from 'react';
import axiosInstance from '../api/axios'; // ✅ ruta relativa correcta
import type { AxiosResponse } from 'axios'; // ✅ opcional, o puedes dejar que infiera

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

export function usePsicologos() {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [citasRes, pacientesRes] = await Promise.all([
          axiosInstance.get<Cita[]>('/psicologos/me/citas'),
          axiosInstance.get<Paciente[]>('/psicologos/me/pacientes'),
        ]);
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
    citas,
    pacientes,
    loading,
    error,
  };
}
