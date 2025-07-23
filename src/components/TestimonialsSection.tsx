export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'María González',
      image: '/images/testimonio1.jpg',
      comment:
        'Gracias a las sesiones, aprendí a manejar mi ansiedad. La plataforma es muy fácil de usar y siempre me sentí escuchada.',
    },
    {
      name: 'Carlos Pérez',
      image: '/images/testimonio2.jpg',
      comment:
        'La atención fue excelente. Pude encontrar a un profesional con el que me sentí cómodo desde la primera sesión.',
    },
    {
      name: 'Lucía Torres',
      image: '/images/testimonio3.jpg',
      comment:
        'Los horarios flexibles me permitieron recibir ayuda sin interrumpir mis responsabilidades. Lo recomiendo totalmente.',
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-teal-800 mb-12">
          Lo que dicen nuestros pacientes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-20 h-20 object-cover rounded-full border-4 border-teal-500 mb-4"
                />
                <h3 className="text-lg font-semibold text-teal-700">{t.name}</h3>
                <p className="text-gray-600 mt-3 italic">“{t.comment}”</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
