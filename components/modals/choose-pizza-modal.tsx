'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import Image from 'next/image'
import { useStoreContext } from '@/providers/store-provider'
import { PizzaWithCollections } from '@/app/api/products/route'
import { Button } from '../ui/button'
import { Switch } from '../ui/switch'

export default function PizzaModal() {
  const {mainStore, dataStore} = useStoreContext();
  const [enabled, setEnabled] = useState(false)
  const [counter, setCounter] = useState<number>(1);
  
  const pizza: PizzaWithCollections = dataStore.pizzaItem;
  const doughSize = enabled ? + 100 : 0;

  function clearAllParams() {
    setEnabled(false);
  }

  function increment() {
    setCounter(prev => prev + 1);
  }

  function decrement() {
    setCounter(prev => prev - 1);
  }

  return (
    <Dialog onOpenChange={() => {mainStore.toggler('pizza', false); clearAllParams()}} open={mainStore.pizza}>
      <DialogContent className="w-full h-11/12 md:p-6 p-3 rounded-2xl overflow-auto">
        <DialogHeader>
          <DialogTitle className="md:text-2xl text-lg font-bold text-center">{pizza.name}</DialogTitle>
        </DialogHeader>

        {/* Основний контент */}
        <div className="flex flex-col gap-6">
          
          {/* Фото піци */}
          <div className="flex-1 flex justify-center">
            <Image
              src={pizza.image}
              alt={pizza.name}
              width={350}
              height={350}
              className="object-cover"
            />
          </div>

          <div className="weight">
            <span className="text-sm">Вага {pizza.weight && pizza.weight + doughSize} г</span>
          </div>

          <div className="flex items-center flex-col relative">
            {/* Сам переключатель */}
            <span className="absolute z-10 text-gray-500 left-2 top-1/2 -translate-y-1/2 text-sm font-bold px-4">
              30 см тісто
            </span>
            <span className="absolute z-10 text-gray-500 right-2 top-1/2 -translate-y-1/2 text-sm font-bold px-4">
              40 см тісто
            </span>
            <Switch checked={enabled} onCheckedChange={setEnabled} />
          </div>

          {/* Інформація */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <p className="text-gray-700">{pizza.description}</p>
              <p className="text-3xl font-semibold text-orange-500">{pizza.price + doughSize} грн</p>
            </div>

            <div className="flex items-center gap-4 my-6 text-md text-gray-500">
              Кількість: {counter}
            </div>

            {/* Інгредієнти */}
            <div>
              <h3 className="text-lg font-medium mb-3">Інгредієнти:</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {pizza.collection?.map(collection => 
                  collection.collection.ingredients?.map(item => (
                    <div
                      key={item.ingredient.id}
                      className="flex flex-col items-center text-center p-2 rounded-lg border transition"
                    >
                      <Image
                        src={item.ingredient.image}
                        alt={item.ingredient.ingridient_name}
                        width={60}
                        height={60}
                        className="rounded-md"
                      />
                      <p className="text-sm mt-2">{item.ingredient.ingridient_name}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Кнопки */}
            <div className="mt-8 flex gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => mainStore.toggler('pizza', false)}
              >
                Закрити
              </Button>
              <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                Додати в кошик
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
