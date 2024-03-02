import { MessageWithUserAndChannel } from "@/types/prisma";
import { MessageType } from "@prisma/client";
import Image from "next/image";
import Timestamp from "./timestamp";

export default function SearchResult({
  message,
}: {
  message: MessageWithUserAndChannel;
}) {
  return (
    <div className="px-2 py-1 rounded-md text-stone-800 bg-white border border-stone-500 mb-4">
      <div className="font-bold text-stone-600"># {message.channel.name}</div>
      <div className="flex flex-row items-start gap-2">
        {message.user.imageUrl && (
          <div className="mt-1 flex-none">
            <Image
              alt={`Profile picture of ${message.user.name}`}
              src={message.user.imageUrl}
              className="rounded-md h-[36px] w-[36px] lg:h-[42px] lg:w-[42px]"
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
          <p className="text-sm lg:text-base whitespace-pre-line">
            {message.text}
          </p>
          {message.type === MessageType.THREAD_PARENT && (
            <div className="font-bold text-stone-600">
              This message has thread replies
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
