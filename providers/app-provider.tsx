import React from 'react'
import { QueryProvider } from './query-provider'
import { StoreProvider } from './store-provider'
import { MuiProvider } from './mui-provider'

export default function AppProvider({children}: {children: React.ReactNode}) {
  return (
    <QueryProvider>
      <StoreProvider>
        <MuiProvider>
          {children}
        </MuiProvider>
      </StoreProvider>
    </QueryProvider>
  )
}
