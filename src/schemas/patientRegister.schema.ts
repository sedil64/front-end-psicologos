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

  fechaNacimiento: z
    .string({ required_error: 'La fecha de nacimiento es obligatoria' })
    .refine(val => !isNaN(Date.parse(val)), {
      message: 'Formato de fecha inválido',
    }),

  genero: z
    .enum(['Masculino', 'Femenino', 'No binario', 'Otro', 'Prefiero no decir'])
    .optional(),

  telefono: z.string({ required_error: 'El teléfono es obligatorio' }),
  telefonoEmergencia: z.string().optional(),
  direccion: z.string().optional(),

});
