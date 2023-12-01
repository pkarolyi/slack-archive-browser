/*
  Warnings:

  - You are about to drop the `ArchiveChannel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ArchiveMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ArchiveUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('NORMAL', 'THREAD_PARENT', 'THREAD_CHILD', 'THREAD_CHILD_BROADCAST');

-- DropForeignKey
ALTER TABLE "ArchiveMessage" DROP CONSTRAINT "ArchiveMessage_channelId_fkey";

-- DropForeignKey
ALTER TABLE "ArchiveMessage" DROP CONSTRAINT "ArchiveMessage_userId_fkey";

-- DropTable
DROP TABLE "ArchiveChannel";

-- DropTable
DROP TABLE "ArchiveMessage";

-- DropTable
DROP TABLE "ArchiveUser";

-- DropEnum
DROP TYPE "ArchiveMessageType";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Channel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isGeneral" BOOLEAN NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "ts" TEXT NOT NULL,
    "isoDate" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "type" "MessageType" NOT NULL,
    "channelId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "parentId" TEXT,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Channel_name_key" ON "Channel"("name");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
