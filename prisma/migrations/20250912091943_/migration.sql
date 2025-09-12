/*
  Warnings:

  - You are about to drop the column `deliveryAddress` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `userAdresses` on the `user` table. All the data in the column will be lost.
  - Added the required column `apartment` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `house` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."order" DROP COLUMN "deliveryAddress",
ADD COLUMN     "apartment" TEXT NOT NULL,
ADD COLUMN     "house" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" INTEGER NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."user" DROP COLUMN "userAdresses";
