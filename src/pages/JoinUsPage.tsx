// src/pages/JoinUsPage.tsx
import  { useState, type JSX } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const benefits = [
  {
    img: 'https://via.placeholder.com/80?text=📈',
    title: 'Mayor visibilidad',
    desc: 'Llega a cientos de pacientes cada semana.',
    link: '/register/psychologist',
  },
  {
    img: 'https://via.placeholder.com/80?text=🗓️',
    title: 'Agenda automatizada',
    desc: 'El sistema gestiona tus citas.',
    link: '/register/psychologist',
  },
  {
    img: 'https://via.placeholder.com/80?text=💬',
    title: 'Comunicación segura',
    desc: 'Videoconsultas y mensajes cifrados.',
    link: '/register/psychologist',
  },
  {
    img: 'https://via.placeholder.com/80?text=🔒',
    title: 'Protección de datos',
    desc: 'Cumplimos estándares de privacidad.',
    link: '/register/psychologist',
  },
];

export default function JoinUsPage(): JSX.Element {
  const navigate = useNavigate();
  const [role, setRole] = useState<'psychologist' | 'patient'>('psychologist');

  const handleGo = () => {
    if (role === 'psychologist') navigate('/register/psychologist');
    else navigate('/register/patient');
  };

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero + Dropdown */}
      <section className="bg-blue-600 text-white py-12 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Únete a nuestra comunidad
        </h1>
        <p className="mb-4">
          Regístrate como psicólogo o paciente y empieza hoy mismo.
        </p>
        <div className="inline-flex items-center space-x-2">
          <select
            value={role}
            onChange={e => setRole(e.target.value as any)}
            className="px-3 py-2 rounded text-gray-800"
          >
            <option value="psychologist">Psicólogo</option>
            <option value="patient">Paciente</option>
          </select>
          <button
            onClick={handleGo}
            className="bg-white text-blue-600 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            Ir
          </button>
        </div>
      </section>

      {/* Beneficios (cards con imagen y link) */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <h2 className="text-2xl font-bold mb-8 text-center">
          ¿Por qué trabajar con nosotros?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map(item => (
            <Link
              key={item.title}
              to={item.link}
              className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition"
            >
              <img
                src={item.img}
                alt={item.title}
                className="mx-auto mb-4 h-16 w-16 object-contain"
              />
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
