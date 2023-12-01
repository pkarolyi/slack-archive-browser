import { getChannelGeneral } from "@/lib/data";
import { redirect } from "next/navigation";

export default async function ChannelsPage() {
  const general = await getChannelGeneral();
  redirect(`/channels/${general.id}`);
}
