/*
  Warnings:

  - You are about to drop the column `slackId` on the `ArchiveChannel` table. All the data in the column will be lost.
  - You are about to drop the column `slackId` on the `ArchiveUser` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,ts]` on the table `ArchiveMessage` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ArchiveChannel_slackId_key";

-- DropIndex
DROP INDEX "ArchiveMessage_channelId_userId_ts_key";

-- DropIndex
DROP INDEX "ArchiveUser_slackId_key";

-- AlterTable
ALTER TABLE "ArchiveChannel" DROP COLUMN "slackId";

-- AlterTable
ALTER TABLE "ArchiveMessage" ADD COLUMN     "isThread" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ArchiveUser" DROP COLUMN "slackId";

-- CreateTable
CREATE TABLE "ArchiveThreadMessage" (
    "id" TEXT NOT NULL,
    "ts" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,

    CONSTRAINT "ArchiveThreadMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ArchiveThreadMessage_userId_ts_key" ON "ArchiveThreadMessage"("userId", "ts");

-- CreateIndex
CREATE UNIQUE INDEX "ArchiveMessage_userId_ts_key" ON "ArchiveMessage"("userId", "ts");

-- AddForeignKey
ALTER TABLE "ArchiveThreadMessage" ADD CONSTRAINT "ArchiveThreadMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ArchiveUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArchiveThreadMessage" ADD CONSTRAINT "ArchiveThreadMessage_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "ArchiveMessage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
