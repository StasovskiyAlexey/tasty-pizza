import { PizzaWithCollections } from "@/app/api/products/route";
import { Pizza } from "@prisma/client";
import { create } from "zustand";

export interface DataStore {
  pizzaItem: PizzaWithCollections;
  pizzaData: PizzaWithCollections[]
  filteredProducts: PizzaWithCollections[];
  getFilteredData: (data: PizzaWithCollections[]) => void;
  getPizzaData: (data: PizzaWithCollections[]) => void;
  getPizza: (data: PizzaWithCollections) => void;
}

const useDataStore = create<DataStore>((set) => ({
  pizzaItem: {} as PizzaWithCollections,
  pizzaData: [],
  filteredProducts: [],
  getFilteredData: (data) => set({
    filteredProducts: data
  }),
  getPizzaData: (data) => set({
    pizzaData: data
  }),
  getPizza: (data) => set({
    pizzaItem: data
  })
}))

export default useDataStore;