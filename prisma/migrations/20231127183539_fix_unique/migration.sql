/*
  Warnings:

  - A unique constraint covering the columns `[channelId,userId,ts]` on the table `ArchiveMessage` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[parentId,userId,ts]` on the table `ArchiveThreadMessage` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ArchiveMessage_userId_ts_key";

-- DropIndex
DROP INDEX "ArchiveThreadMessage_userId_ts_key";

-- CreateIndex
CREATE UNIQUE INDEX "ArchiveMessage_channelId_userId_ts_key" ON "ArchiveMessage"("channelId", "userId", "ts");

-- CreateIndex
CREATE UNIQUE INDEX "ArchiveThreadMessage_parentId_userId_ts_key" ON "ArchiveThreadMessage"("parentId", "userId", "ts");
