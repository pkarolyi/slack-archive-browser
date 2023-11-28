/* eslint-disable @next/next/no-img-element */
import Paginator from "./paginator";
import Timestamp from "./timestamp";
import { getChannelName, getMessages, getMessagesCount } from "@/lib/data";

export default async function Messages({
  channelId,
  search,
  page = 1,
  size = 100,
}: {
  channelId: string;
  search?: string;
  page?: number;
  size?: number;
}) {
  const skip = (page - 1) * size;
  const messages = await getMessages({ channelId, search, take: size, skip });
  const totalMessages = await getMessagesCount({ channelId, search });
  const channelName = await getChannelName({ id: channelId });

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-slate-400 flex justify-between">
        <div className="text-2xl text-slate-900 font-bold h-8">
          # {channelName}
        </div>
        <Paginator pageCount={Math.ceil(totalMessages / size)} />
      </div>
      <div className="h-full overflow-y-scroll overflow-x-hidden px-4 py-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className="px-2 py-1 rounded-md text-slate-800 hover:bg-slate-200"
          >
            <div className="flex flex-row items-start gap-2">
              {message.user.imageUrl && (
                <div className="mt-1 flex-none">
                  <img
                    alt={`Profile picture of ${message.user.name}`}
                    src={message.user.imageUrl}
                    className="rounded-md h-10 w-10"
                  />
                </div>
              )}
              <div className="flex flex-col">
                <div className="flex gap-2 text-base">
                  <span className="font-bold">{message.user.name}</span>
                  <Timestamp timestamp={message.ts} />
                </div>
                <div className="text-base">{message.text}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
