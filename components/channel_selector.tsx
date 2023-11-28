import Link from "next/link";
import { getChannels } from "@/lib/data";

export default async function ChannelSelector() {
  const channels = await getChannels();

  return (
    <div>
      <div className="text-2xl text-slate-50 font-bold mb-2 h-8">CPP FTW</div>
      {channels
        .sort((a, b) => (a.name < b.name ? -1 : 1))
        .map((channel) => (
          <Link key={channel.id} href={`/channels/${channel.id}`}>
            <div className="text-base text-slate-200 px-2 py-1 rounded-md hover:bg-cyan-900 hover:text-slate-50">
              # {channel.name}
            </div>
          </Link>
        ))}
    </div>
  );
}
