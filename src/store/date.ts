import { create } from "zustand";

interface StoreState {
  selectedDate: Date | null;
  period: "AM" | "PM"; // 오전/오후를 나타내는 변수
  time: string | null; // 시간을 저장하는 변수
  setSelectedDate: (date: Date | null) => void;
  setPeriod: (period: "AM" | "PM") => void;
  setTime: (time: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  selectedDate: null,
  period: "AM",
  time: null,
  setSelectedDate: (date) => set({ selectedDate: date }),
  setPeriod: (period) => set({ period }),
  setTime: (time) => set({ time }),
}));
