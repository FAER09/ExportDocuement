import { z } from 'zod';
import type { Profile, ProfileFormValues } from '../types';

const requiredText = (label: string) =>
  z.string().trim().min(1, `El campo ${label} es obligatorio.`);

const optionalDateRangeMessage = 'La fecha de fin no puede ser anterior a la de inicio.';

const experienceSchema = z
  .object({
    empresa: z.string().trim(),
    puesto: z.string().trim(),
    inicio: z.string().trim(),
    fin: z.string().trim(),
    descripcion: z.string().trim(),
  })
  .superRefine((value, ctx) => {
    const hasContent = Object.values(value).some(Boolean);
    if (!hasContent) return;

    if (!value.empresa) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['empresa'], message: 'Ingresa la empresa.' });
    }
    if (!value.puesto) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['puesto'], message: 'Ingresa el puesto.' });
    }
    if (!value.inicio) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['inicio'], message: 'Ingresa la fecha de inicio.' });
    }
    if (!value.fin) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['fin'], message: 'Ingresa la fecha de fin.' });
    }
    if (value.inicio && value.fin && value.fin < value.inicio) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['fin'], message: optionalDateRangeMessage });
    }
  });

const educationSchema = z
  .object({
    institucion: z.string().trim(),
    titulo: z.string().trim(),
    inicio: z.string().trim(),
    fin: z.string().trim(),
  })
  .superRefine((value, ctx) => {
    const hasContent = Object.values(value).some(Boolean);
    if (!hasContent) return;

    if (!value.institucion) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['institucion'],
        message: 'Ingresa la institucion.',
      });
    }
    if (!value.titulo) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['titulo'], message: 'Ingresa el titulo o grado.' });
    }
    if (!value.inicio) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['inicio'], message: 'Ingresa la fecha de inicio.' });
    }
    if (!value.fin) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['fin'], message: 'Ingresa la fecha de fin.' });
    }
    if (value.inicio && value.fin && value.fin < value.inicio) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['fin'], message: optionalDateRangeMessage });
    }
  });

export const profileFormSchema = z.object({
  nombre: requiredText('nombre completo'),
  correo: z.email('Ingresa un correo electronico valido.'),
  numero: z
    .string()
    .trim()
    .min(8, 'Ingresa un numero de telefono valido.')
    .regex(/^[0-9+\-\s()]+$/, 'El telefono solo puede contener numeros y simbolos comunes.'),
  fechaNacimiento: z
    .string()
    .min(1, 'Ingresa la fecha de nacimiento.')
    .refine((value) => value <= new Date().toISOString().split('T')[0], {
      message: 'La fecha de nacimiento no puede estar en el futuro.',
    }),
  experiencia: z.array(experienceSchema),
  educacion: z.array(educationSchema),
  habilidadesTecnicas: z.string().trim(),
  habilidadesBlandas: z.string().trim(),
})
  .superRefine((value, ctx) => {
    const tecnicas = parseSkills(value.habilidadesTecnicas);
    const blandas = parseSkills(value.habilidadesBlandas);

    if (tecnicas.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['habilidadesTecnicas'],
        message: 'Agrega al menos una habilidad tecnica.',
      });
    }

    if (blandas.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['habilidadesBlandas'],
        message: 'Agrega al menos una habilidad blanda.',
      });
    }
  });

export function createProfileFromValues(values: ProfileFormValues): Profile {
  const parsed = profileFormSchema.parse(values);

  return {
    id: crypto.randomUUID(),
    nombre: parsed.nombre.trim(),
    correo: parsed.correo.trim(),
    numero: parsed.numero.trim(),
    fechaNacimiento: parsed.fechaNacimiento,
    experiencia: parsed.experiencia.filter((item) => Object.values(item).some(Boolean)),
    educacion: parsed.educacion.filter((item) => Object.values(item).some(Boolean)),
    habilidades: {
      tecnicas: parseSkills(parsed.habilidadesTecnicas),
      blandas: parseSkills(parsed.habilidadesBlandas),
    },
  };
}

function parseSkills(value: string) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}
