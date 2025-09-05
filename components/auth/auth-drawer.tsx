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

export default function AuthDrawer() {
  const {mainStore, userStore} = useStoreContext();
  const {getUser, logout} = useAuthContext();
  const [userData, setUserData] = useState<UserWithOrderAndUserCart>();

  useEffect(() => {
    getUser().then(data => userStore.getUser(data.data));
    getUser().then(data => setUserData(data.data))
  }, [userStore.token])

  return (
    <>
      <Drawer anchor="right" open={mainStore.auth} onClose={() => mainStore.toggler('auth', !true)}>
        <div className="close flex justify-between p-4">
          <h1>Особистий кабінет користувача</h1>
          <X className="cursor-pointer" onClick={() => mainStore.toggler('auth', false)} />
        </div>
          <div className="w-md px-4 h-full pb-4">
            {userStore.token
            ? 
            <>
              {userData ? <div className="h-full flex flex-col justify-between">
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
                  <div className="mt-12">
                    <h2 className="mb-4">🛒 Ваші замовлення</h2>

                    {userData?.orders.length === 0 && (
                      <p className="text-gray-500">Замовлень поки немає.</p>
                    )}

                    <div className="space-y-6">
                      {userData?.orders.map((order, index) => (
                        <div
                          key={index}
                          className="bg-white dark:bg-gray-900 shadow rounded-xl p-5 border border-gray-200 dark:border-gray-700"
                        >
                          <h3 className="font-semibold text-lg mb-4">
                            Замовлення #{order.id}
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {order.items.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                              >
                                <div className="flex-1">
                                  <p className="text-lg font-medium">{item.pizza.name}</p>
                                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    Вага: {item.pizza.weight || "—"} г
                                  </p>
                                  <p className="text-gray-800 dark:text-gray-200 font-semibold">
                                    💵 {item.pizza.price} грн
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  </div>

                  {/* Logout */}
                  <Button
                    color="warning"
                    onClick={() => logout()}
                    className="rounded-md w-full py-3"
                  >
                    <span>Вийти з аккаунту</span>
                  </Button>
                </div>
              </div> : <div className="h-full flex flex-col justify-center items-center"><Spinner color="warning" /></div>}
            </>
            :
            <>
            <h1 className="">{userStore.mode ? 'Вхід до аккаунту' : 'Реєстрація аккаунта'}</h1>
            <Tabs onValueChange={value => userStore.setMode(value)} value={userStore.mode} defaultValue="login" className="w-full">
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
