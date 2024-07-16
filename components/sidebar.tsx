import { getChannels, getLatestMessageIsoDate } from "@/lib/data";
import Channels from "./ui/channels";
import Timestamp from "./ui/timestamp";

export default async function Sidebar() {
  const [channels, latestMessageDate] = await Promise.all([
    getChannels(),
    getLatestMessageIsoDate(),
  ]);

  return (
    <div className="h-full rounded-l-md backdrop-brightness-50">
      <div className="flex h-full flex-col">
        <div className="h-16 border-b border-stone-500 p-4 text-2xl font-bold text-stone-50">
          <h1>CPP FTW</h1>
        </div>
        <Channels channels={channels} />
        <div className="border-t border-stone-500 px-4 py-2 text-xs text-stone-50">
          Last archived message: <Timestamp date={latestMessageDate} />
        </div>
      </div>
    </div>
  );
}
