import MessageSkeleton from "./message_skeleton";

export default function MessagesSkeleton() {
  return (
    <div className="h-full overflow-y-scroll overflow-x-hidden px-4 py-2">
      {Array.from(Array(20).keys()).map((k) => (
        <MessageSkeleton key={k} />
      ))}
    </div>
  );
}
