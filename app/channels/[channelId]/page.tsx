import Messages from "@/components/messages";
import MessagesSkeleton from "@/components/messages_skeleton";
import Paginator from "@/components/paginator";
import SearchBox from "@/components/search";
import { getChannelName, getChannelMessagesCount } from "@/lib/data";
import { Suspense } from "react";

export default async function Channel({
  params,
  searchParams,
}: {
  params: {
    channelId: string;
  };
  searchParams: {
    search?: string;
    page?: string;
    size?: string;
  };
}) {
  const channelId = params.channelId;
  const search = searchParams.search;
  const page = Number(searchParams.page) || 1;
  const size = Number(searchParams.size) || 100;

  const totalMessages = await getChannelMessagesCount({ channelId, search });
  const channelName = await getChannelName({ id: channelId });

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-slate-400 flex justify-between gap-8 h-16">
        <div className="text-2xl text-slate-900 font-bold"># {channelName}</div>
        <SearchBox />
        <Paginator pageCount={Math.ceil(totalMessages / size)} />
      </div>
      <Suspense
        key={`${search}-${page}-${size}`}
        fallback={<MessagesSkeleton />}
      >
        <Messages
          channelId={channelId}
          page={page}
          size={size}
          search={search}
        />
      </Suspense>
    </div>
  );
}
