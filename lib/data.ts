import { prisma } from "@/lib/prisma";
import { MessageType } from "@prisma/client";
import "server-only";

export async function getChannels() {
  const channels = await prisma.channel.findMany();
  return channels;
}

export async function getGeneralChannel() {
  const channel = await prisma.channel.findFirst({
    where: { isGeneral: true },
  });
  return channel;
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

export async function getMessagePageFromTs({
  channelId,
  take,
  ts,
}: {
  channelId: string;
  take: number;
  ts?: string;
}) {
  if (!ts) return 0;

  const message = await prisma.message.findFirst({
    where: { channelId, ts },
  });

  if (!message) return 0;

  const messageIndex = await prisma.message.count({
    where: {
      channelId,
      ...onlyToplevelMessages,
      ts: { lte: message.ts },
    },
  });

  const page = Math.ceil(messageIndex / take);

  return page;
}

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
    take,
    skip,
    orderBy: { ts: "asc" },
    include: { user: true, threadReplies: { include: { user: true } } },
    where: {
      channelId,
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
    where: { channelId, ...onlyToplevelMessages },
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
