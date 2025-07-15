import { useState } from 'react';

type UserRole = 'admin' | 'psychologist' | 'patient';

type Props = {
  onSubmit: (form: {
    nombreCompleto: string;
    email: string;
    password: string;
    rol: UserRole;
  }) => Promise<void>;
};

export const RegisterForm: React.FC<Props> = ({ onSubmit }) => {
  const [form, setForm] = useState({
    nombreCompleto: '',
    email: '',
    password: '',
    confirmPassword: '',
    rol: 'patient' as UserRole,
  });

  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'rol' ? (value as UserRole) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden ❌');
      return;
    }

    try {
      await onSubmit({
        nombreCompleto: form.nombreCompleto,
        email: form.email,
        password: form.password,
        rol: form.rol,
      });
    } catch {
      setError('Hubo un error al registrar. Intenta nuevamente.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-50 px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-teal-800 text-center mb-6">Registro de usuario</h2>

        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

        {[
          { id: 'nombreCompleto', label: 'Nombre completo', type: 'text' },
          { id: 'email', label: 'Correo electrónico', type: 'email' },
          { id: 'password', label: 'Contraseña', type: 'password' },
          { id: 'confirmPassword', label: 'Confirmar contraseña', type: 'password' },
        ].map(({ id, label, type }) => (
          <div key={id} className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
            <input
              id={id}
              name={id}
              type={type}
              required
              value={(form as any)[id]}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-teal-500"
              minLength={id.includes('password') ? 6 : undefined}
            />
          </div>
        ))}

        <div className="mb-4">
          <label htmlFor="rol" className="block text-sm font-medium text-gray-700">Rol</label>
          <select
            id="rol"
            name="rol"
            value={form.rol}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-teal-500"
          >
            <option value="patient">Paciente</option>
            <option value="psychologist">Psicólogo</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 transition"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};
