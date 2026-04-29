import { Plus } from 'lucide-react';
import { useProfileStore } from '../store/profile-store';

export function ProfileSelector() {
  const profiles = useProfileStore((state) => state.profiles);
  const selectProfile = useProfileStore((state) => state.selectProfile);
  const openForm = useProfileStore((state) => state.openForm);

  return (
    <div className="size-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-12">
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-light tracking-[0.24em] text-foreground">CVEX</h1>
          <p className="text-muted-foreground">Selecciona un perfil o crea uno nuevo para comenzar</p>
        </div>

        <div className="flex items-center gap-8">
          {profiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => selectProfile(profile.id)}
              className="flex flex-col items-center gap-3 group"
            >
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-blue-600 group-hover:shadow-lg group-hover:shadow-blue-500/20">
                <span className="text-primary-foreground uppercase tracking-wider">
                  {profile.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </span>
              </div>
              <span className="text-sm opacity-60 group-hover:opacity-100 group-hover:text-blue-600 transition-all font-medium">
                {profile.nombre}
              </span>
            </button>
          ))}

          <button
            onClick={openForm}
            className="flex flex-col items-center gap-3 group"
          >
            <div className="w-20 h-20 rounded-full border-2 border-border flex items-center justify-center transition-all group-hover:border-purple-500 group-hover:bg-purple-50/50 dark:group-hover:bg-purple-950/10 group-hover:shadow-lg group-hover:shadow-purple-500/10">
              <Plus className="w-8 h-8 text-muted-foreground group-hover:text-purple-600 transition-colors" />
            </div>
            <span className="text-sm opacity-60 group-hover:opacity-100 group-hover:text-purple-600 transition-all font-medium">
              Nuevo
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
