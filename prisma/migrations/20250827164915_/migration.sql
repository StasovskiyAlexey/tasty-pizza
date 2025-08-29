/*
  Warnings:

  - You are about to drop the column `collectionId` on the `ingridient` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `ingridient` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."ingridient" DROP CONSTRAINT "ingridient_collectionId_fkey";

-- AlterTable
ALTER TABLE "public"."ingridient" DROP COLUMN "collectionId",
DROP COLUMN "price";

-- CreateTable
CREATE TABLE "public"."ingredient_on_collections" (
    "ingredientId" INTEGER NOT NULL,
    "collectionId" INTEGER NOT NULL,

    CONSTRAINT "ingredient_on_collections_pkey" PRIMARY KEY ("ingredientId","collectionId")
);

-- AddForeignKey
ALTER TABLE "public"."ingredient_on_collections" ADD CONSTRAINT "ingredient_on_collections_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "public"."ingridient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ingredient_on_collections" ADD CONSTRAINT "ingredient_on_collections_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "public"."ingridient_collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
