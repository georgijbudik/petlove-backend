/*
  Warnings:

  - You are about to drop the `WorkDay` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `workHours` to the `Friend` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WorkDay" DROP CONSTRAINT "WorkDay_friendId_fkey";

-- AlterTable
ALTER TABLE "Friend" ADD COLUMN     "workHours" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "News" ALTER COLUMN "date" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "WorkDay";
