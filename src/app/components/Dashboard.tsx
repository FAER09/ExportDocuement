import { DocumentCards } from './layout/DocumentCards';
import { ProfileAvatar } from './layout/ProfileAvatar';
import type { Profile } from '../types';

interface DashboardProps {
  profile: Profile;
  onSelectDocument: (template: 'modern' | 'classic') => void;
}

export function Dashboard({ profile, onSelectDocument }: DashboardProps) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="flex w-full max-w-xl flex-col items-center gap-8">
        <ProfileAvatar name={profile.nombre} size="lg" />
        <div className="space-y-2 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
            hola, {profile.nombre.split(' ')[0]}
          </p>
          <h1 className="tracking-tight">Selecciona un documento</h1>
          <p className="text-sm text-muted-foreground">
            Elige una plantilla para previsualizar tu CV antes de exportarlo.
          </p>
        </div>

        <DocumentCards onSelect={onSelectDocument} />
      </div>
    </div>
  );
}
