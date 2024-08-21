import type { MessageWithUserAndThread } from "@/types/prisma";
import Image from "next/image";
import Timestamp from "./timestamp";
import clsx from "clsx";

export default function Message({
  message,
  highlighted = false,
}: Readonly<{
  message: MessageWithUserAndThread;
  highlighted?: boolean;
}>) {
  return (
    <div
      className={clsx(
        "rounded-md px-2 py-1 text-stone-800 hover:bg-stone-200",
        highlighted && "border border-cyan-600 bg-cyan-50 hover:bg-cyan-100",
      )}
    >
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
          <p className="whitespace-pre-line text-sm lg:text-base">
            {message.text}
          </p>
          {message.threadReplies?.map((reply) => (
            <Message key={reply.id} message={{ ...reply, threadReplies: [] }} />
          ))}
        </div>
      </div>
    </div>
  );
}
