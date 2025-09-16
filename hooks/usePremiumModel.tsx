import { create } from "zustand";

interface PermiumModelState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const usePremiumModel = create<PermiumModelState>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}));

export default usePremiumModel;
