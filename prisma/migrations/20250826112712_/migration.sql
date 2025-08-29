-- CreateTable
CREATE TABLE "public"."Pizza" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Pizza_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Ingridient" (
    "id" SERIAL NOT NULL,
    "ingridient_name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "collectionId" INTEGER NOT NULL,

    CONSTRAINT "Ingridient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."IngridientCollection" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pizzaId" INTEGER NOT NULL,

    CONSTRAINT "IngridientCollection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Ingridient" ADD CONSTRAINT "Ingridient_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "public"."IngridientCollection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."IngridientCollection" ADD CONSTRAINT "IngridientCollection_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "public"."Pizza"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
