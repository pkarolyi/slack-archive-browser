export default function Content({
  children,
}: Readonly<{ children?: React.ReactNode }>) {
  return (
    <div className="h-full break-words bg-stone-50 lg:rounded-r-md">
      <div className="flex h-full flex-col">{children}</div>
    </div>
  );
}
