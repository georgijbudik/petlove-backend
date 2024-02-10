-- DropForeignKey
ALTER TABLE "WorkDay" DROP CONSTRAINT "WorkDay_friendId_fkey";

-- AlterTable
ALTER TABLE "WorkDay" ALTER COLUMN "friendId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "WorkDay" ADD CONSTRAINT "WorkDay_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "Friend"("id") ON DELETE SET NULL ON UPDATE CASCADE;
