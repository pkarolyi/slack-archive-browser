import { Channel } from "@/types/prisma";
import Channels from "./channels";
import Timestamp from "./timestamp";

export default function Sidebar({
  channels,
  activeChannel,
  latestMessageDate,
}: {
  channels: Channel[];
  activeChannel?: string;
  latestMessageDate: string;
}) {
  return (
    <div className="h-full backdrop-brightness-50">
      <div className="h-full flex flex-col">
        <div className="text-2xl text-stone-50 font-bold p-4 border-b border-stone-500 h-16">
          <h1>CPP FTW</h1>
        </div>
        <Channels channels={channels} activeChannel={activeChannel} />
        <div className="text-stone-50 text-xs border-t border-stone-500 px-4 py-2">
          Last archived message: <Timestamp date={latestMessageDate} />
        </div>
      </div>
    </div>
  );
}
