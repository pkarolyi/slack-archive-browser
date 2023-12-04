import { Prisma } from "@prisma/client";

const messageWithUserAndThread = Prisma.validator<Prisma.MessageDefaultArgs>()({
  include: { user: true, threadReplies: { include: { user: true } } },
});

export type MessageWithUserAndThread = Prisma.MessageGetPayload<
  typeof messageWithUserAndThread
>;

const channel = Prisma.validator<Prisma.ChannelDefaultArgs>()({});

export type Channel = Prisma.ChannelGetPayload<typeof channel>;
