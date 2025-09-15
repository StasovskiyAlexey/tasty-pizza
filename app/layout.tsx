import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";

import { Nunito } from 'next/font/google'
import PizzaModal from "@/components/modals/choose-pizza-modal";
import AppProvider from "@/providers/app-provider";
import CartDrawer from "@/components/cart/cart-drawer";
import AuthDrawer from "@/components/user/user-drawer";
import { Toaster } from "sonner";
import Head from "next/head";
import Menu from "@/components/menu";
import PaymentDrawer from "@/components/order/order-drawer";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Найсмачніші піци у Києві | Tasty Pizza",
  description: "Найсмачніші піци у Києві | Tasty Pizza",
};

const nunito = Nunito({
  subsets: ['cyrillic'],
  weight: '600',
  variable: '--font-nunito'
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <Head>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <body className={`${nunito.variable}`}>
        <AppProvider>
          <PaymentDrawer/>
          <AuthDrawer/>
          <CartDrawer/>
          <PizzaModal/>     

          <Menu/>
          <Header/>
          <Toaster />
          
          {children}
          <Footer/>
        </AppProvider>
      </body>
    </html>
  );
}

// Доделать косяки, например в начале есть доступ к заказу хотя нет товаров, и прочее, в общем пофиксить все мелкие мелочи и выложить в портфолио