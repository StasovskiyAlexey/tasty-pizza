import { UserWithOrderAndUserCart } from "@/app/api/auth/me/route";
import { UserCart } from "@/app/api/cart/get-user-cart/route";
import { create } from "zustand";

export interface userStore {
  token: boolean;
  user: UserWithOrderAndUserCart;
  userCart: UserCart;
  mode: 'login' | 'register',
  getUserCart: (userCart: UserCart) => void;
  setMode: (type: 'login' | 'register') => void;
  getUser: (user: UserWithOrderAndUserCart) => void;
  toggleToken: (token: boolean) => void;
}

const useUserStore = create<userStore>((set) => ({
  token: false,
  user: {} as UserWithOrderAndUserCart,
  userCart: {} as UserCart,
  mode: 'login',
  getUserCart: (userCart) => set({
    userCart: userCart
  }),
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