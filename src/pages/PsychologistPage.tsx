import { useAuth } from '../context/AuthContext';
import { usePsicologos } from '../hooks/usePsicologos';
import PsychologistCard from '../components/PsychologistCard';
import { useNavigate } from 'react-router-dom';

export default function PsicologosPage() {
  const { psicologos, loading, error } = usePsicologos();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAgendar = (psicologo: any) => {
    navigate(`/psicologos/${psicologo.id}/disponibilidad`);
  };

  const handleLoginPrompt = () => {
    alert('Debes iniciar sesión para agendar una cita.');
  };

  if (loading) {
    return <p className="text-center py-6">Cargando psicólogos...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 py-6">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Psicólogos disponibles
      </h1>

      {psicologos.length === 0 ? (
        <p className="text-center text-gray-500">No hay psicólogos disponibles en este momento.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {psicologos.map((psicologo) => (
            <PsychologistCard
              key={psicologo.id}
              psicologo={psicologo}
              tieneDisponibilidad={psicologo.tieneDisponibilidad}
              isAuthenticated={isAuthenticated}
              onAgendar={handleAgendar}
              onLoginPrompt={handleLoginPrompt}
            />
          ))}
        </div>
      )}
    </div>
  );
}
