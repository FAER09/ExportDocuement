import { useState } from 'react';
import { toast } from 'react-toastify';
import { X, Plus, Minus } from 'lucide-react';
import { createProfileFromValues, profileFormSchema } from '../schemas/profile';
import { useProfileStore } from '../store/profile-store';
import type { Education, Experience, ProfileFormValues } from '../types';

const emptyExperience: Experience = {
  empresa: '',
  puesto: '',
  inicio: '',
  fin: '',
  descripcion: '',
};

const emptyEducation: Education = {
  institucion: '',
  titulo: '',
  inicio: '',
  fin: '',
};

type ErrorMap = Record<string, string>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-sm text-destructive">{message}</p>;
}

export function ProfileForm() {
  const addProfile = useProfileStore((state) => state.addProfile);
  const closeForm = useProfileStore((state) => state.closeForm);

  const [values, setValues] = useState<ProfileFormValues>({
    nombre: '',
    correo: '',
    numero: '',
    fechaNacimiento: '',
    experiencia: [{ ...emptyExperience }],
    educacion: [{ ...emptyEducation }],
    habilidadesTecnicas: '',
    habilidadesBlandas: '',
  });
  const [errors, setErrors] = useState<ErrorMap>({});

  const setFieldValue = <K extends keyof ProfileFormValues>(field: K, value: ProfileFormValues[K]) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const getError = (path: string) => errors[path];

  const buildErrors = (issues: { path: (string | number)[]; message: string }[]) =>
    issues.reduce<ErrorMap>((acc, issue) => {
      const key = issue.path.join('.');
      if (!acc[key]) acc[key] = issue.message;
      return acc;
    }, {});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = profileFormSchema.safeParse(values);
    if (!result.success) {
      setErrors(buildErrors(result.error.issues));
      toast.error('Revisa los campos marcados antes de continuar.');
      return;
    }

    setErrors({});
    addProfile(createProfileFromValues(values));
    toast.success('Perfil creado correctamente.');
  };

  const addExperiencia = () => {
    setValues((current) => ({
      ...current,
      experiencia: [...current.experiencia, { ...emptyExperience }],
    }));
  };

  const removeExperiencia = (index: number) => {
    setValues((current) => ({
      ...current,
      experiencia: current.experiencia.filter((_, i) => i !== index),
    }));
  };

  const updateExperiencia = (index: number, field: keyof Experience, value: string) => {
    setValues((current) => ({
      ...current,
      experiencia: current.experiencia.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const addEducacion = () => {
    setValues((current) => ({
      ...current,
      educacion: [...current.educacion, { ...emptyEducation }],
    }));
  };

  const removeEducacion = (index: number) => {
    setValues((current) => ({
      ...current,
      educacion: current.educacion.filter((_, i) => i !== index),
    }));
  };

  const updateEducacion = (index: number, field: keyof Education, value: string) => {
    setValues((current) => ({
      ...current,
      educacion: current.educacion.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  return (
    <div className="size-full overflow-y-auto">
      <div className="mx-auto max-w-2xl p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1>Nuevo perfil</h1>
          <button onClick={closeForm} className="rounded-lg p-2 transition-colors hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          <section className="space-y-4">
            <h2>Datos personales</h2>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={values.nombre}
                  onChange={(e) => setFieldValue('nombre', e.target.value)}
                  className="w-full rounded-lg bg-input-background px-4 py-3 outline-none focus:ring-2 ring-ring"
                />
                <FieldError message={getError('nombre')} />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Correo electronico"
                  value={values.correo}
                  onChange={(e) => setFieldValue('correo', e.target.value)}
                  className="w-full rounded-lg bg-input-background px-4 py-3 outline-none focus:ring-2 ring-ring"
                />
                <FieldError message={getError('correo')} />
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Numero de telefono"
                  value={values.numero}
                  onChange={(e) => setFieldValue('numero', e.target.value)}
                  className="w-full rounded-lg bg-input-background px-4 py-3 outline-none focus:ring-2 ring-ring"
                />
                <FieldError message={getError('numero')} />
              </div>

              <div>
                <input
                  type="date"
                  value={values.fechaNacimiento}
                  onChange={(e) => setFieldValue('fechaNacimiento', e.target.value)}
                  className="w-full rounded-lg bg-input-background px-4 py-3 outline-none focus:ring-2 ring-ring"
                />
                <FieldError message={getError('fechaNacimiento')} />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2>Experiencia laboral</h2>
              <button
                type="button"
                onClick={addExperiencia}
                className="rounded-lg p-2 transition-colors hover:bg-muted"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-6">
              {values.experiencia.map((exp, index) => (
                <div key={index} className="relative space-y-3 rounded-lg bg-muted/30 p-4">
                  {values.experiencia.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExperiencia(index)}
                      className="absolute right-2 top-2 rounded p-1 transition-colors hover:bg-background"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                  )}
                  <div>
                    <input
                      type="text"
                      placeholder="Empresa"
                      value={exp.empresa}
                      onChange={(e) => updateExperiencia(index, 'empresa', e.target.value)}
                      className="w-full rounded-lg bg-background px-4 py-2 outline-none focus:ring-2 ring-ring"
                    />
                    <FieldError message={getError(`experiencia.${index}.empresa`)} />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Puesto"
                      value={exp.puesto}
                      onChange={(e) => updateExperiencia(index, 'puesto', e.target.value)}
                      className="w-full rounded-lg bg-background px-4 py-2 outline-none focus:ring-2 ring-ring"
                    />
                    <FieldError message={getError(`experiencia.${index}.puesto`)} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input
                        type="date"
                        value={exp.inicio}
                        onChange={(e) => updateExperiencia(index, 'inicio', e.target.value)}
                        className="w-full rounded-lg bg-background px-4 py-2 outline-none focus:ring-2 ring-ring"
                      />
                      <FieldError message={getError(`experiencia.${index}.inicio`)} />
                    </div>
                    <div>
                      <input
                        type="date"
                        value={exp.fin}
                        onChange={(e) => updateExperiencia(index, 'fin', e.target.value)}
                        className="w-full rounded-lg bg-background px-4 py-2 outline-none focus:ring-2 ring-ring"
                      />
                      <FieldError message={getError(`experiencia.${index}.fin`)} />
                    </div>
                  </div>
                  <div>
                    <textarea
                      placeholder="Descripcion del puesto"
                      value={exp.descripcion}
                      onChange={(e) => updateExperiencia(index, 'descripcion', e.target.value)}
                      rows={3}
                      className="w-full resize-none rounded-lg bg-background px-4 py-2 outline-none focus:ring-2 ring-ring"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2>Educacion</h2>
              <button
                type="button"
                onClick={addEducacion}
                className="rounded-lg p-2 transition-colors hover:bg-muted"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-6">
              {values.educacion.map((edu, index) => (
                <div key={index} className="relative space-y-3 rounded-lg bg-muted/30 p-4">
                  {values.educacion.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEducacion(index)}
                      className="absolute right-2 top-2 rounded p-1 transition-colors hover:bg-background"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                  )}
                  <div>
                    <input
                      type="text"
                      placeholder="Institucion"
                      value={edu.institucion}
                      onChange={(e) => updateEducacion(index, 'institucion', e.target.value)}
                      className="w-full rounded-lg bg-background px-4 py-2 outline-none focus:ring-2 ring-ring"
                    />
                    <FieldError message={getError(`educacion.${index}.institucion`)} />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Titulo o grado"
                      value={edu.titulo}
                      onChange={(e) => updateEducacion(index, 'titulo', e.target.value)}
                      className="w-full rounded-lg bg-background px-4 py-2 outline-none focus:ring-2 ring-ring"
                    />
                    <FieldError message={getError(`educacion.${index}.titulo`)} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input
                        type="date"
                        value={edu.inicio}
                        onChange={(e) => updateEducacion(index, 'inicio', e.target.value)}
                        className="w-full rounded-lg bg-background px-4 py-2 outline-none focus:ring-2 ring-ring"
                      />
                      <FieldError message={getError(`educacion.${index}.inicio`)} />
                    </div>
                    <div>
                      <input
                        type="date"
                        value={edu.fin}
                        onChange={(e) => updateEducacion(index, 'fin', e.target.value)}
                        className="w-full rounded-lg bg-background px-4 py-2 outline-none focus:ring-2 ring-ring"
                      />
                      <FieldError message={getError(`educacion.${index}.fin`)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2>Habilidades</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-muted-foreground">
                  Habilidades tecnicas (separadas por comas)
                </label>
                <textarea
                  placeholder="JavaScript, React, TypeScript..."
                  value={values.habilidadesTecnicas}
                  onChange={(e) => setFieldValue('habilidadesTecnicas', e.target.value)}
                  rows={3}
                  className="w-full resize-none rounded-lg bg-input-background px-4 py-3 outline-none focus:ring-2 ring-ring"
                />
                <FieldError message={getError('habilidadesTecnicas')} />
              </div>
              <div>
                <label className="mb-2 block text-sm text-muted-foreground">
                  Habilidades blandas (separadas por comas)
                </label>
                <textarea
                  placeholder="Trabajo en equipo, Liderazgo, Comunicacion..."
                  value={values.habilidadesBlandas}
                  onChange={(e) => setFieldValue('habilidadesBlandas', e.target.value)}
                  rows={3}
                  className="w-full resize-none rounded-lg bg-input-background px-4 py-3 outline-none focus:ring-2 ring-ring"
                />
                <FieldError message={getError('habilidadesBlandas')} />
              </div>
            </div>
          </section>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={closeForm}
              className="flex-1 rounded-lg bg-muted px-6 py-3 transition-colors hover:bg-muted/80"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-primary px-6 py-3 text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Crear perfil
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
