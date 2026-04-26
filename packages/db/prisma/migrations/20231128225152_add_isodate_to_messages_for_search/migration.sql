/*
  Warnings:

  - Added the required column `isoDate` to the `ArchiveMessage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isoDate` to the `ArchiveThreadMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ArchiveMessage" ADD COLUMN     "isoDate" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ArchiveThreadMessage" ADD COLUMN     "isoDate" TEXT NOT NULL;
