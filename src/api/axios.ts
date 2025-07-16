import axios from 'axios'; // Esta es la línea que faltaba
import type { InternalAxiosRequestConfig, AxiosError } from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de solicitud
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    console.error('Error en interceptor de solicitud:', error.message);
    return Promise.reject(error);
  }
);

// Interceptor de respuesta opcional
axiosInstance.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.warn('Token inválido o expirado');
      localStorage.removeItem('token');
      // Aquí podrías redirigir al login si es necesario
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
