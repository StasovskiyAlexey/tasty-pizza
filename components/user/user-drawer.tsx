'use client'

import { useStoreContext } from "@/providers/store-provider";
import {
  Button,
  Spinner
} from "@heroui/react";
import Drawer from '@mui/material/Drawer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react";
import Login from "./login";
import Register from "./register";
import { UserWithOrderAndUserCart } from "@/app/api/auth/me/route";
import { useAuthContext } from "@/providers/auth-provider";
import { X } from "lucide-react";
import { useGetUserOrders } from "@/lib/query-api";
import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function UserDrawer() {
  const {mainStore, userStore} = useStoreContext();
  const {getUser, logout} = useAuthContext();
  const [userData, setUserData] = useState<UserWithOrderAndUserCart>();

  useEffect(() => {
    getUser().then(data => userStore.getUser(data.data));
    getUser().then(data => setUserData(data.data))
  }, [userStore.token])

  const {data: userOrders, isLoading: userOrdersLoader} = useGetUserOrders(userStore?.user?.id);

  return (
    <>
      <Drawer sx={{
        "& .MuiPaper-root": {
          width: {xs: '100%', xl: '30%', lg: '40%'}
        }
      }} anchor="right" open={mainStore.auth} onClose={() => mainStore.toggler('auth', !true)}>
        <div className="close flex justify-between p-4 border-b-1">
          <h1>Особистий кабінет</h1>
          <X className="cursor-pointer" onClick={() => mainStore.toggler('auth', false)} />
        </div>
          <div className="px-4 h-full my-4">
            {userStore.token
            ? 
            <>
              {userData ? <div className="h-full flex flex-col justify-between w-full">
                <div className="flex flex-col justify-between h-full gap-12">
                  {/* Информация о пользователе */}
                  <div>
                    <h1 className="mb-2">
                      👤 Користувач: <span className="text-orange-600">{userData?.username}</span>
                    </h1>
                    <p>
                      📧 Email: <span className="text-orange-600">{userData?.email}</span>
                    </p>

                  {/* Заказы */}
                  <div className="orders-block md:mt-12 xs:mt-4 md:max-h-[600px] xs:max-h-[400px] overflow-auto">
                    <h2>🛒 Ваші замовлення</h2>

                    <Accordion type="single"
                      collapsible
                      className="w-full">
                    {userOrdersLoader ? <div className="h-full w-full flex flex-col justify-center items-center"><Spinner color="warning" /></div> : (userOrders?.length === 0 ? <span className="text-sm text-gray-500">Замовлень поки немає...</span> : userOrders?.map(item => (
                      <AccordionItem key={item.id} value={item.id.toString()}>
                        <div className="space-y-6">
                          <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-5 border border-gray-200 dark:border-gray-700">
                            <AccordionTrigger>
                              <div className="flex flex-col gap-y-2">
                                <h3 className="text-xm">
                                  Замовлення: #{item.id}
                                </h3>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance overflow-auto max-h-[420px]">
                            <div className="flex flex-col gap-3 mt-4">
                              {item.items.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
                                >
                                  <div className="flex items-center gap-3">
                                    <Image
                                      alt={item.variant.pizza.name}
                                      width={80}
                                      height={80}
                                      className="rounded-md object-cover"
                                      src={item.variant.pizza.image}
                                    />
                                    <div className="flex flex-col gap-1">
                                      <p className="font-semibold text-gray-800 dark:text-gray-200">
                                        {item.variant.pizza.name}
                                      </p>
                                      <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Вага: {item.variant.pizza.weight} г | {item.variant.size} см | {item.quantity} шт
                                      </p>
                                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {item.variant.pizza.price} грн
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                              <h4 className="text-xm">
                                Загальна сумма замовлення: {item?.totalPrice} грн
                              </h4>
                              <h5 className="text-xm">
                                Статус замовлення: <span className="">{item.status === 'PENDING' ? 'Очікується' : 'Завершено'}</span>
                              </h5>
                            </div>
                            </AccordionContent>
                          </div>
                        </div>
                    </AccordionItem>
                    )))}
                  </Accordion>
                  </div>
                  </div>
                </div>
                {/* Logout */}
                  <Button
                    color="warning"
                    onClick={() => logout()}
                    className="rounded-md w-full py-3 min-h-12"
                  >
                    <span>Вийти з аккаунту</span>
                  </Button>
              </div> : <div className="h-full w-full flex flex-col justify-center items-center"><Spinner color="warning" /></div>}
            </>
            :
            <>
            <h1 className="">{userStore.mode ? 'Вхід до аккаунту' : 'Реєстрація аккаунта'}</h1>
            <Tabs onValueChange={value => userStore.setMode(value as "login" | "register")} value={userStore.mode} defaultValue="login" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="login">Логін</TabsTrigger>
                <TabsTrigger value="register">Реєстрація</TabsTrigger>
              </TabsList>
              <TabsContent value="login"><Login/></TabsContent>
              <TabsContent value="register"><Register/></TabsContent>
            </Tabs></>}
          </div>
      </Drawer>
    </>
  )
}
