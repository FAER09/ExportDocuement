import { useState }    from "react";
import { useProfiles } from "../context/ProfilesContext";
import { FormStepper } from "../components/form/FormStepper";
import { ProfileAvatar } from "../components/layout/ProfileAvatar";
import { DocumentCards } from "../components/layout/DocumentCards";
import { Button }      from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { CVData }      from "../types/cv.types";
import { Plus }        from "lucide-react";

interface Props {
  onDocSelect: (template: "modern" | "classic") => void;
}

export function WelcomePage({ onDocSelect }: Props) {
  const { profiles, activeProfileId, activeProfile, selectProfile, createProfile } = useProfiles();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleNewProfile = (cvData: CVData) => {
    const p = createProfile(cvData);
    setDialogOpen(false);
    selectProfile(p.id);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">

      {/* ── Sin perfil activo ── */}
      {!activeProfileId && (
        <div className="flex flex-col items-center gap-10 w-full max-w-md">
          {/* Título */}
          <div className="text-center">
            <h1 className="text-3xl font-light text-foreground tracking-widest">cv generator</h1>
            <p className="text-muted-foreground text-xs mt-2 tracking-wider uppercase">
              selecciona o crea un perfil
            </p>
          </div>

          {/* Lista de perfiles — círculos centrados */}
          {profiles.length > 0 && (
            <div className="flex flex-wrap justify-center gap-6">
              {profiles.map(p => (
                <button key={p.id} onClick={() => selectProfile(p.id)}
                  className="flex flex-col items-center gap-2 group outline-none">
                  <ProfileAvatar
                    name={p.cvData.personalInfo.fullName}
                    size="lg"
                    className="group-hover:ring-2 group-hover:ring-primary transition-all group-focus-visible:ring-2 group-focus-visible:ring-primary"
                  />
                  <span className="text-muted-foreground text-xs group-hover:text-foreground transition">
                    {p.cvData.personalInfo.fullName.split(" ")[0]}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Botón nuevo perfil */}
          <Button variant="outline" onClick={() => setDialogOpen(true)}
            className="rounded-full gap-2">
            <Plus size={14} />
            Nuevo perfil
          </Button>
        </div>
      )}

      {/* ── Perfil activo: DocumentCards ── */}
      {activeProfileId && activeProfile && (
        <div className="flex flex-col items-center gap-8 w-full max-w-sm">
          <p className="text-muted-foreground text-xs tracking-wider uppercase">
            hola, {activeProfile.cvData.personalInfo.fullName.split(" ")[0]}
          </p>
          <DocumentCards onSelect={onDocSelect} />
        </div>
      )}

      {/* ── Dialog: Formulario de nuevo perfil (Radix Dialog) ── */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-light tracking-wide text-foreground">
              nuevo perfil
            </DialogTitle>
          </DialogHeader>
          <FormStepper onComplete={handleNewProfile} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
