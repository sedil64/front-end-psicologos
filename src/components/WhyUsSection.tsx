import { FaUserMd, FaLaptop, FaClock, FaLock } from 'react-icons/fa';

export default function WhyUsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-teal-800">
          ¿Por qué elegirnos?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: <FaUserMd />, label: 'Psicólogos certificados' },
            { icon: <FaLaptop />, label: 'Sesiones 100% online' },
            { icon: <FaClock />, label: 'Horarios flexibles' },
            { icon: <FaLock />, label: 'Privacidad garantizada' },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-teal-50 p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="text-4xl text-teal-600 mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-teal-800">{item.label}</h3>
            </div>
          ))}
        </div>
        <blockquote className="mt-16 text-center italic text-gray-600 max-w-2xl mx-auto">
          “Me sentí escuchado y acompañado desde la primera sesión. ¡Gracias por ayudarme a recuperar mi bienestar!”
        </blockquote>
      </div>
    </section>
  );
}
