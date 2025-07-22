import { z } from 'zod';

export const psychologistRegisterSchema = z.object({
  email: z
    .string({ required_error: 'El correo institucional es obligatorio' })
    .email({ message: 'Formato de correo inválido' }),

  password: z
    .string({ required_error: 'La contraseña es obligatoria' })
    .min(6, { message: 'Debe tener al menos 6 caracteres' }),

  nombres: z.string({ required_error: 'Nombres obligatorios' }),
  apellidos: z.string({ required_error: 'Apellidos obligatorios' }),
  identificacion: z.string({ required_error: 'Identificación obligatoria' }),

  fechaNacimiento: z.string({ required_error: 'Fecha de nacimiento obligatoria' }),

  genero: z.enum(
    ['Masculino', 'Femenino', 'No binario', 'Otro', 'Prefiero no decir'],
    { invalid_type_error: 'Selecciona una opción válida de género' }
  ).optional(),

  telefono: z.string({ required_error: 'Teléfono obligatorio' }),
  telefonoEmergencia: z.string().optional(),

  direccion: z.string().optional(),
  especialidad: z.string({ required_error: 'Especialidad obligatoria' }),

  universidad: z.string().optional(),

  experiencia: z.coerce
    .number()
    .min(0, { message: 'La experiencia debe ser mayor o igual a 0' })
    .optional(),

  certificaciones: z.string().optional(),
});
