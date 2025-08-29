import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"

export default function PizzaFilterBar() {
  return (
    <article>
      <div className="filter-bar-container">
        <RadioGroup  defaultValue="comfortable">
          <h1 className="">Інгредієнти</h1>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="mushroom" />
            <label htmlFor="r2"><span>Гриби</span></label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="mozzarella" />
            <label htmlFor="r2"><span>Моцарелла</span></label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="Hard cheese" />
            <label htmlFor="r2"><span>Твердий сир</span></label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="Fillet" />
            <label htmlFor="r2"><span>Куряче філе</span></label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="onion" />
            <label htmlFor="r2"><span>Цибуля</span></label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="tomato sauce" />
            <label htmlFor="r2"><span>Томатний соус</span></label>
          </div>
        </RadioGroup>
      </div>
    </article>
  )
}

/* &apos; */