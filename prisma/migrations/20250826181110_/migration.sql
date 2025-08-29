/*
  Warnings:

  - You are about to drop the `_CollectionIngredients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PizzaCollections` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `collectionId` to the `ingridient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."_CollectionIngredients" DROP CONSTRAINT "_CollectionIngredients_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_CollectionIngredients" DROP CONSTRAINT "_CollectionIngredients_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_PizzaCollections" DROP CONSTRAINT "_PizzaCollections_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_PizzaCollections" DROP CONSTRAINT "_PizzaCollections_B_fkey";

-- AlterTable
ALTER TABLE "public"."ingridient" ADD COLUMN     "collectionId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."_CollectionIngredients";

-- DropTable
DROP TABLE "public"."_PizzaCollections";

-- CreateTable
CREATE TABLE "public"."pizza_collection" (
    "pizza_name" TEXT NOT NULL,
    "pizzaId" INTEGER NOT NULL,
    "collectionId" INTEGER NOT NULL,

    CONSTRAINT "pizza_collection_pkey" PRIMARY KEY ("pizzaId","collectionId")
);

-- AddForeignKey
ALTER TABLE "public"."pizza_collection" ADD CONSTRAINT "pizza_collection_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "public"."pizza"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pizza_collection" ADD CONSTRAINT "pizza_collection_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "public"."ingridient_collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ingridient" ADD CONSTRAINT "ingridient_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "public"."ingridient_collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
