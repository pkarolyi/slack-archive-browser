import { getMessages } from "@/lib/data";
import Message from "./message";

export default async function Messages({
  channelId,
  search,
  page,
  size,
}: {
  channelId: string;
  search?: string;
  page: number;
  size: number;
}) {
  const skip = (page - 1) * size;
  const messages = await getMessages({ channelId, search, take: size, skip });

  return (
    <div className="h-full overflow-y-scroll overflow-x-hidden px-4 py-2">
      {messages.map((message) => (
        <Message
          key={message.id}
          text={message.text}
          userName={message.user.name}
          date={message.isoDate}
          userImageUrl={message.user.imageUrl}
        />
      ))}
    </div>
  );
}
