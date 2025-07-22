import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token a TODAS las solicitudes si existe
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Error en interceptor de solicitud:', error?.message || error);
    return Promise.reject(error);
  }
);

// Interceptor de respuesta para manejar errores 401
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Token inválido o expirado');
      localStorage.removeItem('token');
      // Aquí podrías redirigir a login o mostrar una alerta
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
