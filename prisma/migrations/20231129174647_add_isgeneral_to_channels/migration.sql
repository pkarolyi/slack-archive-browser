/*
  Warnings:

  - Added the required column `isGeneral` to the `ArchiveChannel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ArchiveChannel" ADD COLUMN     "isGeneral" BOOLEAN NOT NULL;
