import { FaUserMd, FaLaptop, FaClock, FaLock } from 'react-icons/fa';

export default function WhyUsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-teal-800">¿Por qué elegirnos?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <FaUserMd className="mx-auto text-3xl text-teal-600 mb-2" />
            <h3 className="font-semibold">Psicólogos certificados</h3>
          </div>
          <div>
            <FaLaptop className="mx-auto text-3xl text-teal-600 mb-2" />
            <h3 className="font-semibold">Sesiones 100% online</h3>
          </div>
          <div>
            <FaClock className="mx-auto text-3xl text-teal-600 mb-2" />
            <h3 className="font-semibold">Horarios flexibles</h3>
          </div>
          <div>
            <FaLock className="mx-auto text-3xl text-teal-600 mb-2" />
            <h3 className="font-semibold">Privacidad garantizada</h3>
          </div>
        </div>
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="text-center">
            <span className="text-3xl font-bold text-teal-700">+500</span>
            <p>pacientes ayudados</p>
          </div>
          <div className="text-center">
            <span className="text-3xl font-bold text-teal-700">4.9⭐</span>
            <p>en satisfacción</p>
          </div>
        </div>
        <blockquote className="mt-8 italic text-gray-600 text-center max-w-xl mx-auto">
          “Me sentí escuchado y acompañado desde la primera sesión. ¡Gracias por ayudarme a recuperar mi bienestar!”
        </blockquote>
      </div>
    </section>
  );
}
