import Messages from "@/components/messages";
import MessagesSkeleton from "@/components/messages_skeleton";
import Paginator from "@/components/paginator";
import SearchBox from "@/components/search";
import {
  getChannelMessages,
  getChannelMessagesCount,
  getChannelName,
} from "@/lib/data";
import { Suspense } from "react";

export default async function ChannelPage({
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
  const take = Number(searchParams.size) || 100;
  const skip = (page - 1) * take;

  const totalMessages = await getChannelMessagesCount({ channelId, search });
  const channelName = await getChannelName({ id: channelId });
  const messages = await getChannelMessages({ channelId, search, take, skip });

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-slate-400 flex justify-between gap-8 h-16">
        <div className="text-2xl text-slate-900 font-bold"># {channelName}</div>
        <SearchBox />
        <Paginator pageCount={Math.ceil(totalMessages / take)} />
      </div>
      <Suspense
        key={`${search}-${page}-${take}`}
        fallback={<MessagesSkeleton />}
      >
        <Messages messages={messages} />
      </Suspense>
    </div>
  );
}
