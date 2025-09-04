-- DropIndex
DROP INDEX "public"."user_username_key";

-- CreateTable
CREATE TABLE "public"."user_cart" (
    "id" SERIAL NOT NULL,
    "cartId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "user_cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_orders" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "user_orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_cart_userId_key" ON "public"."user_cart"("userId");

-- AddForeignKey
ALTER TABLE "public"."user_cart" ADD CONSTRAINT "user_cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_orders" ADD CONSTRAINT "user_orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
