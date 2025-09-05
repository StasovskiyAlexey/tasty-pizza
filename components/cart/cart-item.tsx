'use client'

import { Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export type productEl ={
  id: number;
  product: {
    id: number;
    image: string;
    name: string;
    weight: number | null;
    price: number;
    description: string;
    category: string | null;
  };
  quantity: number
}

export default function CartItem({el, cartId, id}: {el: productEl, cartId: number, id: number}) {
  const [quantity, setQuantity] = useState(el.quantity);
  
  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  async function deleteUserCartItem(id: number, cartId: number, productId: number) {
    const res = await fetch('/api/cart/delete-from-user-cart', {
      method: 'DELETE',
      body: JSON.stringify({
        id: id,
        cartId: cartId,
        productId: productId
      })
    })
    const data = await res.json();
    console.log(data);
    if (data.success) {
      toast(data.data)
    } else {
      toast(data.error)
    }
    return data;
  }
  
  return (
    <div
      key={el.id}
      className="flex items-center gap-4 p-4 rounded-2xl shadow-md bg-white w-full mx-auto mb-4"
    >
      {/* Изображение */}
      <Image
        src={el.product.image}
        alt="pizza-image"
        width={80}
        height={80}
        className="rounded-lg object-cover"
      />

      {/* Контент */}
      <div className="flex flex-col flex-1">
        <p className="text-base font-semibold text-gray-900">
          {el.product.name}
        </p>
        {el.product.weight && (
          <p className="text-xs text-gray-500">{el.product.weight} г</p>
        )}
        <p className="text-sm font-bold text-red-600">
          {el.product.price} ₴
        </p>
      </div>

      {/* Счётчик */}
      <div className="flex items-center gap-2">
        <button
          onClick={decrement}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition"
        >
          -
        </button>
        <span className="w-6 text-center text-sm font-medium">
          {quantity}
        </span>
        <button
          onClick={increment}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition"
        >
          +
        </button>
      </div>
      <Trash onClick={() => deleteUserCartItem(id, cartId, el.product.id)} className="cursor-pointer" size={20} color="red" />
    </div>
  )
}
