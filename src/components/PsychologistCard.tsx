// src/components/PsychologistCard.tsx
import React from 'react';
import type { Psicologo } from '../types';

interface Props {
  psicologo: Psicologo;
  onAgendar: (psicologo: Psicologo) => void;
}

export default function PsychologistCard({ psicologo, onAgendar }: Props) {
  return (
    <div className="border p-4 rounded shadow-sm flex flex-col">
      <h3 className="text-lg font-semibold">
        {psicologo.nombres} {psicologo.apellidos}
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Especialidad: {psicologo.especialidad}
      </p>
      <button
        onClick={() => onAgendar(psicologo)}
        className="mt-auto bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Agendar cita
      </button>
    </div>
  );
}
