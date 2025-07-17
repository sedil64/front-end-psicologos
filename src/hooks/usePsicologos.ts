import { ref, onMounted } from 'vue';
import axiosInstance from '@/api/axios'; // Asegúrate de que esta ruta sea correcta

// Si realmente necesitas el tipo de respuesta:
import type { AxiosResponse } from 'axios';

export function usePsicologos() {
  const psicologos = ref([]);
  const error = ref<string | null>(null);

  const fetchPsicologos = async () => {
    try {
      const response: AxiosResponse = await axiosInstance.get('/psicologos');
      psicologos.value = response.data;
    } catch (err: any) {
      error.value = err?.message || 'Error al cargar los psicólogos';
    }
  };

  onMounted(fetchPsicologos);

  return {
    psicologos,
    error,
  };
}
