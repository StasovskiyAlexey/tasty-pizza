/*
  Warnings:

  - Changed the type of `apartment` on the `order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `house` on the `order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."order" DROP COLUMN "apartment",
ADD COLUMN     "apartment" INTEGER NOT NULL,
DROP COLUMN "house",
ADD COLUMN     "house" INTEGER NOT NULL;
