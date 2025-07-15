// src/types/index.ts
export interface Psicologo {
  id: number;
  nombres: string;
  apellidos: string;
  especialidad: string;
  // si quieres puedes añadir más campos: licencia, universidad, etc.
}

export interface Cita {
  id: number;
  nombreCliente: string;
  fecha: string; // ISO
  hora: string;
  estado: 'pendiente' | 'confirmada' | 'cancelada';
  psicologo: Psicologo;
  pacienteId: number;
}
