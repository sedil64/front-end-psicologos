// src/AppRoutes.tsx
import { Routes, Route, Navigate } from 'react-router-dom';

// Context & Guards
import RequireAuth from './components/RequireAuth';

// Pages – Públicas
import Home                 from './pages/Home';
import Login                from './pages/Login';
import Services             from './pages/Services';
import JoinUsPage           from './pages/JoinUsPage';
import RegisterPsychologist from './pages/RegisterPsychologist';
import RegisterPatient      from './pages/RegisterPatient';

// Pages – Privadas
import AdminDashboard        from './pages/AdminDashboard';
import PsychologistPanel     from './pages/PsychologistPanel';
import PsychologistDashboard from './pages/PsychologistDashboard';
import PatientHome           from './pages/PatientHome';

// Nuevo: Directorio y agendamiento
import PsychologistDirectory from './pages/PsychologistDirectory';

export default function AppRoutes() {
  return (
    <Routes>
      {/** ---------- RUTAS PÚBLICAS ---------- */}
      <Route path="/"               element={<Home />} />
      <Route path="/login"          element={<Login />} />
      <Route path="/services"       element={<Services />} />
      <Route path="/register/psychologist" element={<RegisterPsychologist />} />
      <Route path="/register/patient"      element={<RegisterPatient />} />
      <Route path="/join-us"               element={<JoinUsPage />} />

      {/** ---------- RUTAS PRIVADAS POR ROL ---------- */}

      {/** Admin */}
      <Route
        path="/admin/dashboard"
        element={
          <RequireAuth role="admin">
            <AdminDashboard />
          </RequireAuth>
        }
      />

      {/** Psicólogo */}
      <Route
        path="/psychologist/panel"
        element={
          <RequireAuth role="psicologo">
            <PsychologistPanel />
          </RequireAuth>
        }
      />
      <Route
        path="/dashboard/psicologo"
        element={
          <RequireAuth role="psicologo">
            <PsychologistDashboard />
          </RequireAuth>
        }
      />

      {/** Paciente */}
      <Route
        path="/patient/home"
        element={
          <RequireAuth role="paciente">
            <PatientHome />
          </RequireAuth>
        }
      />

      {/** Directorio de psicólogos (solo pacientes) */}
      <Route
        path="/psicologos"
        element={
          <RequireAuth role="paciente">
            <PsychologistDirectory />
          </RequireAuth>
        }
      />

      {/** Fallback: redirige al login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
