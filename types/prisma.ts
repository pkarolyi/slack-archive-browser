import { Prisma } from "@prisma/client";

const messageWithUserReactionThread =
  Prisma.validator<Prisma.MessageDefaultArgs>()({
    include: {
      user: true,
      reactions: { include: { user: true } },
      threadReplies: {
        include: { user: true, reactions: { include: { user: true } } },
      },
    },
  });

export type MessageWithUserReactionThread = Prisma.MessageGetPayload<
  typeof messageWithUserReactionThread
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

const reaction = Prisma.validator<Prisma.ReactionDefaultArgs>()({
  include: { user: true },
});

export type Reaction = Prisma.ReactionGetPayload<typeof reaction>;
