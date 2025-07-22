import { useState } from 'react';

export default function QuickBookingWidget() {
  const [step, setStep] = useState(1);
  const [especialista, setEspecialista] = useState('');
  const [horario, setHorario] = useState('');
  const [datos, setDatos] = useState('');

  return (
    <section className="py-16 bg-teal-50">
      <div className="max-w-xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-teal-800">Reserva rápida</h2>
        <div className="bg-white rounded-xl shadow p-6">
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <label className="font-semibold">Elige especialista</label>
              <input type="text" className="border rounded px-3 py-2" value={especialista} onChange={e => setEspecialista(e.target.value)} placeholder="Ej: Ana Torres" />
              <button className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700" onClick={() => setStep(2)}>
                Siguiente
              </button>
            </div>
          )}
          {step === 2 && (
            <div className="flex flex-col gap-4">
              <label className="font-semibold">Selecciona horario</label>
              <input type="text" className="border rounded px-3 py-2" value={horario} onChange={e => setHorario(e.target.value)} placeholder="Ej: Lunes 10:00" />
              <button className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700" onClick={() => setStep(3)}>
                Siguiente
              </button>
            </div>
          )}
          {step === 3 && (
            <div className="flex flex-col gap-4">
              <label className="font-semibold">Tus datos</label>
              <input type="text" className="border rounded px-3 py-2" value={datos} onChange={e => setDatos(e.target.value)} placeholder="Nombre y correo" />
              <button className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700" onClick={() => alert('¡Reserva enviada!')}>
                Confirmar
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
