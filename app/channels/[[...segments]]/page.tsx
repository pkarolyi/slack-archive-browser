import ChannelSelector from "@/components/channel_selector";
import Messages from "@/components/messages";

export default async function Channels({
  params,
  searchParams,
}: {
  params: {
    segments?: string[];
  };
  searchParams: {
    search?: string;
    take?: string;
    skip?: string;
  };
}) {
  return (
    <main className="h-screen flex p-2 bg-gradient-to-br from-cyan-800 to-yellow-800">
      <div className="h-full overflow-y-scroll overflow-x-hidden py-2 px-4 w-1/4 backdrop-brightness-50 rounded-l-md">
        <ChannelSelector />
      </div>
      <div className="h-full w-full py-2 px-4 bg-slate-50 rounded-r-md">
        {params.segments?.[0] && (
          <Messages
            channelId={params.segments[0]}
            search={searchParams.search}
            take={searchParams.take ? parseInt(searchParams.take) : undefined}
            skip={searchParams.skip ? parseInt(searchParams.skip) : undefined}
          />
        )}
      </div>
    </main>
  );
}
