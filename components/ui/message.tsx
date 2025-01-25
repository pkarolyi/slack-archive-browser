"use client";

import type { MessageWithUserAndThread } from "@/types/prisma";
import Image from "next/image";
import Timestamp from "./timestamp";
import clsx from "clsx";
import { useEffect, useRef } from "react";

export default function Message({
  message,
  highlightedTs,
}: Readonly<{
  message: MessageWithUserAndThread;
  highlightedTs?: string;
}>) {
  const messageRef = useRef<HTMLDivElement | null>(null);

  const highlighted = highlightedTs === message.ts;

  useEffect(() => {
    if (highlighted && messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [highlighted, messageRef]);

  return (
    <div
      className={clsx(
        "relative rounded-md px-2 py-1 text-stone-800",
        highlighted
          ? "my-1 border border-cyan-600 bg-cyan-50 hover:bg-cyan-100"
          : "hover:bg-stone-200",
      )}
      ref={messageRef}
    >
      <div className="absolute right-0 top-0">
        <button className="border border-stone-400"></button>
      </div>
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
        <div className="flex flex-1 flex-col">
          <div className="flex gap-2 text-sm lg:text-base">
            <span className="font-bold">{message.user.name}</span>
            <Timestamp date={message.isoDate} />
          </div>
          <p className="whitespace-pre-line text-sm lg:text-base">
            {message.text}
          </p>
          {message.threadReplies?.map((reply) => (
            <Message
              key={reply.id}
              message={{ ...reply, threadReplies: [] }}
              highlightedTs={highlightedTs}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
