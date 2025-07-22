// PsychologistCard.tsx
import type { Psicologo } from '../types';

interface Props {
  psicologo: Psicologo;
  tieneDisponibilidad: boolean;
  isAuthenticated: boolean;
  onAgendar: (psicologo: Psicologo) => void;
  onLoginPrompt: () => void;
}

export default function PsychologistCard({ psicologo, tieneDisponibilidad, isAuthenticated, onAgendar, onLoginPrompt }: Props) {
  return (
    <div className="border p-4 rounded shadow-sm flex flex-col">
      <h3 className="text-lg font-semibold">
        {psicologo.nombres} {psicologo.apellidos}
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Especialidad: {psicologo.especialidad}
      </p>

      {tieneDisponibilidad ? (
        isAuthenticated ? (
          <button
            onClick={() => onAgendar(psicologo)}
            className="mt-auto bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Ver disponibilidad
          </button>
        ) : (
          <button
            onClick={onLoginPrompt}
            className="mt-auto bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
          >
            Inicia sesión para agendar
          </button>
        )
      ) : (
        <p className="mt-auto text-sm text-gray-500 italic">
          No tiene citas disponibles por el momento
        </p>
      )}
    </div>
  );
}
