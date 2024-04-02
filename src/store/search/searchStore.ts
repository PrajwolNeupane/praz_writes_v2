import { create } from "zustand";

type SearchStore = {
  setOpen: (payload: boolean) => void;
  isOpen: boolean;
};

export const useSearchStore = create<SearchStore>((set) => ({
  isOpen: false,
  setOpen: (payload: boolean) => set((state) => ({ isOpen: payload })),
}));
