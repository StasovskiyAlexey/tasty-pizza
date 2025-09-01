import { PizzaWithCollections } from "@/app/api/products/route";
import { create } from "zustand";

export interface FilterStore {
  filteredPizza: PizzaWithCollections[];
  category: string;        // для select
  ingredients: string[];   // для чекбоксов
  setCategory: (cat: string, pizzaData?: PizzaWithCollections[]) => void;
  toggleIngredient: (ing: string, pizzaData: PizzaWithCollections[]) => void;
  updateFiltered: (pizzaData?: PizzaWithCollections[]) => void;
  clearFilters: (pizzaData: PizzaWithCollections[]) => void;
}

const useFilterStore = create<FilterStore>((set, get) => ({ // Лучше использовать один общий стор для общего фильтра
  filteredPizza: [],
  category: 'all',
  ingredients: [],
  setCategory: (cat, pizzaData) => {
    set({category: cat})
    get().updateFiltered(pizzaData as PizzaWithCollections[]);
  },
  toggleIngredient: (ing, pizzaData) => {
    const ingredients = get().ingredients.includes(ing) ? get().ingredients.filter(i => i !== ing) : [...get().ingredients, ing];
    set({ingredients: ingredients});
    get().updateFiltered(pizzaData as PizzaWithCollections[]);
  },
  updateFiltered: (pizzaData) => {
    // доступ к pizzaData лучше передавать при инициализации
    let filtered = pizzaData as PizzaWithCollections[];
    console.log(filtered)
    if (get().category !== "all") filtered = filtered.filter(p => p.category === get().category); // Если фильтра нет, то-есть все чекбоксы выделены как false, то в таком случае мы подставляем в стейт отфильтрованных пицц, оригинальный массив pizzaData

    // Фильтруем оригинальный массив пиц где достаем все ингридиенты из пицц, и после сравниваем в фильтрах, есть ли совпадения в filter массиве ингридиентов(куда мы собираем все ингридиенты) и ингридиенты в непосредственно найденых пиццах
    if (get().ingredients.length > 0) {
      filtered = filtered.filter(p => 
        p.collection.flatMap(c => c.collection.ingredients.map(i => i.ingredient.ingridient_name))
         .some(i => get().ingredients.includes(i))
      );
    }

    // map: [a, b, c] → [[...], [...], [...]]
    // flatMap: [a, b, c] → [...] (объединяет всё в один уровень)

    set({ filteredPizza: filtered });
  },
  clearFilters: (pizzaData) => {
    set({filteredPizza: pizzaData});
    set({category: 'all'});
    set({ingredients: []});
  }
}))

export default useFilterStore;

// set — меняет состояние
// get — читает текущее состояние