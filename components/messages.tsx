import { MessageWithUser } from "@/types/prisma";
import Message from "./message";

export default function Messages({
  messages,
}: {
  messages: MessageWithUser[];
}) {
  return (
    <div className="h-full overflow-y-scroll overflow-x-hidden px-4 py-2">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
}
