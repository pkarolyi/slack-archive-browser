"use client";

import type { Channel } from "@/types/prisma";
import clsx from "clsx";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Channels({
  channels,
}: Readonly<{ channels: Channel[] }>) {
  const { channelId } = useParams();

  return (
    <div className="h-full overflow-x-hidden overflow-y-scroll py-2">
      {channels
        .toSorted((a, b) => (a.name < b.name ? -1 : 1))
        .map((channel) => (
          <Link key={channel.id} href={`/channels/${channel.id}`}>
            <div
              className={clsx(
                "mx-2 rounded-md px-2 py-1 text-base text-stone-200 hover:bg-white/25 hover:text-stone-50",
                channelId === channel.id &&
                  "bg-cyan-900 font-bold text-stone-50",
              )}
            >
              # {channel.name}
            </div>
          </Link>
        ))}
    </div>
  );
}
