'use client'

import { useGetUserCart } from "@/lib/query-api";
import { useStoreContext } from "@/providers/store-provider"
import Drawer from "@mui/material/Drawer";
import { X } from "lucide-react";

export default function Menu() {
  const { mainStore, userStore } = useStoreContext();
  const { data: userCart } = useGetUserCart(userStore?.user?.id);

  return (
    <Drawer sx={{
      "& .MuiPaper-root": {
        width: '100%'
      }
    }} anchor="right" open={mainStore.menu} onClose={() => mainStore.toggler('menu', !true)}>
      <div className="close px-4 py-4 items-center flex justify-between border-b-1">
        <h1 className="text-lg">Меню</h1>
        <X size={30} className="cursor-pointer" onClick={() => mainStore.toggler('menu', false)} />
      </div>
      <ul className="flex flex-col p-4 space-y-4 h-full items-center justify-center">
        <li onClick={() => {mainStore.toggler('auth', true); mainStore.toggler('menu', false)}} className="hover:text-orange-500 transition-colors cursor-pointer lg:text-2xl xs:text-xl">
          Особистий кабінет
        </li>
        <li onClick={() => {mainStore.toggler('cart', true); mainStore.toggler('menu', false)}} className="hover:text-orange-500 transition-colors cursor-pointer lg:text-2xl xs:text-xl">
          Кошик {userCart?.items.length === 0 ? (`(${0})`) : (`(${userCart?.items.length})`)}
        </li>
      </ul>
    </Drawer>
  );
}
