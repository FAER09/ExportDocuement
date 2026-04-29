import { ArrowLeft } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';

interface Props {
  onBack: () => void;
}

const stack = [
  'React 18',
  'TypeScript',
  'Vite 6',
  'Tailwind CSS 4',
  'shadcn/ui',
  'Radix UI',
  'Zod',
  'Zustand',
  'react-toastify',
  'html2pdf.js',
];

export function AboutPage({ onBack }: Props) {
  return (
    <div className="min-h-screen bg-background px-4 py-8 md:px-8">
      <div className="mx-auto max-w-2xl">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="mb-8 -ml-2 gap-1 text-muted-foreground"
        >
          <ArrowLeft size={14} />
          volver
        </Button>

        <h1 className="mb-1 text-3xl font-light tracking-[0.24em] text-foreground">CVEX - CV Exportation</h1>
        <p className="mb-8 text-sm text-muted-foreground">
          Crea y exporta CVs profesionales en PDF y JSON.
        </p>

        <p className="mb-3 text-xs uppercase tracking-[0.24em] text-muted-foreground">Equipo</p>
        <div className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-2">
          <Card className="bg-blue-50/50 dark:bg-blue-950/10">
            <CardContent className="pt-4">
              <p className="text-sm font-medium text-foreground">Echavarria Contreras Ramon Fernando</p>
              <p className="mt-0.5 text-xs text-muted-foreground">Lic. en Sistemas Computacionales UABC</p>
            </CardContent>
          </Card>
          <Card className="bg-purple-50/50 dark:bg-purple-950/10">
            <CardContent className="pt-4">
              <p className="text-sm font-medium text-foreground">Lopez Leon Ivan Alexandro</p>
              <p className="mt-0.5 text-xs text-muted-foreground">Lic. en Sistemas Computacionales UABC</p>
            </CardContent>
          </Card>
        </div>

        <Separator className="mb-8" />

        <p className="mb-3 text-xs uppercase tracking-[0.24em] text-muted-foreground">Stack</p>
        <div className="mb-8 flex flex-wrap gap-2">
          {stack.map((item) => (
            <Badge key={item} variant="outline">
              {item}
            </Badge>
          ))}
        </div>

        <p className="mb-3 text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Funcionalidades
        </p>
        <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
          <li>Multi perfil dentro de la misma sesión</li>
          <li>Formulario validado con Zod</li>
          <li>Selección de template moderno o clásico</li>
          <li>Vista previa del CV antes de exportar</li>
          <li>Exportación a PDF y JSON</li>
        </ul>
      </div>
    </div>
  );
}
