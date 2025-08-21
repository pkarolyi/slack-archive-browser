"use client";

import { createURLWithSearchParams } from "@/lib/utils";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

function PaginationLink({
  page,
  text,
}: Readonly<{ page?: number; text?: string }>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") ?? "1", 10);

  return (
    <li
      className={clsx(
        "-mr-[1px] block h-full border border-stone-400 first:rounded-l-md last:mr-0 last:rounded-r-md",
        currentPage === page && "bg-stone-200",
      )}
    >
      <Link
        href={
          page
            ? createURLWithSearchParams(pathname, searchParams, {
                page,
                messageTs: null,
              })
            : ""
        }
      >
        <div
          className={clsx(
            "h-full min-w-[1.5em] px-2 py-1 text-center lg:min-w-[2em] lg:py-[1px]",
            !page && "cursor-default",
          )}
        >
          {text ?? page}
        </div>
      </Link>
    </li>
  );
}

export default function Paginator({
  pageCount,
}: Readonly<{ pageCount: number }>) {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  const middleLength = Math.min(5, pageCount - 2);
  const middleComponents = Array.from(
    { length: middleLength },
    (_, i) => currentPage - Math.floor(middleLength / 2) + i,
  ).filter((c) => c > 1 && c < pageCount);

  return (
    <nav>
      <ul className="flex h-full justify-center lg:justify-start">
        <PaginationLink page={1} />
        {middleComponents[0] > 2 && <PaginationLink text="..." />}
        {middleComponents.map((c) => (
          <PaginationLink key={c} page={c} />
        ))}
        {middleComponents[middleComponents.length - 1] < pageCount - 1 && (
          <PaginationLink text="..." />
        )}
        {pageCount > 1 && <PaginationLink page={pageCount} />}
      </ul>
    </nav>
  );
}
