'use client'

import { ShoppingCart, UserRound } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

import classNames from 'classnames';

import logo from '@/public/tasty_pizza.png'
import { useStoreContext } from '@/providers/store-provider';

export default function Header() {
  const {mainStore} = useStoreContext();
  return (
    <header className='header bg-orange-400'>
      <div className="header-container max-w-7xl mx-auto flex items-center justify-between min-h-16 py-4 w-11/12">
        <ul className="header-ul flex justify-center items-center gap-x-12">
          <Link href='/'><Image src={logo} alt='logo' width={120} height={120}/></Link>
        </ul>
        <div className='md:flex xs:hidden gap-x-4'>
          <Link className='bg-white p-3 rounded-full' href='/'><UserRound color='#000' size={20} /></Link>
          <Link className='bg-white p-3 rounded-full' href='/'><ShoppingCart color='#000' size={20} /></Link>
        </div>

        <div onClick={() => mainStore.toggler('menu', !mainStore.menu)} className={classNames(`tham md:hidden tham-e-squeeze tham-w-6`, { 'tham-active': mainStore.menu })}>
          <div className="tham-box">
            <div className="tham-inner bg-white" />
          </div>
        </div>
      </div>
    </header>
  )
}
