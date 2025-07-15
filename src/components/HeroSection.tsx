import React from 'react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen">
      {/* Fondo difuminado */}
      <div
        className="
          absolute inset-0
          bg-[url('/images/hero-bg.jpg')]
          bg-cover bg-center
          filter blur-sm
          brightness-75
        "
      />

      {/* Contenido sobre el fondo */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
          Título Impactante
        </h1>
        <p className="max-w-2xl text-center">
          Un subtítulo que explique tu propuesta de valor de forma clara y directa.
        </p>
      </div>
    </section>
  );
}
