import Content from "@/components/content";
import Sidebar from "@/components/sidebar";
import { getChannels, getLatestMessageIsoDate } from "@/lib/data";

export default async function ChannelsPage() {
  const [channels, latestMessageDate] = await Promise.all([
    getChannels(),
    getLatestMessageIsoDate(),
  ]);

  return (
    <div className="flex h-full">
      <div className="flex-1 overflow-hidden lg:w-1/4 lg:rounded-l-md ">
        <Sidebar channels={channels} latestMessageDate={latestMessageDate} />
      </div>
      <div className="hidden lg:block lg:w-3/4">
        <Content />
      </div>
    </div>
  );
}
