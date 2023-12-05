import { prisma } from "@/lib/prisma";
import { MessageType } from "@prisma/client";

export async function getChannels() {
  const channels = await prisma.channel.findMany();
  return channels;
}

export async function getChannelName({ id }: { id: string }) {
  const channel = await prisma.channel.findUnique({ where: { id } });
  return channel?.name;
}

export async function getLatestMessageIsoDate() {
  const latestMessage = await prisma.message.findFirstOrThrow({
    orderBy: { ts: "desc" },
  });
  return latestMessage.isoDate;
}

function buildMessageSearchQuery(search?: string) {
  if (!search) return null;

  return {
    OR: [
      { text: { contains: search } },
      { isoDate: { contains: search } },
      { user: { name: { contains: search } } },
    ],
  };
}

const onlyToplevelMessages = {
  OR: [{ type: MessageType.NORMAL }, { type: MessageType.THREAD_PARENT }],
};

export async function getChannelMessages({
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

  const messages = await prisma.message.findMany({
    take: take,
    skip: skip,
    orderBy: { ts: "asc" },
    include: { user: true, threadReplies: { include: { user: true } } },
    where: {
      channelId: channelId,
      ...onlyToplevelMessages,
      ...searchQuery,
    },
  });

  return messages;
}
export async function getChannelMessagesCount({
  channelId,
  search,
}: {
  channelId: string;
  search?: string;
}) {
  const searchQuery = buildMessageSearchQuery(search);

  const messageCount = await prisma.message.count({
    where: { channelId: channelId, ...onlyToplevelMessages, ...searchQuery },
  });

  return messageCount;
}
