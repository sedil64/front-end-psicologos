import React from 'react';
import { createPortal } from 'react-dom';

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function SuccessModal({
  visible,
  onClose,
  onConfirm,
}: SuccessModalProps) {
  if (!visible) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h3 className="text-xl font-bold mb-4 text-center">
          ¡Registro exitoso!
        </h3>
        <p className="mb-6 text-center">
          Tu cuenta de psicólogo ha sido creada correctamente.
        </p>
        <div className="flex justify-around">
          <button
            onClick={onConfirm}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Ir al Panel
          </button>
          <button
            onClick={onClose}
            className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
