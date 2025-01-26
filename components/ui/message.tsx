"use client";

import type { MessageWithUserAndThread } from "@/types/prisma";
import Image from "next/image";
import Timestamp from "./timestamp";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import ShareIcon from "../icons/share";
import { toast } from "react-toastify";

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

  const onShare = async () => {
    await navigator.clipboard.writeText(
      `${window.location.origin}/channels/${message.channelId}/${message.ts}`,
    );
    toast("📋 Copied message link to clipboard");
  };

  return (
    <div
      className={clsx(
        "group relative rounded-md px-2 py-1 text-stone-800",
        highlighted
          ? "my-1 border border-cyan-600 bg-cyan-50 hover:bg-cyan-100"
          : "hover:bg-stone-200",
      )}
      ref={messageRef}
    >
      <div className="absolute -top-3 right-2 hidden gap-2 group-hover:flex">
        <button
          onClick={onShare}
          className="rounded-md border border-stone-400 bg-white p-1 hover:cursor-pointer hover:bg-stone-100 active:bg-stone-200"
        >
          <ShareIcon className="size-5" />
        </button>
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
          <p className="text-sm whitespace-pre-line lg:text-base">
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
