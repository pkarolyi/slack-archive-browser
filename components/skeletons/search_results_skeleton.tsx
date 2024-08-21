export default function SearchResultsSkeleton() {
  return (
    <div className="h-full overflow-x-hidden overflow-y-scroll px-4 py-2">
      {Array.from(Array(20).keys()).map((k) => (
        <div
          key={k}
          className="mb-4 rounded-md border border-stone-300 bg-white p-2"
        >
          <div className="animate-pulse">
            <div className="h-4 w-40 bg-stone-200" />
            <div className="mt-1 flex flex-row items-start gap-2">
              <div className="flex-none">
                <div className="h-[42px] w-[42px] rounded-md bg-stone-200" />
              </div>
              <div className="flex flex-col">
                <div className="h-4 w-64 bg-stone-200" />
                <div className="mt-2 h-4 w-96 bg-stone-200" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
