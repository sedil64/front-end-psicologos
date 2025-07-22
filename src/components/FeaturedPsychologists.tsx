// Puedes conectar esto a tu API real o usar datos mock
const mockPsychologists = [
  {
    id: 1,
    nombre: 'Dra. Ana Torres',
    especialidad: 'Ansiedad y Estrés',
    experiencia: 8,
    foto: '/images/psicologo1.jpg',
  },
  {
    id: 2,
    nombre: 'Dr. Luis Pérez',
    especialidad: 'Terapia de Pareja',
    experiencia: 12,
    foto: '/images/psicologo2.jpg',
  },
  {
    id: 3,
    nombre: 'Dra. Sofía Gómez',
    especialidad: 'Depresión',
    experiencia: 10,
    foto: '/images/psicologo3.jpg',
  },
];

export default function FeaturedPsychologists() {
  return (
    <section className="py-16 bg-teal-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-teal-800">Psicólogos destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockPsychologists.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition group"
            >
              <img
                src={p.foto}
                alt={p.nombre}
                className="w-28 h-28 object-cover rounded-full mb-4 border-4 border-teal-200 group-hover:border-teal-500 transition"
              />
              <h3 className="text-lg font-bold text-teal-800 mb-1">{p.nombre}</h3>
              <p className="text-teal-600 mb-1">{p.especialidad}</p>
              <p className="text-gray-500 text-sm mb-4">{p.experiencia} años de experiencia</p>
              <div className="flex gap-2">
                <a href="#" className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition text-sm">Ver perfil</a>
                <a href="#" className="px-4 py-2 border border-teal-600 text-teal-600 rounded hover:bg-teal-600 hover:text-white transition text-sm">Reservar sesión</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
