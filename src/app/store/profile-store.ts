import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Profile } from '../types';

interface ProfileStore {
  profiles: Profile[];
  selectedProfileId: string | null;
  showForm: boolean;
  addProfile: (profile: Profile) => void;
  selectProfile: (profileId: string) => void;
  openForm: () => void;
  closeForm: () => void;
  goBack: () => void;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profiles: [],
      selectedProfileId: null,
      showForm: false,
      addProfile: (profile) =>
        set((state) => ({
          profiles: [...state.profiles, profile],
          showForm: false,
        })),
      selectProfile: (profileId) => set({ selectedProfileId: profileId }),
      openForm: () => set({ showForm: true, selectedProfileId: null }),
      closeForm: () => set({ showForm: false }),
      goBack: () => set({ selectedProfileId: null }),
    }),
    {
      name: 'cvex-profiles-storage', // nombre de la llave en localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
