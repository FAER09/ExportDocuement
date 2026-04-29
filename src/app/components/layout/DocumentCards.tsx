import { FileText } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { cn } from '../ui/utils';

interface Props {
  onSelect: (template: 'modern' | 'classic') => void;
}

const docs = [
  {
    id: 'modern' as const,
    title: 'Documento Moderno',
    desc: 'Diseño limpio con jerarquía visual marcada.',
    icon: '◈',
  },
  {
    id: 'classic' as const,
    title: 'Documento Clásico',
    desc: 'Estilo formal, sobrio y tipográfico.',
    icon: '◇',
  },
];

export function DocumentCards({ onSelect }: Props) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      {docs.map((doc, index) => (
        <Card
          key={doc.id}
          onClick={() => onSelect(doc.id)}
          className={cn(
            'cursor-pointer border-border/80 bg-card/80 transition-all duration-300',
            index === 0 
              ? 'hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1' 
              : 'hover:border-purple-400 hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-1',
            'focus-within:border-primary',
          )}
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onSelect(doc.id)}
          role="button"
          aria-label={`Seleccionar ${doc.title}`}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl text-muted-foreground">{doc.icon}</span>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium text-foreground">{doc.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{doc.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
