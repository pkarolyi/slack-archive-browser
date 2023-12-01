export default function Content({ children }: { children?: React.ReactNode }) {
  return (
    <div className="h-full bg-stone-50 lg:rounded-r-md break-words">
      <div className="h-full flex flex-col">{children}</div>
    </div>
  );
}
