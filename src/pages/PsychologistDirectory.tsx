// src/pages/PsychologistDirectory.tsx
import { useState } from 'react';
import { usePsicologos } from '../hooks/usePsicologos';
import type { Psicologo, Cita } from '../types';
import PsychologistCard from '../components/PsychologistCard';
import AppointmentForm from '../components/AppointmentForm';

export default function PsychologistDirectory() {
  const { data: psicologos, loading, error } = usePsicologos();
  const [selected, setSelected]           = useState<Psicologo | null>(null);
  const [citas, setCitas]                 = useState<Cita[]>([]);

  if (loading) return <p className="p-6">Cargando psicólogos…</p>;
  if (error)   return <p className="p-6 text-red-600">{error}</p>;

  const handleAgendar = (psico: Psicologo) => {
    setSelected(psico);
  };

  const handleSuccess = (nueva: Cita) => {
    setCitas(prev => [nueva, ...prev]);
    alert('Cita agendada con éxito');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Nuestros Psicólogos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {psicologos.map(psico => (
          <PsychologistCard
            key={psico.id}
            psicologo={psico}
            onAgendar={handleAgendar}
          />
        ))}
      </div>

      <AppointmentForm
        visible={!!selected}
        psicologo={selected!}
        onClose={() => setSelected(null)}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
