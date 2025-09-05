'use client'

import { useStoreContext } from "@/providers/store-provider";
import Drawer from "@mui/material/Drawer";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

import empty_cart from '@/public/cart.png'
import CartItem from "./cart-item";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";

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

  const userCart = userStore.userCart;
  
  useEffect(() => {
    if (userStore?.user?.id) {
      getUserCart(userStore?.user?.id).then(data => userStore.getUserCart(data));
    }
  }, [userStore.user])

  useEffect(() => {
    
  }, [userCart])

  return (
    <>
      <Drawer anchor="right" open={mainStore.cart} onClose={() => mainStore.toggler('cart', !true)}>
        <div className="close px-4 mt-4 flex justify-between">
          <h1 className="text-lg">Кошик</h1>
          <X className="cursor-pointer" onClick={() => mainStore.toggler('cart', false)} />
        </div>
        {userCart.items ? <div className="w-md px-4 h-full flex-col flex justify-between items-center pb-4">
          <div>
            {userCart && userCart.items?.length >= 1
              ? 
              userCart?.items.map(el => (
                <CartItem key={el.id} id={el.id} cartId={el.cartId} el={el}/>
              ))
              :
            <div className="w-md px-4 h-full flex-col flex justify-center items-center pb-4">
              <Image src={empty_cart} alt="empty_cart" width={150} height={150}/>
              <h1 className="">В кошику 0 товарів</h1>
            </div>}
          </div>
          <Button
            disabled={userCart?.items?.length === 0}
            color="warning"
            className="rounded-md w-full py-3"
          >
            <span>Перейти до оплати</span>
          </Button>
        </div> : <div className="h-full w-md flex flex-col justify-center items-center"><Spinner color="warning" /></div>}
      </Drawer>
    </>
  )
}
