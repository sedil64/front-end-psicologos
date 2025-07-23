import type { Psicologo } from '../types';

interface Props {
  psicologo: Psicologo;
  tieneDisponibilidad: boolean;
  isAuthenticated: boolean;
  onAgendar: (psicologo: Psicologo) => void;
  onLoginPrompt: () => void;
}

const defaultAvatars = [
  '/images/avatar1.png',
  '/images/avatar2.png',
  '/images/avatar3.png',
  '/images/avatar4.png',
];

const getDefaultPhoto = (id: number) => {
  const index = id % defaultAvatars.length;
  return defaultAvatars[index];
};

export default function PsychologistCard({
  psicologo,
  tieneDisponibilidad,
  isAuthenticated,
  onAgendar,
  onLoginPrompt,
}: Props) {
  const avatarUrl = psicologo.foto || getDefaultPhoto(psicologo.id);

  return (
    <div className="border p-4 rounded shadow-sm flex flex-col items-center">
      <img
        src={avatarUrl}
        alt={`Foto de ${psicologo.nombres}`}
        className="w-24 h-24 rounded-full object-cover mb-4"
      />
      <h3 className="text-lg font-semibold text-center">
        {psicologo.nombres} {psicologo.apellidos}
      </h3>
      <p className="text-sm text-gray-600 mb-4 text-center">
        Especialidad: {psicologo.especialidad}
      </p>

      {tieneDisponibilidad ? (
        isAuthenticated ? (
          <button
            onClick={() => onAgendar(psicologo)}
            className="mt-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Ver disponibilidad
          </button>
        ) : (
          <button
            onClick={onLoginPrompt}
            className="mt-auto bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            Inicia sesión para agendar
          </button>
        )
      ) : (
        <p className="mt-auto text-sm text-gray-500 italic text-center">
          No tiene citas disponibles por el momento
        </p>
      )}
    </div>
  );
}
