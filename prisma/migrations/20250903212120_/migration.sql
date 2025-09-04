/*
  Warnings:

  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserCart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserCartItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."OrderItem" DROP CONSTRAINT "OrderItem_pizzaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserCart" DROP CONSTRAINT "UserCart_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserCartItem" DROP CONSTRAINT "UserCartItem_cartId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserCartItem" DROP CONSTRAINT "UserCartItem_productId_fkey";

-- DropTable
DROP TABLE "public"."Order";

-- DropTable
DROP TABLE "public"."OrderItem";

-- DropTable
DROP TABLE "public"."UserCart";

-- DropTable
DROP TABLE "public"."UserCartItem";

-- CreateTable
CREATE TABLE "public"."user-cart" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "user-cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user-cart-item" (
    "id" SERIAL NOT NULL,
    "cartId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "user-cart-item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."order" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."order-item" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "pizzaId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "order-item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user-cart_userId_key" ON "public"."user-cart"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user-cart-item_cartId_productId_key" ON "public"."user-cart-item"("cartId", "productId");

-- AddForeignKey
ALTER TABLE "public"."user-cart" ADD CONSTRAINT "user-cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user-cart-item" ADD CONSTRAINT "user-cart-item_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "public"."user-cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user-cart-item" ADD CONSTRAINT "user-cart-item_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."pizza"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order" ADD CONSTRAINT "order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order-item" ADD CONSTRAINT "order-item_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order-item" ADD CONSTRAINT "order-item_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "public"."pizza"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
