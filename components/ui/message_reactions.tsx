import type { Reaction } from "@/types/prisma";
import Emoji from "./emoji";

export default function MessageReactions({
  reactions,
}: {
  reactions: Reaction[];
}) {
  if (reactions.length === 0) return null;

  // categorize and count reactions by name
  const reactionCounts = reactions.reduce(
    (acc, reaction) => {
      acc[reaction.name] = (acc[reaction.name] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div className="flex gap-2">
      {Object.keys(reactionCounts).map((name) => (
        <span
          key={name}
          className="group/reaction relative rounded-md border border-stone-400 bg-stone-50 px-2 py-1 hover:cursor-default"
        >
          <Emoji name={name} className="mr-2" />
          {reactionCounts[name]}
          <span className="absolute -top-2 -left-2 hidden w-48 -translate-y-full flex-col gap-1 rounded-md border border-stone-400 bg-stone-50 px-3 py-2 group-hover/reaction:flex">
            {reactions
              .filter((reaction) => reaction.name === name)
              .map((reaction) => (
                <p key={reaction.id}>{reaction.user.name}</p>
              ))}
          </span>
        </span>
      ))}
    </div>
  );
}
