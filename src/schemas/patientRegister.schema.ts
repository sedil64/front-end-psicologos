import { z } from 'zod';

export const patientRegisterSchema = z.object({
  email: z
    .string({ required_error: 'El correo es obligatorio' })
    .email({ message: 'Formato de correo inválido' }),

  password: z
    .string({ required_error: 'La contraseña es obligatoria' })
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),

  nombres: z.string({ required_error: 'Los nombres son obligatorios' }),
  apellidos: z.string({ required_error: 'Los apellidos son obligatorios' }),
  identificacion: z.string({ required_error: 'La identificación es obligatoria' }),

  fechaNacimiento: z.string({ required_error: 'La fecha de nacimiento es obligatoria' }),

  genero: z
    .enum([
      'Masculino',
      'Femenino',
      'No binario',
      'Otro',
      'Prefiero no decir',
    ])
    .optional(),

  telefono: z.string({ required_error: 'El teléfono es obligatorio' }),
  telefonoEmergencia: z.string().optional(),

  correoElectronico: z
    .string({ required_error: 'El correo personal es obligatorio' })
    .email({ message: 'Formato inválido de correo personal' }),

  direccion: z.string().optional(),

  edad: z.coerce
    .number({ required_error: 'La edad es obligatoria' })
    .int({ message: 'Debe ser un número entero' })
    .positive({ message: 'Debe ser un número positivo' }),

  antecedentesClinicos: z.string().optional(),

  activo: z.boolean().optional(),
});
