import { useForm }         from "react-hook-form";
import { zodResolver }     from "@hookform/resolvers/zod";
import { personalInfoSchema } from "../../schemas/cvSchema";
import { Button }   from "@/components/ui/button";
import { Input }    from "@/components/ui/input";
import { Label }    from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn }       from "@/lib/utils";

const errCls = "text-destructive text-xs mt-1";

interface Props {
  defaultValues?: any;
  onNext: (data: any) => void;
}

export function PersonalInfoForm({ defaultValues, onNext }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-4">
      {/* Nombre */}
      <div className="space-y-1.5">
        <Label htmlFor="fullName">Nombre completo *</Label>
        <Input id="fullName" {...register("fullName")} placeholder="Juan Pérez" />
        {errors.fullName && <p className={errCls}>{errors.fullName.message as string}</p>}
      </div>

      {/* Email + Teléfono */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="email">Correo *</Label>
          <Input id="email" type="email" {...register("email")} placeholder="juan@email.com" />
          {errors.email && <p className={errCls}>{errors.email.message as string}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Número *</Label>
          <Input id="phone" {...register("phone")} placeholder="+52 664 000 0000" />
          {errors.phone && <p className={errCls}>{errors.phone.message as string}</p>}
        </div>
      </div>

      {/* Fecha de nacimiento */}
      <div className="space-y-1.5">
        <Label htmlFor="birthDate">Fecha de nacimiento *</Label>
        <Input id="birthDate" type="date" {...register("birthDate")} />
        {errors.birthDate && <p className={errCls}>{errors.birthDate.message as string}</p>}
      </div>

      {/* Ubicación */}
      <div className="space-y-1.5">
        <Label htmlFor="location">Ubicación (opcional)</Label>
        <Input id="location" {...register("location")} placeholder="Ciudad, País" />
        {errors.location && <p className={errCls}>{errors.location.message as string}</p>}
      </div>

      {/* Resumen */}
      <div className="space-y-1.5">
        <Label htmlFor="summary">Resumen profesional (opcional)</Label>
        <Textarea
          id="summary"
          {...register("summary")}
          rows={3}
          placeholder="Breve descripción profesional..."
          className="resize-none"
        />
        {errors.summary && <p className={errCls}>{errors.summary.message as string}</p>}
      </div>

      <Button type="submit" className="w-full">Siguiente →</Button>
    </form>
  );
}
