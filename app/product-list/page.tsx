import ProductList from "@/components/product-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Доставка піци у Києві — замовити смачну піцу онлайн | PizzaExpress',
  description: 'Швидка доставка піци у Києві прямо до ваших дверей. Замовляйте свіжу та смачну піцу онлайн з великим вибором начинок і вигідними акціями від Tasty Pizza.',
};

export default async function PizzaList() {
  return (
    <ProductList/>
  );
}