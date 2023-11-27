/*
  Warnings:

  - You are about to drop the column `name` on the `ArchiveMessage` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slackId]` on the table `ArchiveChannel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[channelId,userId,ts]` on the table `ArchiveMessage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slackId` to the `ArchiveChannel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ArchiveMessage` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ArchiveMessage_channelId_ts_key";

-- AlterTable
ALTER TABLE "ArchiveChannel" ADD COLUMN     "slackId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ArchiveMessage" DROP COLUMN "name",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ArchiveUser" (
    "id" TEXT NOT NULL,
    "slackId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "ArchiveUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ArchiveUser_slackId_key" ON "ArchiveUser"("slackId");

-- CreateIndex
CREATE UNIQUE INDEX "ArchiveChannel_slackId_key" ON "ArchiveChannel"("slackId");

-- CreateIndex
CREATE UNIQUE INDEX "ArchiveMessage_channelId_userId_ts_key" ON "ArchiveMessage"("channelId", "userId", "ts");

-- AddForeignKey
ALTER TABLE "ArchiveMessage" ADD CONSTRAINT "ArchiveMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ArchiveUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
