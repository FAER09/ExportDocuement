import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName:  z.string().min(3, "Mínimo 3 caracteres"),
  email:     z.string().email("Email inválido"),
  phone:     z.string().min(7, "Teléfono inválido"),
  birthDate: z.string().min(1, "Fecha de nacimiento requerida"),
  location:  z.string().optional(),
  summary:   z.string().max(500, "Máximo 500 caracteres").optional(),
});

export const experienceSchema = z.object({
  company:     z.string().min(2, "Requerido"),
  position:    z.string().min(2, "Requerido"),
  startDate:   z.string().min(1, "Requerido"),
  endDate:     z.string().optional(),
  isCurrent:   z.boolean(),
  description: z.string().max(500).optional(),
});

export const educationSchema = z.object({
  institution:    z.string().min(2, "Requerido"),
  degree:         z.string().min(2, "Requerido"),
  graduationDate: z.string().min(1, "Requerido"),
});
