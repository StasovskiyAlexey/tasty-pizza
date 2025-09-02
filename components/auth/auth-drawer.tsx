'use client'

import { useStoreContext } from "@/providers/store-provider";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter
} from "@heroui/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react";
import Login from "./login";
import Register from "./register";

export default function AuthDrawer() {
  const {mainStore} = useStoreContext();
  const [mode, setMode] = useState<string>('login');
  return (
    <>
      <Drawer isOpen={mainStore.auth} onOpenChange={() => mainStore.toggler('auth', !true)}>
        <DrawerContent className="p-4">
          <>
            <DrawerHeader className="flex !px-0 !py-2 flex-col gap-1">{mode ? 'Вхід до аккаунту' : 'Реєстрація аккаунта'}</DrawerHeader>

            <Tabs onValueChange={(value: string) => setMode(value)} value={mode} defaultValue="login" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="login">Логін</TabsTrigger>
                <TabsTrigger value="register">Реєстрація</TabsTrigger>
              </TabsList>
              <TabsContent value="login"><Login/></TabsContent>
              <TabsContent value="register"><Register/></TabsContent>
            </Tabs>

            <DrawerBody>
              
            </DrawerBody>
            <DrawerFooter>
              
            </DrawerFooter>
          </>
        </DrawerContent>
      </Drawer>
    </>
  )
}
