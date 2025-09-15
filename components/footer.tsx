'use client'

import Image from 'next/image'
import Link from 'next/link'
import logo from '@/public/tasty_pizza.png'

export default function Footer() {
  return (
    <footer className="w-full bg-orange-400 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Логотип */}
        <div className="flex items-center gap-2">
          <Link href={'/'}>
            <Image 
              src={logo} 
              alt="Логотип" 
              width={100} 
              height={100} 
              className="rounded-md"
            />
          </Link>
        </div>

        {/* Контактные данные */}
        <div className="text-center md:text-left text-sm text-white">
            <p>Київ, Україна</p>
          <p>
            <a href="mailto:info@tastypizza.com" className="hover:underline">info@tastypizza.com</a>
          </p>
            <p>+38 (050) 123-45-67</p>
        </div>

        {/* Навигация */}
        <div className="flex gap-4 text-sm md:flex-row xs:flex-col justify-center items-center">
          <Link href="/about" className="text-white">
            <span>Про нас</span>
          </Link>
          <Link href="/contacts" className="text-white">
           <span>Контакти</span>
          </Link>
          <Link href="/privacy" className="text-white">
            <span>Політика конфіденційності</span>
          </Link>
        </div>
      </div>

      {/* Нижняя часть */}
      <div className="border-white text-white text-center py-4 text-xs dark:text-gray-400">
        <span>© {new Date().getFullYear()} Tasty Pizza. Усі права захищені.</span>
      </div>
    </footer>
  )
}
