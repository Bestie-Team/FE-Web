import { create } from "zustand";

interface StoreState {
  selectedFriends: string[] | null;
  setSelectedFriends: (friends: string[]) => void;
}

export const useFriendStore = create<StoreState>((set) => ({
  selectedFriends: null,
  setSelectedFriends: (friends) => set({ selectedFriends: friends }),
}));
