import { ChevronLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { ProfileAvatar } from './ProfileAvatar';
import { useProfileStore } from '../../store/profile-store';

interface Props {
  onAbout: () => void;
}

export function TopBar({ onAbout }: Props) {
  const profiles = useProfileStore((state) => state.profiles);
  const selectedProfileId = useProfileStore((state) => state.selectedProfileId);
  const goBack = useProfileStore((state) => state.goBack);

  const activeProfile = profiles.find((profile) => profile.id === selectedProfileId);
  if (!activeProfile) return null;

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-border bg-background/80 px-4 py-3 backdrop-blur-md md:px-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={onAbout}
        className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground hover:text-foreground"
      >
        about us
      </Button>

      <ProfileAvatar name={activeProfile.nombre} size="sm" />

      <Button
        variant="ghost"
        size="sm"
        onClick={goBack}
        className="gap-1 text-[11px] uppercase tracking-[0.24em] text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft size={12} />
        perfiles
      </Button>
    </header>
  );
}
