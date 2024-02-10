/*
  Warnings:

  - You are about to drop the column `user` on the `Notice` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Notice` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `Notice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Notice" DROP CONSTRAINT "Notice_userId_fkey";

-- AlterTable
ALTER TABLE "Notice" DROP COLUMN "user",
DROP COLUMN "userId",
ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Notice" ADD CONSTRAINT "Notice_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
