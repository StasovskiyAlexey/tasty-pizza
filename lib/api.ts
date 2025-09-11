'use client'

import { UserCart } from "@/app/api/cart/get-user-cart/route";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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
      if (!res.ok) throw new Error(data.error || "Failed to add to cart");
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
      toast.error(error.message || "Помилка при додаванні до кошика");
    },
  });
}

// Доделать функцию удаления продукта и счетчик подсчета товара