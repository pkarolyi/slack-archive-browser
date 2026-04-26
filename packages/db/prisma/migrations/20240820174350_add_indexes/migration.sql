-- CreateIndex
CREATE INDEX "Message_ts_idx" ON "Message"("ts");

-- CreateIndex
CREATE INDEX "Message_channelId_idx" ON "Message"("channelId");

-- CreateIndex
CREATE INDEX "Message_userId_idx" ON "Message"("userId");
