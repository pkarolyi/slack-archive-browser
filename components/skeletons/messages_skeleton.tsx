export default function MessagesSkeleton() {
  return (
    <div className="h-full overflow-x-hidden overflow-y-scroll px-4 py-2">
      {Array.from(Array(20).keys()).map((k) => (
        <div key={k} className="rounded-md px-2 py-[5px]">
          <div className="flex animate-pulse flex-row items-start gap-2">
            <div className="mt-1 flex-none">
              <div className="h-[42px] w-[42px] rounded-md bg-stone-200" />
            </div>
            <div className="flex flex-col">
              <div className="flex gap-2">
                <div className="mt-1 h-4 w-64 bg-stone-200" />
              </div>
              <div className="mt-2 h-4 w-96 bg-stone-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
