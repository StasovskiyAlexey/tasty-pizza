/*
  Warnings:

  - You are about to drop the `user_cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_orders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."user_cart" DROP CONSTRAINT "user_cart_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_orders" DROP CONSTRAINT "user_orders_userId_fkey";

-- DropTable
DROP TABLE "public"."user_cart";

-- DropTable
DROP TABLE "public"."user_orders";

-- CreateTable
CREATE TABLE "public"."UserCart" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserCart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserCartItem" (
    "id" SERIAL NOT NULL,
    "cartId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "UserCartItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Order" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OrderItem" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "pizzaId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserCart_userId_key" ON "public"."UserCart"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserCartItem_cartId_productId_key" ON "public"."UserCartItem"("cartId", "productId");

-- AddForeignKey
ALTER TABLE "public"."UserCart" ADD CONSTRAINT "UserCart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserCartItem" ADD CONSTRAINT "UserCartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "public"."UserCart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserCartItem" ADD CONSTRAINT "UserCartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."pizza"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "public"."pizza"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
