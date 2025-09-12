import { UserCartItem } from "@prisma/client";
import { create } from "zustand";

export interface CartStore {
  counters: Record<string, number>; // объект вида { "pizza1": 2, "pizza2": 1 }
  totalPrice: number;
  setTotalPrice: (sum: number) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
  resetCounter: () => void;
}

const useProductStore = create<CartStore>((set) => ({
  counters: {},
  totalPrice: 0,
  setTotalPrice: (sum) => set({totalPrice: sum}),
  increment: (id) => set((state) => ({
      counters: {...state.counters, [id]: (state.counters[id] ?? 0) + 1
    },
  })),
  decrement: (id) => set((state) => ({
      counters: {...state.counters, [id]: (state.counters[id] ?? 0) - 1
    },
  })),
  resetCounter: () => set({
    counters: {}
  })
}))

export default useProductStore;

// Сделать адрес юзера и оформление доставки
/* \copy ingredient_on_collections("ingredientId", "collectionId") FROM '/mnt/e/1/ingredient_on_collections.csv' DELIMITER ',' CSV HEADER; */
/* \copy pizza_collection("pizza_name", "pizzaId", "collectionId") FROM '/mnt/e/1/pizza_collection.csv' DELIMITER ',' CSV HEADER; */