'use client'

import React, { useEffect, useState } from 'react'
import { QueryProvider } from './query-provider'
import { StoreProvider } from './store-provider'
import { MuiProvider } from './mui-provider'
import Loader from '@/components/loading';

export default function AppProvider({children}: {children: React.ReactNode}) {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true)

    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000);

    return () => clearTimeout(timer);
  }, [])

  return (
    <QueryProvider>
      <StoreProvider>
        <MuiProvider>
          {loading ? <Loader/> : children}
        </MuiProvider>
      </StoreProvider>
    </QueryProvider>
  )
}
