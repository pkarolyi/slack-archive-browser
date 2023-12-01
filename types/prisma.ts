import { Prisma } from "@prisma/client";

const messageWithUser = Prisma.validator<Prisma.MessageDefaultArgs>()({
  include: { user: true },
});

export type MessageWithUser = Prisma.MessageGetPayload<typeof messageWithUser>;

const channel = Prisma.validator<Prisma.ChannelDefaultArgs>()({});

export type Channel = Prisma.ChannelGetPayload<typeof channel>;
