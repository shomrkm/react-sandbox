-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cart" INTEGER NOT NULL,
    "stocks" INTEGER NOT NULL,
    "imagePath" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
