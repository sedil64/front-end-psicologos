// Input.tsx
import React from 'react';

export const InputTailwind: React.FC = () => {
  return (
    <input
      type="text"
      placeholder="Escribe aquí..."
      className="border border-gray-300 px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};