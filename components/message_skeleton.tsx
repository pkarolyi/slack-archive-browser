export default function MessageSkeleton() {
  return (
    <div className="px-2 py-[5px] rounded-md">
      <div className="flex flex-row items-start gap-2 animate-pulse">
        <div className="mt-1 flex-none">
          <div className="rounded-md h-[42px] w-[42px] bg-stone-200" />
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2">
            <div className="bg-stone-200 h-4 mt-1 w-64" />
          </div>
          <div className="bg-stone-200 h-4 mt-2 w-96" />
        </div>
      </div>
    </div>
  );
}
