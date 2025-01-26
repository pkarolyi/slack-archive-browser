import { toast } from "react-toastify";
import ShareIcon from "../icons/share";

export default function MeassageActions({
  message,
}: {
  message: { channelId: string; ts: string };
}) {
  const onShare = async () => {
    await navigator.clipboard.writeText(
      `${window.location.origin}/channels/${message.channelId}/${message.ts}`,
    );
    toast("📋 Copied message link to clipboard");
  };

  return (
    <div className="absolute -top-3 right-2 hidden gap-2 group-hover/message:flex">
      <button
        onClick={onShare}
        className="rounded-md border border-stone-400 bg-white p-1 hover:cursor-pointer hover:bg-stone-100 active:bg-stone-200"
      >
        <ShareIcon className="size-5" />
      </button>
    </div>
  );
}
