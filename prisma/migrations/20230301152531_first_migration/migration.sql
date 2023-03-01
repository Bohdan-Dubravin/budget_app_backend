/*
  Warnings:

  - You are about to drop the column `title` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `TotalMounthBudget` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "title";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "TotalMounthBudget",
ADD COLUMN     "TotalMonthBudget" DOUBLE PRECISION,
ADD COLUMN     "currencyFormat" TEXT;
