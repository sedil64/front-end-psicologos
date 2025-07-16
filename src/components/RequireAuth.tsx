import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { ReactNode } from 'react';


interface RequireAuthProps {
  children: ReactNode;
  role: 'admin' | 'psicologo' | 'paciente';
}

export default function RequireAuth({ children, role }: RequireAuthProps) {
  const { token, role: userRole } = useAuth();

  // Si no estás logueado, redirige a login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si no tienes el rol adecuado, redirige a login (o a otra página)
  if (userRole !== role) {
    return <Navigate to="/login" replace />;
  }

  // Permite el acceso
  return <>{children}</>;
}
