import { getChannelGeneral } from "@/lib/data";
import { redirect } from "next/navigation";

export default async function Channels() {
  const general = await getChannelGeneral();
  redirect(`/channels/${general.id}`);
}
