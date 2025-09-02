'use client'

import React from 'react'
import { QueryProvider } from './query-provider'
import { StoreProvider } from './store-provider'
import { MuiProvider } from './mui-provider'

import {ToastProvider} from "@heroui/toast";
import {HeroUIProvider} from '@heroui/react'

export default function AppProvider({children}: {children: React.ReactNode}) {
  return (
    <QueryProvider>
      <StoreProvider>
        <MuiProvider>
          <HeroUIProvider>
            <ToastProvider/>
              {children}
          </HeroUIProvider>
        </MuiProvider>
      </StoreProvider>
    </QueryProvider>
  )
}
