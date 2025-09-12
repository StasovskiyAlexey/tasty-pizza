'use client'

import { getUserCart, useAddToCart, useDeleteCartItem } from "@/lib/query-api";
import { useStoreContext } from "@/providers/store-provider";
import { Check, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

export type productEl ={
  id: number;
  variant: {
    pizza: {
      id: number;
      image: string;
      name: string;
      weight: number | null;
      price: number;
      description: string;
      category: string | null;
    },
    price: number;
    dough: string;
    id: number;
    size: string;
  };
  quantity: number
}

export default function CartItem({el, cartId, id}: {el: productEl, cartId: number, id: number}) {
  const {userStore, cartStore} = useStoreContext();

  const counter = cartStore?.counters[el.id];
  /* console.log(el) */

  useEffect(() => {
    console.log(counter, cartStore.counters)
  }, [counter])

  const addToCart = useAddToCart();
  const deleteFromCart = useDeleteCartItem(userStore.user.id);

  function handleApply() {
    addToCart.mutate({userId: userStore.user.id, variantId: el.variant.id, quantity: counter});
    cartStore.resetCounter()
  }

  const {data: userCart} = getUserCart(userStore?.user?.id);
  
  useEffect(() => {
    const totalPrice = userCart?.items.reduce((acc, curr) => acc + curr.variant.price * curr.quantity, 0); // Проблема в варианте
    cartStore.setTotalPrice(totalPrice as number)
    console.log(userCart?.items)
    console.log(totalPrice)
  }, [userCart?.items, cartStore.counters])

  return (
    <div
      key={el.id}
      className="flex items-center gap-4 p-4 w-full mx-auto mb-4 border-b-1 border-black"
    >
      {/* Изображение */}
      <Image
        src={el.variant.pizza.image}
        alt="pizza-image"
        width={80}
        height={80}
        className="rounded-lg object-cover"
      />

      {/* Контент */}
      <div className="flex flex-col gap-1 flex-1">
        <p className="text-base font-semibold text-gray-900">
          {el.variant.pizza.name}
        </p>
        <p className="text-xs text-gray-500">{el.variant.pizza.weight} г</p>
        <p className="text-sm font-bold text-red-600">
          {el.variant.price * el.quantity} грн
        </p>
        <p className="text-xs text-gray-500">
          Кількість x{el.quantity}
        </p>
        <p className="text-xs text-gray-500">
          Розмір тіста: {el.variant.size}см
        </p>
      </div>

      {/* Счётчик */}
      <div className="flex items-center gap-2">
        {counter >= 1 ? <><button
          disabled={counter === 0}
          onClick={() => cartStore.decrement(el.id)}
          className="size-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition disabled:bg-gray-300 disabled:!cursor-auto"
        >
          -
        </button>
          <span className="w-6 text-center text-sm font-medium">
            {counter}
          </span>
          <button
            onClick={() => cartStore.increment(el.id)}
            className="size-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition"
        >
          +
        </button></> : <button
          onClick={() => cartStore.increment(el.id)}
          className="size-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition"
        >
          +
        </button>}
      </div>
      {counter >= 1 ? <Check className="cursor-pointer" color="#00ff11" onClick={() => handleApply()} /> : null}
      <Trash onClick={() => deleteFromCart.mutate({id: id, cartId: cartId, variantId: el.variant.id})} className="cursor-pointer" size={20} color="red" />
    </div>
  )
}
