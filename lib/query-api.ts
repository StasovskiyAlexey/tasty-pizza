'use client'

import { UserCart } from "@/app/api/cart/get-user-cart/route";
import { OrderType } from "@/app/api/order/get-user-orders/route";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface Order {
  userId?: number;
  name: string;
  phone: string;
  street: string;
  house: string;
  apartment?: string;
  status?: string;
}

export function getUserCart(userId?: number) {
  return useQuery<UserCart>({
    queryKey: ["userCart", userId], // уникальный ключ кеша
    queryFn: async () => {
      const res = await fetch('/api/cart/get-user-cart', {
        method: 'POST',
        body: JSON.stringify({id: userId})
      })

      const data = await res.json();
      return data.data;
    },
    enabled: !!userId, // запрос не выполнится пока userId нет
  });
}

export function getUserOrders(userId?: number) {
  return useQuery<OrderType[]>({
    queryKey: ["userOrder", userId], // уникальный ключ кеша
    queryFn: async () => {
      const res = await fetch('/api/order/get-user-orders', {
        method: 'POST',
        body: JSON.stringify({userId})
      })

      const data = await res.json();
      return data.data;
    },
    enabled: !!userId, // запрос не выполнится пока userId нет
  });
}

export function useAddUserOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({userId, name, phone, street, house, apartment, totalPrice}: {userId: number, name: string, phone: string, street: string, house: string, apartment: string, totalPrice: number}) => {
      const res = await fetch('/api/order/create-user-order', {
        method: 'POST',
        body: JSON.stringify({userId, name, phone, street, house, apartment, totalPrice})
      })
      const data = await res.json();
      if (!res.ok) throw new Error(data.data || "Error");
      console.log(res, data)
      return data.data;
    },
    onSuccess: (data, variables) => {
      toast.success(data.data || "Продукт додано до замовлень");

      // инвалидируем кэш корзины, чтобы перезапросить свежие данные
      queryClient.invalidateQueries({
        queryKey: ["userOrder", variables.userId], // Мутируем кеш корзины по её ключу
      });
    },
    onError: (error: any) => {
      toast.error(error.data || "Помилка при додаванні до замовлень");
    },
  });
}

export function useDeleteCartItem(userId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({id, cartId, variantId}: {id: number, cartId: number, variantId: number}) => {
      const res = await fetch('/api/cart/delete-from-user-cart', {
        method: 'DELETE',
        body: JSON.stringify({
          id: id,
          cartId: cartId,
          variantId: variantId
        })
      })
      const data = await res.json();
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.data || "Продукт прибрано з кошика");

      // инвалидируем кэш корзины, чтобы перезапросить свежие данные
      queryClient.invalidateQueries({
        queryKey: ["userCart", userId],
      });
    },
    onError: (error: any) => {
      toast.error(error.message || "Помилка при видалення продукту з кошика");
    },
  })
}

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, variantId, quantity = 1 }: {userId: number, variantId: number, quantity?: number}) => {
      const res = await fetch('/api/cart/add-to-user-cart', {
        method: 'POST',
        body: JSON.stringify({ userId, variantId, quantity }),
      });
      console.log(userId, variantId, quantity)
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      return data;
    },
    onSuccess: (data, variables) => {
      toast.success(data.data || "Продукт додано в кошик");

      // инвалидируем кэш корзины, чтобы перезапросить свежие данные
      queryClient.invalidateQueries({
        queryKey: ["userCart", variables.userId], // Мутируем кеш корзины по её ключу
      });
    },
    onError: (error: any) => {
      toast.error(error.data || "Помилка при додаванні до кошика");
    },
  });
}

// Для POST запросов используем useMutation, для GET useQuery