import { createContext, useContext, useState, ReactNode } from "react";
import { Profile, CVData } from "../types/cv.types";

const uid = () => Math.random().toString(36).slice(2, 10);

interface ProfilesContextType {
  profiles: Profile[];
  activeProfileId: string | null;
  activeProfile: Profile | null;
  selectProfile: (id: string) => void;
  clearSelection: () => void;
  createProfile: (cvData: CVData) => Profile;
  updateActiveCV: (data: Partial<CVData>) => void;
  deleteProfile: (id: string) => void;
}

const ProfilesContext = createContext<ProfilesContextType | null>(null);

function loadProfiles(): Profile[] {
  try {
    const raw = localStorage.getItem("cv-profiles");
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveProfiles(profiles: Profile[]) {
  localStorage.setItem("cv-profiles", JSON.stringify(profiles));
}

export function ProfilesProvider({ children }: { children: ReactNode }) {
  const [profiles, setProfiles] = useState<Profile[]>(loadProfiles);
  const [activeProfileId, setActiveProfileId] = useState<string | null>(null);

  const activeProfile = profiles.find(p => p.id === activeProfileId) ?? null;

  const selectProfile  = (id: string) => setActiveProfileId(id);
  const clearSelection = () => setActiveProfileId(null);

  const createProfile = (cvData: CVData): Profile => {
    const p: Profile = { id: uid(), createdAt: new Date().toISOString(), cvData };
    const updated = [...profiles, p];
    setProfiles(updated);
    saveProfiles(updated);
    return p;
  };

  const updateActiveCV = (data: Partial<CVData>) => {
    if (!activeProfileId) return;
    const updated = profiles.map(p =>
      p.id === activeProfileId ? { ...p, cvData: { ...p.cvData, ...data } } : p
    );
    setProfiles(updated);
    saveProfiles(updated);
  };

  const deleteProfile = (id: string) => {
    const updated = profiles.filter(p => p.id !== id);
    setProfiles(updated);
    saveProfiles(updated);
    if (activeProfileId === id) setActiveProfileId(null);
  };

  return (
    <ProfilesContext.Provider value={{
      profiles, activeProfileId, activeProfile,
      selectProfile, clearSelection,
      createProfile, updateActiveCV, deleteProfile,
    }}>
      {children}
    </ProfilesContext.Provider>
  );
}

export const useProfiles = () => {
  const ctx = useContext(ProfilesContext);
  if (!ctx) throw new Error("useProfiles must be within ProfilesProvider");
  return ctx;
};
