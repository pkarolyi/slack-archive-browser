"use client";

import { createURLWithSearchParams } from "@/lib/utils";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

function PaginationLink({ page, text }: { page?: number; text?: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  return (
    <li
      className={clsx(
        "block border border-slate-400 first:rounded-l-md -mr-[1px] last:rounded-r-md last:mr-0",
        currentPage === page && "bg-slate-200"
      )}
    >
      <Link
        href={
          page
            ? createURLWithSearchParams(pathname, searchParams, { page })
            : ""
        }
      >
        <div
          className={clsx(
            "px-2 min-w-[2em] text-center p-[0.25em]",
            !page && "cursor-default"
          )}
        >
          {text ? text : page}
        </div>
      </Link>
    </li>
  );
}

export default function Paginator({ pageCount }: { pageCount: number }) {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  const middleComponents = Array.from(
    { length: 5 },
    (_, i) => currentPage - 2 + i
  ).filter((c) => c > 1 && c < pageCount);

  return (
    <nav>
      <ul className="flex">
        <PaginationLink
          page={currentPage - 1 > 0 ? currentPage - 1 : undefined}
          text="<"
        />
        <PaginationLink page={1} />
        {middleComponents[0] > 2 && <PaginationLink text="..." />}
        {middleComponents.map((c) => (
          <PaginationLink key={c} page={c} />
        ))}
        {middleComponents[middleComponents.length - 1] < pageCount - 1 && (
          <PaginationLink text="..." />
        )}
        {pageCount > 1 && <PaginationLink page={pageCount} />}
        <PaginationLink
          page={currentPage + 1 < pageCount ? currentPage + 1 : undefined}
          text=">"
        />
      </ul>
    </nav>
  );
}
