import clsx from "clsx";

export default function ContentHeader({
  children,
  className,
}: Readonly<{
  children?: React.ReactNode;
  className?: string;
}>) {
  return (
    <div
      className={clsx(
        "flex flex-none flex-col justify-between gap-2 border-b border-stone-400 p-4 lg:h-16 lg:flex-row lg:gap-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
