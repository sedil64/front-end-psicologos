const testimonials = [
  {
    nombre: 'María G.',
    comentario: 'La atención fue excelente y muy profesional. Me sentí escuchada y comprendida.',
    foto: '/images/testimonio1.jpg',
  },
  {
    nombre: 'Carlos R.',
    comentario: 'Gracias a las sesiones online pude mejorar mi bienestar emocional desde casa.',
    foto: '/images/testimonio2.jpg',
  },
  {
    nombre: 'Lucía P.',
    comentario: 'Muy fácil reservar y el trato fue muy humano. Lo recomiendo totalmente.',
    foto: '/images/testimonio3.jpg',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-teal-800">Testimonios</h2>
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-teal-50 rounded-xl p-6 shadow flex-1 flex flex-col items-center">
              <img src={t.foto} alt={t.nombre} className="w-16 h-16 rounded-full object-cover mb-2" />
              <p className="italic text-gray-700 text-center mb-2">“{t.comentario}”</p>
              <span className="text-teal-700 font-semibold text-sm">{t.nombre}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
