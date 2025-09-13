'use client'

import { ShoppingCart, UserRound } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

import classNames from 'classnames';

import logo from '@/public/tasty_pizza.png'
import { useStoreContext } from '@/providers/store-provider';
import { useGetUserCart } from '@/lib/query-api'

export default function Header() {
  const {mainStore, userStore} = useStoreContext();
  const {data: userCart} = useGetUserCart(userStore?.user?.id);

  return (
    <header className='header bg-orange-400'>
      <div className="header-container max-w-7xl mx-auto flex items-center justify-between lg:min-h-16 xs:max-h-14 py-4 w-11/12">
        <ul className="header-ul flex justify-center items-center gap-x-12">
          <Link href='/'><Image className='lg:max-w-28 xs:max-w-24' src={logo} alt='logo' width={150} height={150}/></Link>
        </ul>
        <div className='md:flex xs:hidden gap-x-4'>
          <button onClick={() => mainStore.toggler('auth', true)} className='p-3 rounded-full shadow-md bg-white transition'><UserRound color='#000' size={20} /></button>
          <div className="relative inline-block">
            {/* Кнопка корзины */}
            <button
              onClick={() => mainStore.toggler('cart', true)}
              className="bg-white p-3 rounded-full shadow-md transition"
            >
              <ShoppingCart color="#000" size={22} />
            </button>

            {/* Бейдж с количеством */}
            {userCart && userCart?.items?.length >= 1 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow">
                {userCart?.items.length}
              </span>
            )}
          </div>
        </div>

        <div onClick={() => mainStore.toggler('menu', !mainStore.menu)} className={classNames(`tham md:hidden tham-e-squeeze z-50 tham-w-6`, { 'tham-active': mainStore.menu })}>
          <div className="tham-box">
            <div className="tham-inner bg-white" />
          </div>
        </div>
      </div>
    </header>
  )
}
