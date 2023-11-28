import { getChannels } from "@/lib/data";
import Link from "next/link";

export default async function Channels() {
  const channels = await getChannels();

  return (
    <main>
      <div>
        {channels.map((channel) => (
          <div key={channel.id}>
            <Link href={`/channels/${channel.id}`}>{channel.name}</Link>
          </div>
        ))}
      </div>
    </main>
  );
}
