-- CreateTable
CREATE TABLE "ArchiveChannel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ArchiveChannel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArchiveMessage" (
    "id" TEXT NOT NULL,
    "ts" TIMESTAMPTZ NOT NULL,
    "text" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,

    CONSTRAINT "ArchiveMessage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ArchiveMessage" ADD CONSTRAINT "ArchiveMessage_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "ArchiveChannel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
