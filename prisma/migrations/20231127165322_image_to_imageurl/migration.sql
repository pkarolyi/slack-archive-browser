/*
  Warnings:

  - You are about to drop the column `image` on the `ArchiveUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ArchiveUser" DROP COLUMN "image",
ADD COLUMN     "imageUrl" TEXT;
