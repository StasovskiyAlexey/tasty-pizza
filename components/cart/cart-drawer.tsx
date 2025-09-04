'use client'

import { useStoreContext } from "@/providers/store-provider";
import Drawer from "@mui/material/Drawer";
import { X } from "lucide-react";
import { useEffect } from "react";

export default function CartDrawer() {
  const {mainStore, userStore} = useStoreContext();
  
  async function getUserCart(id: number) {
    try {
      const res = await fetch('/api/cart/get-user-cart', {
        method: 'POST',
        body: JSON.stringify({id: id})
      })
      console.log(id)

      const data = await res.json();
      console.log(data);
      return data.data;
    } catch(e) {
      console.log(e)
    }
  }

  if (!userStore.user) {
    return;
  }
  
  useEffect(() => {
    if (userStore.user.id) {
      getUserCart(userStore.user.id);
    }
  }, [userStore.user])

  return (
    <>
      <Drawer anchor="right" open={mainStore.cart} onClose={() => mainStore.toggler('cart', !true)}>
        <div onClick={() => mainStore.toggler('cart', false)} className="close ml-auto mt-4 mr-4 cursor-pointer">
          <X/>
        </div>
        <div className="w-md px-4 h-full pb-4">
          <h1 className="">В кошику 0 товарів</h1>
        </div>
      </Drawer>
    </>
  )
}
