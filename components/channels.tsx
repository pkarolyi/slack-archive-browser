import { getChannels } from "@/lib/data";
import clsx from "clsx";
import Link from "next/link";

export default async function Channels({
  activeChannel,
}: {
  activeChannel?: string;
}) {
  const channels = await getChannels();

  return (
    <div className="h-full flex flex-col">
      <div className="text-2xl text-slate-50 font-bold p-4 border-b border-slate-500 h-16">
        CPP FTW
      </div>
      <div className="px-4 py-2 h-full overflow-y-scroll overflow-x-hidden">
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
    </div>
  );
}
