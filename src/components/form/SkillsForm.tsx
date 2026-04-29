import { useState }   from "react";
import { X }          from "lucide-react";
import { Button }     from "@/components/ui/button";
import { Input }      from "@/components/ui/input";
import { Badge }      from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator }  from "@/components/ui/separator";
import { Skill }      from "../../types/cv.types";

const uid = () => Math.random().toString(36).slice(2, 10);

interface Props {
  defaultValues?: Skill[];
  onBack: () => void;
  onFinish: (skills: Skill[]) => void;
}

export function SkillsForm({ defaultValues = [], onBack, onFinish }: Props) {
  const [skills, setSkills] = useState<Skill[]>(defaultValues);
  const [input, setInput]   = useState("");
  const [type, setType]     = useState<"technical" | "soft">("technical");

  const add = () => {
    const name = input.trim();
    if (!name) return;
    setSkills(prev => [...prev, { id: uid(), name, type }]);
    setInput("");
  };

  const remove = (id: string) => setSkills(prev => prev.filter(s => s.id !== id));

  const tech = skills.filter(s => s.type === "technical");
  const soft = skills.filter(s => s.type === "soft");

  return (
    <div className="space-y-5">
      {/* Input para agregar habilidad */}
      <div className="flex gap-2">
        {/* Radix Select para tipo */}
        <Select value={type} onValueChange={v => setType(v as "technical" | "soft")}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="technical">Técnica</SelectItem>
            <SelectItem value="soft">Blanda</SelectItem>
          </SelectContent>
        </Select>

        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && (e.preventDefault(), add())}
          placeholder="ej. React, Comunicación..."
          className="flex-1"
        />
        <Button type="button" variant="outline" onClick={add}>+</Button>
      </div>

      {/* Skills técnicas */}
      {tech.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Técnicas</p>
          <div className="flex flex-wrap gap-2">
            {tech.map(s => (
              <Badge key={s.id} variant="secondary"
                className="gap-1 pl-3 cursor-default">
                {s.name}
                <button type="button" onClick={() => remove(s.id)}
                  className="hover:text-foreground transition">
                  <X size={11} />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Skills blandas */}
      {soft.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Blandas</p>
          <div className="flex flex-wrap gap-2">
            {soft.map(s => (
              <Badge key={s.id} variant="outline"
                className="gap-1 pl-3 cursor-default">
                {s.name}
                <button type="button" onClick={() => remove(s.id)}
                  className="hover:text-foreground transition">
                  <X size={11} />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Navegación */}
      <Separator />
      <div className="flex gap-3">
        <Button type="button" variant="outline" className="flex-1" onClick={onBack}>
          ← Atrás
        </Button>
        <Button type="button" className="flex-1" onClick={() => onFinish(skills)}>
          Guardar perfil ✓
        </Button>
      </div>
    </div>
  );
}
