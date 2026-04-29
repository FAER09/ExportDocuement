import { Download } from 'lucide-react';
import { Button } from './ui/button';
import { exportToJSON, exportToPDF } from '../services/exportService';
import type { Profile } from '../types';

interface Props {
  profile: Profile;
  template: 'modern' | 'classic';
}

export function ExportButtons({ profile, template }: Props) {
  const slug = profile.nombre.trim().toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={() => exportToPDF('cv-preview', `${slug}-${template}.pdf`)}>
        <Download size={14} />
        Descargar PDF
      </Button>
      <Button variant="outline" onClick={() => exportToJSON(profile, `${slug}.json`)}>
        <Download size={14} />
        Exportar JSON
      </Button>
    </div>
  );
}
