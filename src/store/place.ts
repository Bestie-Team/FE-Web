import { create } from "zustand";

interface StoreState {
  selectedPlace: string | null;
  setSelectedPlace: (place: string) => void;
}

export const usePlaceStore = create<StoreState>((set) => ({
  selectedPlace: null,
  setSelectedPlace: (place) => set({ selectedPlace: place }),
}));
