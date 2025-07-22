const posts = [
  {
    titulo: 'Cómo manejar el estrés en 5 pasos',
    resumen: 'Descubre técnicas sencillas para reducir el estrés diario.',
    imagen: '/images/blog1.jpg',
  },
  {
    titulo: 'La importancia de la salud mental',
    resumen: 'Por qué cuidar tu mente es tan importante como cuidar tu cuerpo.',
    imagen: '/images/blog2.jpg',
  },
  {
    titulo: '¿Cuándo acudir a un psicólogo?',
    resumen: 'Señales de que es momento de buscar ayuda profesional.',
    imagen: '/images/blog3.jpg',
  },
];

export default function BlogSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-teal-800">Psicología y Bienestar</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((p, i) => (
            <div key={i} className="bg-teal-50 rounded-xl shadow p-6 flex flex-col">
              <img src={p.imagen} alt={p.titulo} className="w-full h-40 object-cover rounded mb-4" />
              <h3 className="font-semibold text-teal-800 mb-2">{p.titulo}</h3>
              <p className="text-gray-700 mb-4">{p.resumen}</p>
              <a href="#" className="text-teal-600 font-semibold hover:underline">Leer más</a>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a href="#" className="px-6 py-3 border border-teal-600 text-teal-600 rounded-lg font-semibold text-lg shadow hover:bg-teal-600 hover:text-white transition">
            Ver blog completo
          </a>
        </div>
      </div>
    </section>
  );
}
