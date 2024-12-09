import { create } from "zustand";

interface StoreState {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}

export const useStore = create<StoreState>((set) => ({
  selectedDate: new Date(), // Set to today's date by default
  setSelectedDate: (date) => set({ selectedDate: date }),
}));
