'use client'

import { useStoreContext } from '@/providers/store-provider'
import { ListFilter } from 'lucide-react'
import React from 'react'

export default function FilterIcon() {
  const {mainStore} = useStoreContext();
  return (
    <div className="fixed bottom-5 left-5 z-50"><div onClick={() => mainStore.toggler('filter', true)} className="bg-orange-400 p-3 rounded-full cursor-pointer"><ListFilter size={24} color="#fff" /></div></div>
  )
}
