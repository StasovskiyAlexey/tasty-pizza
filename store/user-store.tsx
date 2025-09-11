import { UserWithOrderAndUserCart } from "@/app/api/auth/me/route";
import { create } from "zustand";

export interface UserStore {
  token: boolean;
  user: UserWithOrderAndUserCart;
  mode: 'login' | 'register',
  setMode: (type: 'login' | 'register') => void;
  getUser: (user: UserWithOrderAndUserCart) => void;
  toggleToken: (token: boolean) => void;
}

const useUserStore = create<UserStore>((set) => ({
  token: false,
  user: {} as UserWithOrderAndUserCart,
  mode: 'login',
  setMode: (type) => set({
    mode: type
  }),
  getUser: (user) => set({
    user: user
  }),
  toggleToken: (boolean) => set({
    token: boolean
  })
}))

export default useUserStore