import axios, { AxiosRequestConfig, AxiosError } from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // o tu URL fija
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de solicitud
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
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
      // Puedes redirigir al login o limpiar el token si quieres
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
