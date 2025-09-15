'use client'

import { PizzaWithCollections } from "@/app/api/products/route";
import { useStoreContext } from "@/providers/store-provider";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import PizzaSelectType from "./filter/pizza-select-type";
import PizzaFilterBar from "./filter/pizza-filter-bar";

import no_pizza from '@/public/no_pizza.png'
import { useEffect } from "react";
import FilterIcon from "./filter-icon";

export default function ProductList() {
  const {mainStore, dataStore, filterStore} = useStoreContext();

  const {isLoading} = useQuery<PizzaWithCollections[]>({
    queryKey: ['pizza-list'],
    queryFn: async () => {
      const pizzas = await fetch('/api/products');
      const data = await pizzas.json();
      dataStore.getPizzaData(data.data) // Основной массив данных
      dataStore.getFilteredData(data.data) // Дополнительный для фильтрации
      return data.data;
    },
  })

  useEffect(() => {
    filterStore.updateFiltered(dataStore.pizzaData)
  }, [isLoading])

  const filteredPizzaData = filterStore.filteredPizza;

  return (
    <div className="pizza-list">
      <div className="pizza-list__container max-w-7xl mx-auto grid lg:my-12 xs:my-6 w-11/12">
        <PizzaSelectType/>
        <div className="grid lg:grid-cols-[1fr_4fr] py-8">
          <PizzaFilterBar/>
            {!isLoading ? (filteredPizzaData.length >= 1 ? <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-2 lg:gap-12 xs:gap-0">{filteredPizzaData.map(pizza => (
              <div key={pizza.id} onClick={() => {mainStore.toggler('pizza', true); dataStore.getPizza(pizza)}} className="pizza-item rounded-2xl flex flex-col items-center max-w-72 mx-auto hover:opacity-90 transition-opacity cursor-pointer hover:shadow-lg duration-300 md:p-4 xs:p-1">
                <Image src={pizza.image} alt={pizza.name} width={300} height={300}/>
                <div className="pizza-item__info flex flex-col md:gap-4 xs:gap-2 w-full">
                  <h1 className="lg:text-2xl xs:text-lg mt-4">{pizza.name}</h1>
                    <p className="text-orange-500 text-lg">{pizza.price} грн</p>
                    {pizza.collection.map(collection => {
                      const ingredients = collection.collection.ingredients.map(item => item.ingredient.ingridient_name).join(', ');
                      return <div key={collection.collectionId}>
                        <p className="text-sm">{ingredients}</p>
                      </div>
                    })}
                </div>
              </div>
              ))}
              </div>
              :
              <div className="flex flex-col justify-center items-center">
              <Image src={no_pizza} alt="" className="max-w-32"/>
              <p className="flex justify-center items-center text-gray-500 text-sm">Немає піци за такими фільтрами</p>
              </div>)
                : 
              <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-2 lg:gap-12 xs:gap-0">{(
              Array.from({length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="pizza-item flex flex-col items-center max-w-72 mx-auto p-4"
                >
                  <Skeleton className="lg:w-[300px] md:w-64 xm:w-48 xs:w-32 lg:h-[300px] sm:h-72 xs:h-48 rounded-xl" />
                  <div className="pizza-item__info flex flex-col gap-4 w-full mt-4">
                    <Skeleton className="h-6 w-2/3" />
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                </div>
              ))
            )}
          </div>}
        </div>
      </div>
      <FilterIcon/>
    </div>
  );
}