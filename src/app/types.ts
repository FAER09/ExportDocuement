export interface Experience {
  empresa: string;
  puesto: string;
  inicio: string;
  fin: string;
  descripcion: string;
}

export interface Education {
  institucion: string;
  titulo: string;
  inicio: string;
  fin: string;
}

export interface Profile {
  id: string;
  nombre: string;
  correo: string;
  numero: string;
  fechaNacimiento: string;
  experiencia: Experience[];
  educacion: Education[];
  habilidades: {
    tecnicas: string[];
    blandas: string[];
  };
}

export interface ProfileFormValues {
  nombre: string;
  correo: string;
  numero: string;
  fechaNacimiento: string;
  experiencia: Experience[];
  educacion: Education[];
  habilidadesTecnicas: string;
  habilidadesBlandas: string;
}
