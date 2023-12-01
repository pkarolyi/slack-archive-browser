import { MessageWithUser } from "@/types/prisma";
import Message from "./message";

export default function Messages({
  messages,
}: {
  messages: MessageWithUser[];
}) {
  return (
    <div className="h-full overflow-y-scroll overflow-x-hidden py-1 lg:py-2 lg:px-4">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
}
