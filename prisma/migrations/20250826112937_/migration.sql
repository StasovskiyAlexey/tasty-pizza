/*
  Warnings:

  - You are about to drop the `Ingridient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IngridientCollection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pizza` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Ingridient" DROP CONSTRAINT "Ingridient_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."IngridientCollection" DROP CONSTRAINT "IngridientCollection_pizzaId_fkey";

-- DropTable
DROP TABLE "public"."Ingridient";

-- DropTable
DROP TABLE "public"."IngridientCollection";

-- DropTable
DROP TABLE "public"."Pizza";

-- CreateTable
CREATE TABLE "public"."pizza" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "pizza_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ingridient" (
    "id" SERIAL NOT NULL,
    "ingridient_name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "collectionId" INTEGER NOT NULL,

    CONSTRAINT "ingridient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ingridient_collection" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pizzaId" INTEGER NOT NULL,

    CONSTRAINT "ingridient_collection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."ingridient" ADD CONSTRAINT "ingridient_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "public"."ingridient_collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ingridient_collection" ADD CONSTRAINT "ingridient_collection_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "public"."pizza"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
