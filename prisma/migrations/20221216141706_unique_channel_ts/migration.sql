/*
  Warnings:

  - A unique constraint covering the columns `[channelId,ts]` on the table `ArchiveMessage` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ArchiveMessage" ALTER COLUMN "ts" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ArchiveMessage_channelId_ts_key" ON "ArchiveMessage"("channelId", "ts");
