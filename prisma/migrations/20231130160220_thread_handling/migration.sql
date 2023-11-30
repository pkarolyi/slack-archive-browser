/*
  Warnings:

  - You are about to drop the column `isThread` on the `ArchiveMessage` table. All the data in the column will be lost.
  - You are about to drop the `ArchiveThreadMessage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `ArchiveMessage` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ArchiveMessageType" AS ENUM ('NORMAL', 'THREAD_PARENT', 'THREAD_CHILD', 'THREAD_CHILD_BROADCAST');

-- DropForeignKey
ALTER TABLE "ArchiveThreadMessage" DROP CONSTRAINT "ArchiveThreadMessage_parentId_fkey";

-- DropForeignKey
ALTER TABLE "ArchiveThreadMessage" DROP CONSTRAINT "ArchiveThreadMessage_userId_fkey";

-- DropIndex
DROP INDEX "ArchiveMessage_channelId_ts_key";

-- AlterTable
ALTER TABLE "ArchiveMessage" DROP COLUMN "isThread",
ADD COLUMN     "parentId" TEXT,
ADD COLUMN     "type" "ArchiveMessageType" NOT NULL;

-- DropTable
DROP TABLE "ArchiveThreadMessage";
