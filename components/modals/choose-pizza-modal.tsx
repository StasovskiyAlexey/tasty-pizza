'use client'

import React, { useEffect, useState } from 'react'
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
import { useAddToCart } from '@/lib/query-api'
import { PizzaVariant } from '@prisma/client'

export default function PizzaModal() {
  const {mainStore, dataStore, userStore} = useStoreContext();
  const pizza: PizzaWithCollections = dataStore.pizzaItem;

  const [selectedSize, setSelectedSize] = useState<string>(pizza.variants?.[0].size); // Выбираем размер теста
  const [selectedVariant, setSelectedVariant] = useState<typeof pizza.variants[0] | null>(pizza.variants?.[0]);

  useEffect(() => {
    const currentVariant = pizza?.variants?.find(pizza => {
      return pizza.size === selectedSize;
    })
    console.log(selectedVariant)
    setSelectedVariant(currentVariant as unknown as typeof pizza.variants[0] | null);
  }, [selectedSize])

  useEffect(() => {
    if (pizza?.variants?.length) {
      setSelectedVariant(pizza.variants.find(item => item.size === '30') as unknown as PizzaVariant)
    }
  }, [pizza])

  useEffect(() => {
    setSelectedSize('30')
  }, [mainStore.pizza])

  const addToCart = useAddToCart();

  return (
    <Dialog onOpenChange={() => {mainStore.toggler('pizza', false)}} open={mainStore.pizza}>
      <DialogContent className="w-11/12 block !max-w-5xl h-11/12 max-h-max md:p-6 p-3 rounded-2xl overflow-auto">
      
        <div className='grid lg:grid-cols-[1fr_1fr] xs:grid-cols-1 justify-center gap-12 items-center'>
          <Image
            src={pizza.image}
            alt={pizza.name}
            width={650}
            height={650}
            className='object-cover w-full mx-auto'
          />

          {/* Основний контент */}
          <div className="flex flex-col gap-6">
            <DialogHeader className='!block !h-max'>
              <DialogTitle className="md:text-2xl text-lg font-bold text-center">{pizza.name}</DialogTitle>
            </DialogHeader>
            <span className="text-sm">Вага {selectedVariant?.weight} г</span>
            <div className="flex items-center flex-col relative">
              {/* Сам переключатель */}
              <span className="absolute z-10 text-gray-500 left-2 top-1/2 -translate-y-1/2 text-sm font-bold px-4">
                30 см тісто
              </span>
              <span className="absolute z-10 text-gray-500 right-2 top-1/2 -translate-y-1/2 text-sm font-bold px-4">
                40 см тісто
              </span>
              <Switch checked={selectedSize === '40'} onCheckedChange={(checked) => setSelectedSize(checked ? '40' : '30')} />
            </div>

            {/* Інформація */}
            <div className="flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <p className="text-gray-700">{pizza.description}</p>
                <p className="text-3xl font-semibold text-orange-500">{selectedVariant?.price} грн</p>
              </div>

              <div className="flex items-center gap-4 my-6 text-md text-gray-500">
                Кількість: {1}
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
                  variant="secondary"
                  className="flex-1"
                  onClick={() => mainStore.toggler('pizza', false)}
                >
                  Закрити
                </Button>
                <Button onClick={() => addToCart.mutate({ userId: userStore?.user?.id, variantId: selectedVariant?.id as number, quantity: 1 })} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                  Додати в кошик
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}