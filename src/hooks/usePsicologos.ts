import { useState, useEffect } from 'react';
import type { AxiosResponse } from 'axios';
import type { Psicologo } from '../types';
import type { AxiosResponse } from 'axios';

export function usePsicologos() {
  const [data, setData] = useState<Psicologo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; // para evitar setState en componente desmontado

    const fetchPsicologos = async () => {
      try {
        const res: AxiosResponse<Psicologo[]> = await axiosInstance.get('/psicologos');
        if (isMounted) {
          setData(res.data);
          setError(null);
        }
      } catch (err: unknown) {
        if (isMounted) {
          const message =
            err instanceof Error ? err.message : 'Error al cargar psicólogos';
          setError(message);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPsicologos();

    // Cleanup para prevenir memory leak
    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
}
