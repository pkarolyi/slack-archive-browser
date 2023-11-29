/* eslint-disable @next/next/no-img-element */

import Timestamp from "./timestamp";

export default function Message({
  text,
  date,
  userName,
  userImageUrl,
}: {
  text: string;
  date: string;
  userName: string;
  userImageUrl: string | null;
}) {
  return (
    <div className="px-2 py-1 rounded-md text-slate-800 hover:bg-slate-200">
      <div className="flex flex-row items-start gap-2">
        {userImageUrl && (
          <div className="mt-1 flex-none">
            <img
              alt={`Profile picture of ${userName}`}
              src={userImageUrl}
              className="rounded-md h-[42px] w-[42px]"
            />
          </div>
        )}
        <div className="flex flex-col">
          <div className="flex gap-2 text-base">
            <span className="font-bold">{userName}</span>
            <Timestamp date={date} />
          </div>
          <p className="text-base">{text}</p>
        </div>
      </div>
    </div>
  );
}
