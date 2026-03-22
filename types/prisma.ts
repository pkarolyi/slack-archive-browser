import { Prisma } from "@/prisma/generated/prisma/client";

export type MessageWithUserReactionThread = Prisma.MessageGetPayload<{
  include: {
    user: true;
    reactions: { include: { user: true } };
    threadReplies: {
      include: { user: true; reactions: { include: { user: true } } };
    };
  };
}>;

export type MessageWithUserAndChannel = Prisma.MessageGetPayload<{
  include: { user: true; channel: true };
}>;

export type Channel = Prisma.ChannelGetPayload<{}>;

export type Reaction = Prisma.ReactionGetPayload<{
  include: { user: true };
}>;
