/*
  Warnings:

  - Added the required column `deliveryAddress` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `order-item` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."OrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'DELIVERING', 'COMPLETED', 'CANCELED');

-- AlterTable
ALTER TABLE "public"."order" ADD COLUMN     "deliveryAddress" TEXT NOT NULL,
ADD COLUMN     "status" "public"."OrderStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "public"."order-item" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "userAdresses" TEXT[];
