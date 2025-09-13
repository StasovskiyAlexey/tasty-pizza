import { create } from "zustand";

export interface MainStore {
  pizza: boolean;
  order: boolean;
  menu: boolean;
  cart: boolean;
  auth: boolean;
  filter: boolean;
  toggler: (modal: string, boolean: boolean) => void;
}

const useMainStore = create<MainStore>((set) => ({
  pizza: false,
  order: false,
  menu: false,
  cart: false,
  auth: false,
  filter: false,
  toggler: (modal, boolean) => set({
    [modal]: boolean
  })
}))

export default useMainStore