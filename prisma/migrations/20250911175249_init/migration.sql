-- CreateTable
CREATE TABLE "public"."pizza" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "weight" INTEGER,
    "category" TEXT,

    CONSTRAINT "pizza_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pizza_variant" (
    "id" SERIAL NOT NULL,
    "pizzaId" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "dough" TEXT NOT NULL,
    "weight" INTEGER,
    "price" INTEGER NOT NULL,

    CONSTRAINT "pizza_variant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pizza_collection" (
    "pizza_name" TEXT NOT NULL,
    "pizzaId" INTEGER NOT NULL,
    "collectionId" INTEGER NOT NULL,

    CONSTRAINT "pizza_collection_pkey" PRIMARY KEY ("pizzaId","collectionId")
);

-- CreateTable
CREATE TABLE "public"."ingridient_collection" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ingridient_collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ingridient" (
    "id" SERIAL NOT NULL,
    "ingridient_name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "slug" TEXT,

    CONSTRAINT "ingridient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ingredient_on_collections" (
    "ingredientId" INTEGER NOT NULL,
    "collectionId" INTEGER NOT NULL,

    CONSTRAINT "ingredient_on_collections_pkey" PRIMARY KEY ("ingredientId","collectionId")
);

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
    "variantId" INTEGER NOT NULL DEFAULT 1,
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
    "variantId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "order-item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pizza_variant_pizzaId_size_dough_key" ON "public"."pizza_variant"("pizzaId", "size", "dough");

-- CreateIndex
CREATE UNIQUE INDEX "user-cart_userId_key" ON "public"."user-cart"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user-cart-item_cartId_variantId_key" ON "public"."user-cart-item"("cartId", "variantId");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "public"."user"("email");

-- AddForeignKey
ALTER TABLE "public"."pizza_variant" ADD CONSTRAINT "pizza_variant_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "public"."pizza"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pizza_collection" ADD CONSTRAINT "pizza_collection_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "public"."ingridient_collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pizza_collection" ADD CONSTRAINT "pizza_collection_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "public"."pizza"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ingredient_on_collections" ADD CONSTRAINT "ingredient_on_collections_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "public"."ingridient_collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ingredient_on_collections" ADD CONSTRAINT "ingredient_on_collections_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "public"."ingridient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user-cart" ADD CONSTRAINT "user-cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user-cart-item" ADD CONSTRAINT "user-cart-item_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "public"."user-cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user-cart-item" ADD CONSTRAINT "user-cart-item_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "public"."pizza_variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order" ADD CONSTRAINT "order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order-item" ADD CONSTRAINT "order-item_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order-item" ADD CONSTRAINT "order-item_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "public"."pizza"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order-item" ADD CONSTRAINT "order-item_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "public"."pizza_variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
