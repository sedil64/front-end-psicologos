// src/hooks/usePsicologos.ts
import { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import type { Psicologo } from '../types';

export function usePsicologos() {
  const [data, setData]       = useState<Psicologo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    axiosInstance.get<Psicologo[]>('/psicologos')
      .then(res => setData(res.data))
      .catch(err => setError(err.message || 'Error al cargar'))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
