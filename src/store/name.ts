import { create } from "zustand";

interface StoreState {
  name: string | null;
  setName: (name: string) => void;
}

export const useNameStore = create<StoreState>((set) => ({
  name: null,
  setName: (name) => set({ name }),
}));
