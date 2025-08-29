/*
  Warnings:

  - You are about to drop the column `collectionId` on the `ingridient` table. All the data in the column will be lost.
  - You are about to drop the column `pizzaId` on the `ingridient_collection` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."ingridient" DROP CONSTRAINT "ingridient_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ingridient_collection" DROP CONSTRAINT "ingridient_collection_pizzaId_fkey";

-- AlterTable
ALTER TABLE "public"."ingridient" DROP COLUMN "collectionId";

-- AlterTable
ALTER TABLE "public"."ingridient_collection" DROP COLUMN "pizzaId";

-- CreateTable
CREATE TABLE "public"."_CollectionIngredients" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CollectionIngredients_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_PizzaCollections" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PizzaCollections_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CollectionIngredients_B_index" ON "public"."_CollectionIngredients"("B");

-- CreateIndex
CREATE INDEX "_PizzaCollections_B_index" ON "public"."_PizzaCollections"("B");

-- AddForeignKey
ALTER TABLE "public"."_CollectionIngredients" ADD CONSTRAINT "_CollectionIngredients_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."ingridient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CollectionIngredients" ADD CONSTRAINT "_CollectionIngredients_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."ingridient_collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PizzaCollections" ADD CONSTRAINT "_PizzaCollections_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."ingridient_collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PizzaCollections" ADD CONSTRAINT "_PizzaCollections_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."pizza"("id") ON DELETE CASCADE ON UPDATE CASCADE;
