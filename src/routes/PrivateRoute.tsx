import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  requiredRole: 'admin' | 'psychologist' | 'patient';
};

export default function PrivateRoute({ children, requiredRole }: Props) {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated || role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
