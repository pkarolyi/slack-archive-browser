import { getChannels } from "@/lib/data";
import clsx from "clsx";
import Link from "next/link";

export default async function ChannelSelector({
  activeChannel,
}: {
  activeChannel?: string;
}) {
  const channels = await getChannels();

  return (
    <div>
      <div className="text-2xl text-slate-50 font-bold mb-2 h-8">CPP FTW</div>
      {channels
        .sort((a, b) => (a.name < b.name ? -1 : 1))
        .map((channel) => (
          <Link key={channel.id} href={`/channels/${channel.id}`}>
            <div
              className={clsx(
                "text-base text-slate-200 px-2 py-1 rounded-md hover:bg-cyan-900 hover:text-slate-50",
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
