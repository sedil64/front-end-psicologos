import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../api/axios';

type Role = 'admin' | 'psicologo' | 'paciente';

interface JwtPayload {
  sub: number;
  email: string;
  role: Role;
}

interface AuthState {
  token: string | null;
  role: Role | null;
  userId: number | null;
  isAuthenticated: boolean;
  login: (creds: { email: string; password: string }) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken]   = useState<string | null>(
    () => localStorage.getItem('token'),
  );
  const [role, setRole]     = useState<Role | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  // Al montar, si hay token en localStorage, decodifícalo
  useEffect(() => {
    if (!token) return;
    try {
      const { sub, role }: JwtPayload = jwtDecode(token);
      setRole(role);
      setUserId(sub);
    } catch {
      // token inválido: limpia
      localStorage.removeItem('token');
      setToken(null);
    }
  }, [token]);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<boolean> => {
    try {
      const res = await axiosInstance.post<{ access_token: string }>(
        '/auth/login',
        { email, password },
      );
      const accessToken = res.data.access_token;
      localStorage.setItem('token', accessToken);
      setToken(accessToken);

      const { sub, role }: JwtPayload = jwtDecode(accessToken);
      setRole(role);
      setUserId(sub);
      return true;
    } catch (err) {
      console.error('Login error:', err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setRole(null);
    setUserId(null);
  };

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider
      value={{ token, role, userId, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
