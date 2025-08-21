import Messages from "@/components/messages";
import MessagesSkeleton from "@/components/skeletons/messages_skeleton";
import BackToButton from "@/components/ui/back_to_button";
import Content from "@/components/ui/content";
import Paginator from "@/components/ui/paginator";
import SearchBox from "@/components/ui/search_box";
import { getChannelMessagesCount, getChannelName } from "@/lib/data";
import { Suspense } from "react";

export default async function ChannelPage({
  params,
  searchParams,
}: Readonly<{
  params: {
    channelId: string;
  };
  searchParams: {
    page?: string;
    size?: string;
    hl?: string;
  };
}>) {
  const channelId = params.channelId;
  const page = Number(searchParams.page) || 1;
  const take = Number(searchParams.size) || 100;
  const skip = (page - 1) * take;

  const [totalMessages, channelName] = await Promise.all([
    getChannelMessagesCount({ channelId }),
    getChannelName({ id: channelId }),
  ]);

  return (
    <Content>
      <div className="flex flex-none flex-col justify-between gap-2 border-b border-stone-400 p-4 lg:h-16 lg:flex-row lg:gap-8">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2 text-xl font-bold text-stone-900 lg:gap-0 lg:text-2xl">
            <a href="/channels" className="inline lg:hidden">
              <BackToButton />
            </a>
            # {channelName}
          </div>
        </div>
        <SearchBox />
        <Paginator pageCount={Math.ceil(totalMessages / take)} />
      </div>
      <Suspense key={`${page}-${take}`} fallback={<MessagesSkeleton />}>
        <Messages
          channelId={channelId}
          take={take}
          skip={skip}
          highlightedTs={searchParams.hl}
        />
      </Suspense>
    </Content>
  );
}
