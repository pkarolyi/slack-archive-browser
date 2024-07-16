import { getChannelMessages } from "@/lib/data";
import Message from "./ui/message";
import { HighlightedMessage } from "./ui/highlighted_message";

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
  const messages = await getChannelMessages({ channelId, take, skip });

  return (
    <div className="h-full overflow-x-hidden overflow-y-scroll py-1 lg:px-4 lg:py-2">
      {messages.map((message) => (
        <>
          {message.ts === highlightedTs ? (
            <HighlightedMessage message={message} />
          ) : (
            <Message message={message} />
          )}
        </>
      ))}
    </div>
  );
}
