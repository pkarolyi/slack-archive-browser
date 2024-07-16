import { Prisma } from "@prisma/client";

const messageWithUserAndThread = Prisma.validator<Prisma.MessageDefaultArgs>()({
  include: { user: true, threadReplies: { include: { user: true } } },
});

export type MessageWithUserAndThread = Prisma.MessageGetPayload<
  typeof messageWithUserAndThread
>;

const messageWithUserAndChannel = Prisma.validator<Prisma.MessageDefaultArgs>()(
  {
    include: { user: true, channel: true },
  },
);

export type MessageWithUserAndChannel = Prisma.MessageGetPayload<
  typeof messageWithUserAndChannel
>;

const channel = Prisma.validator<Prisma.ChannelDefaultArgs>()({});

export type Channel = Prisma.ChannelGetPayload<typeof channel>;
