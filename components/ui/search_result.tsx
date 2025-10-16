import { MessageWithUserAndChannel } from "@/types/prisma";
import { MessageType } from "@prisma/client";
import Image from "next/image";
import Timestamp from "./timestamp";
import Link from "next/link";
import RichTextRenderer from "./rich_text_renderer";

export default async function SearchResult({
  message,
  userMap,
}: Readonly<{
  message: MessageWithUserAndChannel;
  userMap: Map<string, string>;
}>) {
  return (
    <Link href={`/channels/${message.channelId}/${message.ts}`}>
      <div className="mb-4 rounded-md border border-stone-300 bg-white px-2 py-1 text-stone-800 hover:border-cyan-600 hover:bg-cyan-50">
        <div className="font-bold text-stone-600"># {message.channel.name}</div>
        <div className="flex flex-row items-start gap-2">
          {message.user.imageUrl && (
            <div className="mt-1 flex-none">
              <Image
                alt={`Profile picture of ${message.user.name}`}
                src={message.user.imageUrl}
                className="h-[36px] w-[36px] rounded-md lg:h-[42px] lg:w-[42px]"
                width={42}
                height={42}
              />
            </div>
          )}
          <div className="flex flex-col">
            <div className="flex gap-2 text-sm lg:text-base">
              <span className="font-bold">{message.user.name}</span>
              <Timestamp date={message.isoDate} />
            </div>
            <RichTextRenderer
              blocks={message.blocks}
              plainText={message.text}
              userMap={userMap}
            />
            {message.type === MessageType.THREAD_PARENT && (
              <div className="font-bold text-stone-600">
                This message has thread replies
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
