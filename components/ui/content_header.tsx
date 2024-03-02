import clsx from "clsx";

export default function ContentHeader({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "p-4 border-b border-stone-400 flex flex-col flex-none justify-between gap-2 lg:gap-8 lg:h-16 lg:flex-row",
        className
      )}
    >
      {children}
    </div>
  );
}
