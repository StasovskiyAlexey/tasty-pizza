import { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { useStoreContext } from "@/providers/store-provider";
import { Ingredient } from "@prisma/client";
import { ListFilter, X } from "lucide-react";
import { Spinner } from "@heroui/react";
import { useIsMobile } from "@/hooks/use-mobile";
import Drawer from "@mui/material/Drawer";

export default function PizzaFilterBar() {
  const [ingredientData, setIngredientData] = useState<Ingredient[]>([]);
  const {dataStore, filterStore, mainStore} = useStoreContext();
  const isMobile = useIsMobile(768);

  const { ingredients, toggleIngredient, clearFilters } = filterStore;

  const pizzaData = dataStore.pizzaData; // Полный массив пиц
  const ingridients = ingredientData.map(item => item.ingridient_name) // Получить массив всех ингридиентов

  async function getIngredients() {
    const res = await fetch('/api/ingredients');
    const data = await res.json();
    setIngredientData(data.data)
  }

  useEffect(() => {
    getIngredients();
  }, [])

  return (
    isMobile ? <Drawer sx={{
        "& .MuiPaper-root": {
          width: {xs: '100%', xl: '30%', lg: '40%'}
        }
      }} open={mainStore.filter} onClose={() => mainStore.toggler('filter', !true)}>
      <div className="close flex justify-between p-4 border-b-1">
        <h1>Фільтер</h1>
        <X className="cursor-pointer" onClick={() => mainStore.toggler('filter', false)} />
      </div>
      <aside className="xs:flex lg:hidden w-full p-4">
      <div className="filter-bar-container flex gap-y-4 flex-col h-1/2 w-full">
        <div className="flex justify-between">
          <h1>Інгредієнти</h1>
          {ingredients.length > 0 ? <button onClick={() => clearFilters(pizzaData)} className="flex bg-orange-400 px-3 rounded-sm text-white w-max items-center">Очистити <X size={20}/></button> : null}
        </div>
        {ingredientData.length < 1 ? <div className="flex justify-center items-center h-full w-full"><Spinner color="warning" /></div> : ingridients.map(item => (
          <div key={item} className="flex items-center gap-3">
            <Checkbox onCheckedChange={() => toggleIngredient(item, dataStore.pizzaData)} checked={ingredients.includes(item)} />
            <label>
              <span>{item}</span>
            </label>
          </div>
        ))}
      </div>
    </aside>
    </Drawer> : <aside className="lg:flex xs:hidden w-full min-w-56">
      <div className="filter-bar-container flex gap-y-4 flex-col h-1/2 w-full">
        <div className="flex justify-between">
          <h1>Інгредієнти</h1>
          {ingredients.length > 0 ? <button onClick={() => clearFilters(pizzaData)} className="flex bg-orange-400 px-3 rounded-sm text-white w-max items-center">Очистити <X size={20}/></button> : null}
        </div>
        {ingredientData.length < 1 ? <div className="flex justify-center items-center h-full w-full"><Spinner color="warning" /></div> : ingridients.map(item => (
          <div key={item} className="flex items-center gap-3">
            <Checkbox onCheckedChange={() => toggleIngredient(item, dataStore.pizzaData)} checked={ingredients.includes(item)} />
            <label>
              <span>{item}</span>
            </label>
          </div>
        ))}
      </div>
    </aside>
  )
}