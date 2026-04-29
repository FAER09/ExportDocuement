import { useState } from "react";
import { useForm }         from "react-hook-form";
import { zodResolver }     from "@hookform/resolvers/zod";
import { experienceSchema } from "../../schemas/cvSchema";
import { Experience } from "../../types/cv.types";
import { Button }   from "@/components/ui/button";
import { Input }    from "@/components/ui/input";
import { Label }    from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { X }        from "lucide-react";
import { cn }       from "@/lib/utils";

const uid = () => Math.random().toString(36).slice(2, 10);
const errCls = "text-destructive text-xs mt-1";

interface Props {
  defaultValues?: Experience[];
  onNext: (data: Experience[]) => void;
  onBack: () => void;
}

export function ExperienceForm({ defaultValues = [], onNext, onBack }: Props) {
  const [experiences, setExperiences] = useState<Experience[]>(defaultValues);
  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm({
    resolver: zodResolver(experienceSchema),
  });

  const isCurrent = watch("isCurrent");

  const handleAdd = (data: any) => {
    const newExp: Experience = { id: uid(), ...data };
    setExperiences([...experiences, newExp]);
    reset();
  };

  const remove = (id: string) => {
    setExperiences(experiences.filter(e => e.id !== id));
  };

  return (
    <div className="space-y-5">
      {/* Formulario para agregar experiencia */}
      <form onSubmit={handleSubmit(handleAdd)} className="space-y-3 pb-4 border-b border-border">
        <h3 className="text-sm font-medium text-foreground">Agregar experiencia</h3>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="company">Empresa *</Label>
            <Input id="company" {...register("company")} placeholder="Acme Inc." />
            {errors.company && <p className={errCls}>{errors.company.message as string}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="position">Puesto *</Label>
            <Input id="position" {...register("position")} placeholder="Desarrollador Senior" />
            {errors.position && <p className={errCls}>{errors.position.message as string}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="startDate">Fecha inicio *</Label>
            <Input id="startDate" type="date" {...register("startDate")} />
            {errors.startDate && <p className={errCls}>{errors.startDate.message as string}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="endDate">Fecha fin</Label>
            <Input id="endDate" type="date" {...register("endDate")} disabled={isCurrent} />
            {errors.endDate && <p className={errCls}>{errors.endDate.message as string}</p>}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("isCurrent")} className="rounded" />
            <span>Trabajo actual</span>
          </label>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="description">Descripción (opcional)</Label>
          <Textarea
            id="description"
            {...register("description")}
            rows={2}
            placeholder="Responsabilidades principales..."
            className="resize-none"
          />
          {errors.description && <p className={errCls}>{errors.description.message as string}</p>}
        </div>

        <Button type="submit" variant="secondary" className="w-full">+ Agregar experiencia</Button>
      </form>

      {/* Lista de experiencias agregadas */}
      {experiences.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Experiencias agregadas ({experiences.length})</p>
          {experiences.map(exp => (
            <div key={exp.id} className="flex items-start justify-between gap-3 p-3 rounded-md bg-secondary">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm">{exp.position}</p>
                <p className="text-muted-foreground text-xs">{exp.company}</p>
                <p className="text-muted-foreground text-xs mt-0.5">
                  {exp.startDate} {exp.endDate ? `— ${exp.endDate}` : "— Presente"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => remove(exp.id)}
                className="text-muted-foreground hover:text-destructive transition"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Navegación */}
      <Separator />
      <div className="flex gap-3">
        <Button type="button" variant="outline" className="flex-1" onClick={onBack}>
          ← Atrás
        </Button>
        <Button type="button" className="flex-1" onClick={() => onNext(experiences)}>
          Siguiente →
        </Button>
      </div>
    </div>
  );
}
