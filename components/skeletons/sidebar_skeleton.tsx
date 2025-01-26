export default function SidebarSkeleton() {
  return (
    <div className="h-full backdrop-brightness-50">
      <div className="flex h-full flex-col">
        <div className="h-16 border-b border-stone-500 p-4 text-2xl font-bold text-stone-50">
          <h1>{process.env.NEXT_PUBLIC_TITLE}</h1>
        </div>
        <div className="h-full overflow-x-hidden overflow-y-scroll py-2">
          {Array.from(Array(30).keys()).map((k) => (
            <div
              key={k}
              className="m-2 h-6 animate-pulse rounded-md bg-stone-50 text-base"
            ></div>
          ))}
        </div>
        <div className="flex items-center gap-2 border-t border-stone-500 px-4 py-2 text-xs text-stone-50">
          Last archived message:
          <div className="h-[1em] w-[12em] animate-pulse rounded-xs bg-stone-50" />
        </div>
      </div>
    </div>
  );
}
