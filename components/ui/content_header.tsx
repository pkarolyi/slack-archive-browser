export default function ContentHeader({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="p-4 border-b border-stone-400 flex flex-col justify-between gap-2 lg:gap-8 lg:h-16 lg:flex-row">
      {children}
    </div>
  );
}
