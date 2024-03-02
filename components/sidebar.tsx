import { getChannels, getLatestMessageIsoDate } from "@/lib/data";
import Channels from "./ui/channels";
import Timestamp from "./ui/timestamp";

export default async function Sidebar() {
  const [channels, latestMessageDate] = await Promise.all([
    getChannels(),
    getLatestMessageIsoDate(),
  ]);

  return (
    <div className="h-full backdrop-brightness-50 rounded-l-md">
      <div className="h-full flex flex-col">
        <div className="text-2xl text-stone-50 font-bold p-4 border-b border-stone-500 h-16">
          <h1>CPP FTW</h1>
        </div>
        <Channels channels={channels} />
        <div className="text-stone-50 text-xs border-t border-stone-500 px-4 py-2">
          Last archived message: <Timestamp date={latestMessageDate} />
        </div>
      </div>
    </div>
  );
}
