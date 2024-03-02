import { prisma } from "@/lib/prisma";
import { MessageType } from "@prisma/client";
import "server-only";

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

const onlyToplevelMessages = {
  OR: [{ type: MessageType.NORMAL }, { type: MessageType.THREAD_PARENT }],
};

export async function getChannelMessages({
  channelId,
  skip,
  take,
}: {
  channelId: string;
  skip: number;
  take: number;
}) {
  const messages = await prisma.message.findMany({
    take: take,
    skip: skip,
    orderBy: { ts: "asc" },
    include: { user: true, threadReplies: { include: { user: true } } },
    where: {
      channelId: channelId,
      ...onlyToplevelMessages,
    },
  });

  return messages;
}
export async function getChannelMessagesCount({
  channelId,
}: {
  channelId: string;
}) {
  const messageCount = await prisma.message.count({
    where: { channelId: channelId, ...onlyToplevelMessages },
  });

  return messageCount;
}

export async function searchMessages({ term }: { term?: string }) {
  if (!term) return [];

  const messages = await prisma.message.findMany({
    where: {
      AND: [
        {
          OR: [
            { text: { contains: term } },
            { isoDate: { contains: term } },
            { user: { name: { contains: term } } },
          ],
        },
        onlyToplevelMessages,
      ],
    },
    orderBy: { ts: "asc" },
    include: { user: true, channel: true },
    take: 100,
  });

  return messages;
}
