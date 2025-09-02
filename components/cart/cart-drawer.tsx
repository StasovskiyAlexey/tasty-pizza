'use client'

import { useStoreContext } from "@/providers/store-provider";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter
} from "@heroui/react";

export default function CartDrawer() {
  const {mainStore} = useStoreContext();
  return (
    <>
      <Drawer isOpen={mainStore.cart} onOpenChange={() => mainStore.toggler('cart', !true)}>
        <DrawerContent>
          <>
            <DrawerHeader className="flex flex-col gap-1">В кошику 0 товарів</DrawerHeader>
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
