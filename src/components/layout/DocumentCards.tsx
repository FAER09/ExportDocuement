import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props {
  onSelect: (template: "modern" | "classic") => void;
}

const docs = [
  { id: "modern"  as const, title: "Documento Moderno",  desc: "Diseño limpio con acento de color", icon: "◈" },
  { id: "classic" as const, title: "Documento Clásico",  desc: "Estilo formal tipográfico",          icon: "◇" },
];

export function DocumentCards({ onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      {docs.map(doc => (
        <Card
          key={doc.id}
          onClick={() => onSelect(doc.id)}
          className={cn(
            "cursor-pointer transition-all duration-200",
            "hover:border-primary hover:shadow-md",
            "focus-within:border-primary"
          )}
          tabIndex={0}
          onKeyDown={e => e.key === "Enter" && onSelect(doc.id)}
          role="button"
          aria-label={`Seleccionar ${doc.title}`}
        >
          <CardHeader className="pb-2">
            <span className="text-2xl text-muted-foreground">{doc.icon}</span>
          </CardHeader>
          <CardContent>
            <p className="text-foreground text-sm font-medium">{doc.title}</p>
            <p className="text-muted-foreground text-xs mt-0.5">{doc.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
