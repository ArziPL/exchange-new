/*
  Warnings:

  - You are about to alter the column `price` on the `Prints` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `volume24h` on the `Prints` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `circulatingSupply` on the `Prints` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `marketDominance` on the `Prints` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE "Prints" ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "volume24h" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "circulatingSupply" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "marketDominance" SET DATA TYPE DECIMAL(65,30);
