/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Notice` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Notice` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Notice" DROP CONSTRAINT "Notice_ownerId_fkey";

-- AlterTable
ALTER TABLE "Notice" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "ownerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Notice" ADD CONSTRAINT "Notice_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
