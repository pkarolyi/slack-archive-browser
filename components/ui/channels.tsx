"use client";

import type { Channel } from "@/types/prisma";
import clsx from "clsx";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Channels({ channels }: { channels: Channel[] }) {
  const { channelId } = useParams();

  return (
    <div className="py-2 h-full overflow-y-scroll overflow-x-hidden">
      {channels
        .sort((a, b) => (a.name < b.name ? -1 : 1))
        .map((channel) => (
          <Link key={channel.id} href={`/channels/${channel.id}`}>
            <div
              className={clsx(
                "text-base text-stone-200 mx-2 px-2 py-1 rounded-md hover:bg-cyan-900 hover:text-stone-50",
                channelId === channel.id &&
                  "bg-yellow-800 text-stone-50 font-bold"
              )}
            >
              # {channel.name}
            </div>
          </Link>
        ))}
    </div>
  );
}
