'use client'

import { useStoreContext } from "@/providers/store-provider";
import Drawer from "@mui/material/Drawer";
import { X } from "lucide-react";
import Image from "next/image";

import empty_cart from '@/public/cart.png'
import CartItem from "./cart-item";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { getUserCart } from "@/lib/api";

export default function CartDrawer() {
  const {mainStore, userStore, cartStore} = useStoreContext();
  const {data: userCart, isLoading: userCartLoader} = getUserCart(userStore?.user?.id);

  return (
    <>
      <Drawer sx={{
        "& .MuiPaper-root": {
          width: {xs: '100%', xl: '30%', lg: '40%'}
        }
      }} anchor="right" open={mainStore.cart} onClose={() => mainStore.toggler('cart', !true)}>
        <div className="close px-4 py-4 flex justify-between border-b-1">
          <h1 className="text-lg">Кошик</h1>
          <X className="cursor-pointer" onClick={() => mainStore.toggler('cart', false)} />
        </div>
        {!userCartLoader ? <div className="px-4 h-full flex-col flex justify-between items-center pb-4 w-full">
          <div className={`flex flex-col w-full h-full ${userCart && userCart?.items?.length >= 1 ? 'justify-start' : 'justify-between'}`}>
            {userCart && userCart.items.length >= 1
              ? 
              userCart?.items?.map(el => (
                <CartItem key={el.id} id={el.id} cartId={el.cartId} el={el}/>
              ))
              :
            <div className="px-4 h-full flex-col flex justify-center items-center pb-4">
              <Image src={empty_cart} alt="empty_cart" width={150} height={150}/>
              <h1 className="">В кошику 0 товарів</h1>
            </div>}
          </div>
          <div className="flex justify-start w-full">
            {userCart && userCart.items.length >= 1 ? <h1 className="">Загальна сума: {cartStore?.totalPrice} грн</h1> : null}
          </div>
          <Button
            disabled={userCart?.items?.length === 0}
            color="warning"
            className="rounded-md w-full py-3 mt-2"
          >
            <span>Перейти до оплати</span>
          </Button>
        </div> : <div className="h-full w-full flex flex-col justify-center items-center"><Spinner color="warning" /></div>}
      </Drawer>
    </>
  )
}
