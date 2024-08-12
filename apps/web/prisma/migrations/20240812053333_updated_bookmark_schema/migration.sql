/*
  Warnings:

  - You are about to drop the column `favoriteId` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the `Favorite` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_favoriteId_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_userId_fkey";

-- AlterTable
ALTER TABLE "Bookmark" DROP COLUMN "favoriteId",
ADD COLUMN     "favorite" BOOLEAN;

-- DropTable
DROP TABLE "Favorite";
