'use client'

import { useStoreContext } from "@/providers/store-provider";
import Drawer from "@mui/material/Drawer";
import { X } from "lucide-react";
import { Input } from "../ui/input";
import { getUserCart, useAddUserOrder } from "@/lib/query-api";
import { Spinner } from "@heroui/spinner";
import CartItem from "../cart/cart-item";
import { Button } from "@heroui/button";
import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
  phone: string;
  street: string;
  house: string;
  apartment: string;
};

export default function PaymentDrawer() {
  const { mainStore, userStore, cartStore } = useStoreContext();
  const { data: userCart, isLoading: userCartLoader } = getUserCart(userStore?.user?.id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const addUserOrder = useAddUserOrder();

  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
    console.log("Cart items:", userCart?.items);
    addUserOrder.mutate({userId: userStore.user.id, name: data.name, phone: data.phone, street: data.street, house: data.house, apartment: data.apartment, totalPrice: cartStore.totalPrice});
  };

  return (
    <Drawer
      sx={{
        "& .MuiPaper-root": {
          width: { xs: "100%", xl: "30%", lg: "40%" },
        },
      }}
      anchor="right"
      open={mainStore.order}
      onClose={() => mainStore.toggler("order", false)}
    >
      <div className="close px-4 py-4 flex justify-between border-b-1">
        <h1 className="text-lg font-semibold">Оформлення замовлення</h1>
        <X className="cursor-pointer" onClick={() => mainStore.toggler("order", false)} />
      </div>

      <div className="px-4 flex flex-col justify-between h-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-between gap-4 py-4 h-full"
        >
          {/* Имя */}
          <div className="flex flex-col gap-y-4">
            <div>
            <Input
              type="text"
              placeholder="Ваше ім'я"
              {...register("name", { required: "Введіть ім'я" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Телефон */}
          <div>
            <Input
              type="number"
              placeholder="Номер телефону"
              {...register("phone", {
                required: "Введіть номер телефону",
                pattern: {
                  value: /^\+?\d{10,13}$/,
                  message: "Некоректний номер телефону",
                },
              })}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Адрес */}
          <div>
            <Input
              type="text"
              placeholder="Вулиця"
              {...register("street", { required: "Введіть вулицю" })}
            />
            {errors.street && (
              <p className="text-red-500 text-sm mt-1">{errors.street.message}</p>
            )}
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="number"
                placeholder="Будинок"
                {...register("house", {
                  required: "Вкажіть будинок",
                  valueAsNumber: true,
                })}
              />
              {errors.house && (
                <p className="text-red-500 text-sm mt-1">{errors.house.message}</p>
              )}
            </div>
            <div className="flex-1">
              <Input
                type="number"
                placeholder="Квартира"
                {...register("apartment", {
                  required: "Вкажіть квартиру",
                  valueAsNumber: true,
                })}
              />
              {errors.apartment && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.apartment.message}
                </p>
              )}
            </div>
          </div>
            {/* Список корзины */}
            <div className="mt-4 max-h-[500px] overflow-auto">
              {!userCartLoader ? (
                userCart?.items?.map((el) => (
                  <CartItem key={el.id} id={el.id} cartId={el.cartId} el={el} />
                ))
              ) : (
                <div className="h-full w-full flex justify-center items-center">
                  <Spinner color="warning" />
                </div>
              )}
            </div>
          </div>

          {/* Кнопка оформления */}
          <div>
            <h2 className="lg:text-xl xs:text-base">Загальна ціна замовлення: {cartStore.totalPrice} грн</h2>
            <Button
              type="submit"
              disabled={userCart?.items?.length === 0}
              color="warning"
              className="rounded-md w-full py-3 mt-2"
            >
              <span className="text-white">Оформити замовлення</span>
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  );
}
