import axiosInstance from './axios';

export async function registerUser(email: string, password: string, role: 'admin' | 'psychologist' | 'patient') {
  const response = await axiosInstance.post('/auth/register', {
    email,
    password,
    role,
  });
  return response.data;
}
