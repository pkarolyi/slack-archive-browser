import { getMessagePageFromTs } from "@/lib/data";
import { redirect } from "next/navigation";

export default async function ChannelMessage({
  params,
}: Readonly<{
  params: {
    channelId: string;
    ts: string;
  };
}>) {
  const ts = params.ts;
  const channelId = params.channelId;
  const take = 100;

  const messagePage = await getMessagePageFromTs({ channelId, ts, take });

  return redirect(
    `/channels/${channelId}?hl=${ts}&page=${messagePage}&take=${take}`,
  );
}
