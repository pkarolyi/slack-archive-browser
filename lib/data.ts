import { prisma } from "@/lib/prisma";

export async function getChannels() {
  const channels = await prisma.archiveChannel.findMany();
  return channels;
}

export async function getChannelGeneral() {
  const channel = await prisma.archiveChannel.findFirstOrThrow({
    where: { isGeneral: true },
  });
  return channel;
}

export async function getChannelName({ id }: { id: string }) {
  const channel = await prisma.archiveChannel.findUnique({ where: { id } });
  return channel?.name;
}

function buildMessageSearchQuery(search?: string) {
  if (!search) return null;

  return {
    OR: [
      { text: { contains: search } },
      { isoDate: { contains: search } },
      { user: { name: { contains: search } } },
      { threadMessages: { some: { text: { contains: search } } } },
    ],
  };
}

export async function getMessages({
  channelId,
  skip,
  take,
  search,
}: {
  channelId: string;
  skip: number;
  take: number;
  search?: string;
}) {
  const searchQuery = buildMessageSearchQuery(search);

  const messages = await prisma.archiveMessage.findMany({
    take: take,
    skip: skip,
    orderBy: { ts: "asc" },
    include: { user: true, threadMessages: true },
    where: { channelId: channelId, ...searchQuery },
  });

  return messages;
}
export async function getMessagesCount({
  channelId,
  search,
}: {
  channelId: string;
  search?: string;
}) {
  const searchQuery = buildMessageSearchQuery(search);

  const messageCount = await prisma.archiveMessage.count({
    where: { channelId: channelId, ...searchQuery },
  });

  return messageCount;
}
