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

export interface Paciente {
  id: number;
  nombres: string;
  apellidos: string;
  identificacion: string;
  fechaNacimiento: string; 
  genero?: 'MASCULINO' | 'FEMENINO' | 'OTRO';
  telefono: string;
  telefonoEmergencia?: string;
  correoElectronico: string;
  direccion?: string;
  antecedentesClinicos?: string;
  activo: boolean;
}

