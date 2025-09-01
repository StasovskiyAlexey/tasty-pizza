'use client'

import { useStoreContext } from "@/providers/store-provider"
import {Button, ButtonGroup} from "@heroui/button";

export default function PizzaSelectType() {
  const {dataStore, filterStore} = useStoreContext();
  const category = filterStore.category;

  return (
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

/* async function filterByType(value: string) {
  try {
    const res = await fetch('/api/filter', {
      method: 'POST',
      body: JSON.stringify({value: value})
    });
    const data = await res.json();
    dataStore.getFilteredData(data.data)
    return data.data;
  } catch (e) {
    console.log(e)
  }
} */