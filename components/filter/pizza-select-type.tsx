'use client'

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { useStoreContext } from "@/providers/store-provider"
import { useEffect, useState } from "react";

export default function PizzaSelectType() {
  const {dataStore} = useStoreContext();
  const [value, setValue] = useState<string>('all');
  const pizzaData = dataStore.pizzaData;

  useEffect(() => {
    switch(value) {
      case 'all':
        dataStore.getFilteredData(pizzaData)
        break;
      case 'cheese': 
        dataStore.getFilteredData(pizzaData.filter(item => item.category === 'cheese'))
        break;
      case 'mushroom': 
        dataStore.getFilteredData(pizzaData.filter(item => item.category === 'mushroom'))
        break;
      case 'meat': 
        dataStore.getFilteredData(pizzaData.filter(item => item.category === 'meat'))
        break;
      default: 
        dataStore.getFilteredData(pizzaData)
    }
  }, [value])

  return (
    <ToggleGroup onValueChange={(value) => setValue(value)} variant="outline" type="single">
       <ToggleGroupItem value="all" aria-label="all">
        <span className="px-4">Усі</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="meat" aria-label="meat">
        <span className="px-4">М'ясна</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="cheese" aria-label="cheese">
        <span className="px-4">Сирна</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="mushroom" aria-label="mushroom">
        <span className="px-4">Грибна</span>
      </ToggleGroupItem>
    </ToggleGroup>
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