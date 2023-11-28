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
    page?: string;
    size?: string;
  };
}) {
  const channelId = params.segments?.[0];

  return (
    <main className="h-screen flex p-2 bg-gradient-to-br from-cyan-800 to-yellow-800">
      <div className="h-full w-1/4 backdrop-brightness-50 rounded-l-md">
        <ChannelSelector activeChannel={channelId} />
      </div>
      <div className="h-full w-3/4 bg-slate-50 rounded-r-md break-words">
        {channelId && (
          <Messages
            channelId={channelId}
            search={searchParams.search}
            page={searchParams.page ? parseInt(searchParams.page) : undefined}
            size={searchParams.size ? parseInt(searchParams.size) : undefined}
          />
        )}
      </div>
    </main>
  );
}
