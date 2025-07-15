export default function PsychologistPanel() {
  return (  
    <div className="min-h-screen bg-white text-gray-900 px-6 py-8">
      <h1 className="text-4xl font-bold text-teal-800 mb-6 text-center">
        Panel del Psicólogo 🧑‍⚕️
      </h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Sesiones próximas</h2>
        <ul className="space-y-4">
          {[
            { paciente: 'Juan Pérez', hora: '10:00 AM', fecha: 'Mañana' },
            { paciente: 'María Gómez', hora: '2:00 PM', fecha: 'Viernes' },
          ].map((s, i) => (
            <li key={i} className="p-4 border rounded-lg shadow-sm hover:shadow transition">
              <p className="text-teal-700 font-semibold">{s.paciente}</p>
              <p className="text-sm text-gray-600">{s.fecha} a las {s.hora}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Pacientes asignados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {['Juan', 'María', 'Andrés', 'Lucía', 'Carlos'].map((nombre, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg bg-teal-50 text-center shadow-sm hover:shadow transition"
            >
              <h3 className="text-lg font-semibold text-teal-900 mb-1">{nombre}</h3>
              <p className="text-sm text-gray-700">Ver historial clínico</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
