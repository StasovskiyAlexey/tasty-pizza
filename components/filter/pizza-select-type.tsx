'use client'

import { useIsMobile } from "@/hooks/use-mobile";
import { useStoreContext } from "@/providers/store-provider"
import { Button, ButtonGroup } from "@heroui/button";
import useEmblaCarousel from 'embla-carousel-react'

export default function PizzaSelectType() {
  const {dataStore, filterStore} = useStoreContext();
  const isMobile = useIsMobile(768);
  const [emblaRef] = useEmblaCarousel({loop: false})
  const category = filterStore.category;

  return (
    isMobile
     ?
      <div className="embla overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 px-4 py-2">
          {[
            { key: "all", label: "Усі" },
            { key: "meat", label: "М'ясна" },
            { key: "cheese", label: "Сирна" },
            { key: "mushroom", label: "Грибна" },
          ].map(({ key, label }) => (
            <Button
              key={key}
              disabled={category === key}
              onPress={() => filterStore.setCategory(key, dataStore.pizzaData)}
              className={`px-5 py-2 text-sm rounded-full transition-colors duration-200 shadow-sm flex-shrink-0
                ${
                  category === key
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
                }
              `}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
      : 
      <div className="flex justify-start">
      <ButtonGroup variant="bordered" radius="md">
        <Button
          disabled={category === "all"}
          className={category === "all" ? "bg-orange-500 border-none text-white px-8" : "border-none px-8"}
          onPress={() => filterStore.setCategory("all", dataStore.pizzaData)}
          color={category === "all" ? "primary" : "default"}
        >
          Усі
        </Button>
        <Button
          disabled={category === "meat"}
          className={category === "meat" ? "bg-orange-500 border-none text-white px-8" : "border-none px-8"}
          onPress={() => filterStore.setCategory("meat", dataStore.pizzaData)}
          color={category === "meat" ? "primary" : "default"}
        >
          М&apos;ясна
        </Button>
        <Button
          disabled={category === "cheese"}
          className={category === "cheese" ? "bg-orange-500 border-none text-white px-8" : "border-none px-8"}
          onPress={() => filterStore.setCategory("cheese", dataStore.pizzaData)}
          color={category === "cheese" ? "primary" : "default"}
        >
          Сирна
        </Button>
        <Button
          disabled={category === "mushroom"}
          className={category === "mushroom" ? "bg-orange-500 border-none text-white px-8" : "border-none px-8"}
          onPress={() => filterStore.setCategory("mushroom", dataStore.pizzaData)}
          color={category === "mushroom" ? "primary" : "default"}
        >
          Грибна
        </Button>
      </ButtonGroup>
    </div>
  )
}