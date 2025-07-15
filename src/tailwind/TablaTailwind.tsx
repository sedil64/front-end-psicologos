// Table.tsx
import React from 'react';

export const TablaTailwind: React.FC = () => {
  return (
    <table className="min-w-full border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2">Nombre</th>
          <th className="border px-4 py-2">Edad</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border px-4 py-2">Juan</td>
          <td className="border px-4 py-2">30</td>
        </tr>
        <tr>
          <td className="border px-4 py-2">Ana</td>
          <td className="border px-4 py-2">25</td>
        </tr>
      </tbody>
    </table>
  );
};