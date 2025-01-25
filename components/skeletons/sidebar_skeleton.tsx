export default function SidebarSkeleton() {
  return (
    <div className="h-full backdrop-brightness-50">
      <div className="h-full flex flex-col">
        <div className="text-2xl text-stone-50 font-bold p-4 border-b border-stone-500 h-16">
          <h1>CPP FTW</h1>
        </div>
        <div className="py-2 h-full overflow-y-scroll overflow-x-hidden">
          {Array.from(Array(30).keys()).map((k) => (
            <div
              key={k}
              className="text-base h-6 m-2 bg-stone-50 rounded-md animate-pulse"
            ></div>
          ))}
        </div>
        <div className="text-stone-50 text-xs border-t border-stone-500 px-4 py-2 flex gap-2 items-center">
          Last archived message:
          <div className="w-[12em] h-[1em] bg-stone-50 rounded-xs animate-pulse" />
        </div>
      </div>
    </div>
  );
}
