export default function AdminDashboard() {
  return (
    <div className="min-h-screen px-6 py-8 bg-gray-50 text-gray-900">
      <h1 className="text-4xl font-bold text-teal-800 mb-6 text-center">
        Panel de Administración 🛠️
      </h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {[
          { label: 'Usuarios registrados', value: '1,245', icon: '👥' },
          { label: 'Sesiones activas hoy', value: '87', icon: '🧑‍⚕️' },
          { label: 'Mensajes pendientes', value: '12', icon: '📨' },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white border shadow-sm rounded-xl p-6 flex flex-col items-center hover:shadow-md transition"
          >
            <div className="text-4xl mb-2">{item.icon}</div>
            <h2 className="text-xl font-semibold">{item.value}</h2>
            <p className="text-sm text-gray-600">{item.label}</p>
          </div>
        ))}
      </section>

      <div className="mt-10 text-center">
        <p className="text-gray-700">
          Puedes gestionar usuarios, revisar sesiones, y moderar contenidos desde este panel.
        </p>
      </div>
    </div>
  );
}
