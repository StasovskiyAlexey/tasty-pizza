import { create } from "zustand";

export interface MainStore {
  pizza: boolean;
  menu: boolean;
  toggler: (modal: string, boolean: boolean) => void;
}

const useMainStore = create<MainStore>((set) => ({
  pizza: false,
  menu: false,
  toggler: (modal, boolean) => set({
    [modal]: boolean
  })
}))

export default useMainStore