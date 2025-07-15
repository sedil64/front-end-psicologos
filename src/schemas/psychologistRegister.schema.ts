import { z } from 'zod';

export const psychologistRegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  nombres: z.string(),
  apellidos: z.string(),
  identificacion: z.string(),
  fechaNacimiento: z.string(),
  genero: z.enum(['MASCULINO', 'FEMENINO', 'OTRO']).optional(),
  telefono: z.string(),
  telefonoEmergencia: z.string().optional(),
  correoElectronico: z.string(),
  direccion: z.string().optional(),
  licencia: z.string(),
  especialidad: z.string(),
  universidad: z.string().optional(),
  experiencia: z.coerce.number().optional(),
  certificaciones: z.string().optional(),
});
