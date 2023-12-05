import { getChannelMessages } from "@/lib/data";
import Message from "./ui/message";

export default async function Messages({
  channelId,
  search,
  take,
  skip,
}: {
  channelId: string;
  search?: string;
  take: number;
  skip: number;
}) {
  const messages = await getChannelMessages({ channelId, search, take, skip });

  return (
    <div className="h-full overflow-y-scroll overflow-x-hidden py-1 lg:py-2 lg:px-4">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
}
