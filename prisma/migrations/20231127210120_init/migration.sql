-- CreateTable
CREATE TABLE "ArchiveUser" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,

    CONSTRAINT "ArchiveUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArchiveChannel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ArchiveChannel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArchiveMessage" (
    "id" TEXT NOT NULL,
    "ts" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isThread" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ArchiveMessage_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "ArchiveChannel_name_key" ON "ArchiveChannel"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ArchiveMessage_channelId_ts_key" ON "ArchiveMessage"("channelId", "ts");

-- CreateIndex
CREATE UNIQUE INDEX "ArchiveThreadMessage_parentId_ts_key" ON "ArchiveThreadMessage"("parentId", "ts");

-- AddForeignKey
ALTER TABLE "ArchiveMessage" ADD CONSTRAINT "ArchiveMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ArchiveUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArchiveMessage" ADD CONSTRAINT "ArchiveMessage_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "ArchiveChannel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArchiveThreadMessage" ADD CONSTRAINT "ArchiveThreadMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ArchiveUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArchiveThreadMessage" ADD CONSTRAINT "ArchiveThreadMessage_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "ArchiveMessage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
