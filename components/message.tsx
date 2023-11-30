import { ArchiveMessageType } from "@prisma/client";
import Image from "next/image";
import Timestamp from "./timestamp";
import { getThreadReplies } from "@/lib/data";

export default async function Message({
  id,
  text,
  date,
  userName,
  type,
  userImageUrl,
}: {
  id: string;
  text: string;
  date: string;
  userName: string;
  type: ArchiveMessageType;
  userImageUrl: string | null;
}) {
  const replies =
    type === ArchiveMessageType.THREAD_PARENT
      ? await getThreadReplies({ messageId: id })
      : [];

  return (
    <div className="px-2 py-1 rounded-md text-slate-800 hover:bg-slate-200">
      <div className="flex flex-row items-start gap-2">
        {userImageUrl && (
          <div className="mt-1 flex-none">
            <Image
              alt={`Profile picture of ${userName}`}
              src={userImageUrl}
              className="rounded-md h-[42px] w-[42px]"
              width={42}
              height={42}
            />
          </div>
        )}
        <div className="flex flex-col">
          <div className="flex gap-2 text-base">
            <span className="font-bold">{userName}</span>
            <Timestamp date={date} />
          </div>
          <p className="text-base">{text}</p>
          {replies.map((reply) => (
            <div key={reply.id}>
              <Message
                id={reply.id}
                text={reply.text}
                userName={reply.user.name}
                date={reply.isoDate}
                type={reply.type}
                userImageUrl={reply.user.imageUrl}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
