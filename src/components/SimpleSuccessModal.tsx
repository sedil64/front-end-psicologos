import { createPortal } from 'react-dom';

interface SimpleSuccessModalProps {
  message: string;
  onClose: () => void;
}

export default function SimpleSuccessModal({ message, onClose }: SimpleSuccessModalProps) {
  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
        <h3 className="text-xl font-bold mb-4 text-green-700">¡Éxito!</h3>
        <p className="mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 font-semibold"
        >
          Cerrar
        </button>
      </div>
    </div>,
    document.body
  );
}
