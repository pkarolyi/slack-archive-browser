import Content from "@/components/content";
import ContentHeader from "@/components/content_header";
import Messages from "@/components/messages";
import MessagesSkeleton from "@/components/messages_skeleton";
import Paginator from "@/components/paginator";
import SearchBox from "@/components/search_box";
import Sidebar from "@/components/sidebar";
import {
  getChannelMessagesCount,
  getChannelName,
  getChannels,
  getLatestMessageIsoDate,
} from "@/lib/data";
import Link from "next/link";
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

  const [channels, latestMessageDate, totalMessages, channelName] =
    await Promise.all([
      getChannels(),
      getLatestMessageIsoDate(),
      getChannelMessagesCount({ channelId, search }),
      getChannelName({ id: channelId }),
    ]);

  return (
    <div className="flex h-full">
      <div className="hidden lg:block lg:w-1/4">
        <Sidebar
          channels={channels}
          activeChannel={params.channelId}
          latestMessageDate={latestMessageDate}
        />
      </div>
      <div className="lg:w-3/4">
        <Content>
          <ContentHeader>
            <div className="flex gap-2 justify-between items-start">
              <div className="text-xl lg:text-2xl text-stone-900 font-bold">
                # {channelName}
              </div>
              <Link
                className="block text-2xl leading-none lg:hidden"
                href="/channels"
              >
                &#9776;
              </Link>
            </div>
            <SearchBox />
            <Paginator pageCount={Math.ceil(totalMessages / take)} />
          </ContentHeader>
          <Suspense
            key={`${search}-${page}-${take}`}
            fallback={<MessagesSkeleton />}
          >
            <Messages
              channelId={channelId}
              search={search}
              take={take}
              skip={skip}
            />
          </Suspense>
        </Content>
      </div>
    </div>
  );
}
