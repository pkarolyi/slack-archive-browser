import { Channel } from "@/types/prisma";
import clsx from "clsx";
import Link from "next/link";

export default function Channels({
  channels,
  activeChannel,
}: {
  channels: Channel[];
  activeChannel?: string;
}) {
  return (
    <div className="py-2 h-full overflow-y-scroll overflow-x-hidden">
      {channels
        .sort((a, b) => (a.name < b.name ? -1 : 1))
        .map((channel) => (
          <Link key={channel.id} href={`/channels/${channel.id}`}>
            <div
              className={clsx(
                "text-base text-slate-200 mx-2 px-2 py-1 rounded-md hover:bg-cyan-900 hover:text-slate-50",
                activeChannel === channel.id &&
                  "bg-yellow-800 text-slate-50 font-bold"
              )}
            >
              # {channel.name}
            </div>
          </Link>
        ))}
    </div>
  );
}
