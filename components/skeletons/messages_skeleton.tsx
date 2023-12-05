export default function MessagesSkeleton() {
  return (
    <div className="h-full overflow-y-scroll overflow-x-hidden px-4 py-2">
      {Array.from(Array(20).keys()).map((k) => (
        <div key={k} className="px-2 py-[5px] rounded-md">
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
      ))}
    </div>
  );
}
