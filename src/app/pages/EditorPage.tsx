import { ArrowLeft } from 'lucide-react';
import { ExportButtons } from '../components/ExportButtons';
import { ClassicTemplate } from '../components/preview/ClassicTemplate';
import { ModernTemplate } from '../components/preview/ModernTemplate';
import { Button } from '../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import type { Profile } from '../types';

interface Props {
  profile: Profile;
  template: 'modern' | 'classic';
  onTemplateChange: (template: 'modern' | 'classic') => void;
  onBack: () => void;
}

export function EditorPage({ profile, template, onTemplateChange, onBack }: Props) {
  return (
    <div className="min-h-screen bg-background px-4 py-6 md:px-6">
      <div className="mx-auto mb-6 flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-1 text-muted-foreground">
          <ArrowLeft size={14} />
          volver
        </Button>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <Select value={template} onValueChange={(value) => onTemplateChange(value as 'modern' | 'classic')}>
            <SelectTrigger className="h-8 w-full text-xs md:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="modern">Moderno</SelectItem>
              <SelectItem value="classic">Clásico</SelectItem>
            </SelectContent>
          </Select>
          <ExportButtons profile={profile} template={template} />
        </div>
      </div>

      <Separator className="mx-auto mb-6 max-w-6xl" />

      <div className="mx-auto max-w-6xl overflow-auto rounded-xl border border-border bg-muted/20 p-3 md:p-6">
        {template === 'modern' ? <ModernTemplate profile={profile} /> : <ClassicTemplate profile={profile} />}
      </div>
    </div>
  );
}
