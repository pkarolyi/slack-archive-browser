import Channels from "@/components/channels";
import Timestamp from "@/components/timestamp";
import { getChannels, getLatestMessageIsoDate } from "@/lib/data";

export default async function ChannelLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    channelId: string;
  };
}) {
  const channels = await getChannels();
  const latestMessageDate = await getLatestMessageIsoDate();

  return (
    <main className="h-screen flex p-2 bg-gradient-to-br from-cyan-800 to-yellow-800">
      <div className="h-full w-1/4 backdrop-brightness-50 rounded-l-md">
        <div className="h-full flex flex-col">
          <div className="text-2xl text-slate-50 font-bold p-4 border-b border-slate-500 h-16">
            <h1>CPP FTW</h1>
          </div>
          <Channels channels={channels} activeChannel={params.channelId} />
          <div className="text-slate-50 text-xs border-t border-slate-500 px-4 py-2">
            Last archived message: <Timestamp date={latestMessageDate} />
          </div>
        </div>
      </div>
      <div className="h-full w-3/4 bg-slate-50 rounded-r-md break-words">
        {children}
      </div>
    </main>
  );
}
