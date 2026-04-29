import { useState } from "react";
import { useForm }         from "react-hook-form";
import { zodResolver }     from "@hookform/resolvers/zod";
import { educationSchema } from "../../schemas/cvSchema";
import { Education } from "../../types/cv.types";
import { Button }   from "@/components/ui/button";
import { Input }    from "@/components/ui/input";
import { Label }    from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { X }        from "lucide-react";

const uid = () => Math.random().toString(36).slice(2, 10);
const errCls = "text-destructive text-xs mt-1";

interface Props {
  defaultValues?: Education[];
  onNext: (data: Education[]) => void;
  onBack: () => void;
}

export function EducationForm({ defaultValues = [], onNext, onBack }: Props) {
  const [educations, setEducations] = useState<Education[]>(defaultValues);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(educationSchema),
  });

  const handleAdd = (data: any) => {
    const newEdu: Education = { id: uid(), ...data };
    setEducations([...educations, newEdu]);
    reset();
  };

  const remove = (id: string) => {
    setEducations(educations.filter(e => e.id !== id));
  };

  return (
    <div className="space-y-5">
      {/* Formulario para agregar educación */}
      <form onSubmit={handleSubmit(handleAdd)} className="space-y-3 pb-4 border-b border-border">
        <h3 className="text-sm font-medium text-foreground">Agregar educación</h3>

        <div className="space-y-1.5">
          <Label htmlFor="institution">Institución *</Label>
          <Input id="institution" {...register("institution")} placeholder="Universidad Nacional" />
          {errors.institution && <p className={errCls}>{errors.institution.message as string}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="degree">Título *</Label>
          <Input id="degree" {...register("degree")} placeholder="Licenciatura en Informática" />
          {errors.degree && <p className={errCls}>{errors.degree.message as string}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="graduationDate">Fecha de graduación *</Label>
          <Input id="graduationDate" type="date" {...register("graduationDate")} />
          {errors.graduationDate && <p className={errCls}>{errors.graduationDate.message as string}</p>}
        </div>

        <Button type="submit" variant="secondary" className="w-full">+ Agregar educación</Button>
      </form>

      {/* Lista de educaciones agregadas */}
      {educations.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Educación agregada ({educations.length})</p>
          {educations.map(edu => (
            <div key={edu.id} className="flex items-start justify-between gap-3 p-3 rounded-md bg-secondary">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm">{edu.degree}</p>
                <p className="text-muted-foreground text-xs">{edu.institution}</p>
                <p className="text-muted-foreground text-xs mt-0.5">{edu.graduationDate}</p>
              </div>
              <button
                type="button"
                onClick={() => remove(edu.id)}
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
        <Button type="button" className="flex-1" onClick={() => onNext(educations)}>
          Siguiente →
        </Button>
      </div>
    </div>
  );
}
