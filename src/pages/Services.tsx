export default function Services() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 px-4 py-10">
      <h1 className="text-4xl font-bold text-teal-800 mb-4">Servicios disponibles</h1>
      <p className="text-lg text-center max-w-2xl mb-6">
        En nuestra plataforma, puedes acceder a sesiones virtuales, gestionar tu historial clínico, y recibir asesoramiento profesional por parte de psicólogos certificados.
      </p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4 w-full max-w-4xl">
        {[
          { name: 'Consulta psicológica', icon: '🧠' },
          { name: 'Sesión online', icon: '📱' },
          { name: 'Agenda terapias', icon: '📅' },
          { name: 'Chat confidencial', icon: '🔐' },
          { name: 'Evaluaciones emocionales', icon: '📊' },
          { name: 'Historial clínico digital', icon: '💾' },
        ].map((service, index) => (
          <li
            key={index}
            className="p-4 border rounded-lg shadow hover:shadow-md transition text-center bg-teal-50"
          >
            <div className="text-4xl mb-2">{service.icon}</div>
            <h3 className="text-lg font-semibold text-teal-900">{service.name}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}
