import { create } from "zustand";

interface StoreState {
  description: string | null;
  setdescription: (description: string) => void;
}

export const useDescriptionStore = create<StoreState>((set) => ({
  description: null,
  setdescription: (description) => set({ description }),
}));
