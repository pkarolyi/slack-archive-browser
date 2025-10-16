import { getChannelMessages, getAllUsers, getChannels } from "@/lib/data";
import Message from "./ui/message";

export default async function Messages({
  channelId,
  take,
  skip,
  highlightedTs,
}: Readonly<{
  channelId: string;
  take: number;
  skip: number;
  highlightedTs?: string;
}>) {
  const [messages, users, channels] = await Promise.all([
    getChannelMessages({ channelId, take, skip }),
    getAllUsers(),
    getChannels(),
  ]);

  const userMap = new Map(users.map((user) => [user.id, user.name]));
  const channelMap = new Map(channels.map((channel) => [channel.id, channel.name]));

  return (
    <div className="h-full overflow-x-hidden overflow-y-scroll py-1 lg:px-4 lg:py-2">
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
          highlightedTs={highlightedTs}
          userMap={userMap}
          channelMap={channelMap}
        />
      ))}
    </div>
  );
}
