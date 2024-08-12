/*
  Warnings:

  - You are about to drop the column `archiveId` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the `Archive` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Archive" DROP CONSTRAINT "Archive_userId_fkey";

-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_archiveId_fkey";

-- AlterTable
ALTER TABLE "Bookmark" DROP COLUMN "archiveId",
ADD COLUMN     "archive" BOOLEAN;

-- DropTable
DROP TABLE "Archive";
