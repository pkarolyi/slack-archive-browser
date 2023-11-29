"use client";

import { createURLWithSearchParams } from "@/lib/utils";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search") ?? "";

  const handleSearch = useDebouncedCallback((term) => {
    const newURL = createURLWithSearchParams(pathname, searchParams, {
      search: term,
      page: null,
    });
    router.push(newURL);
  }, 300);

  return (
    <div className="flex-1 flex items-center rounded-md border border-slate-400 bg-white">
      <div className="ml-2">🔍</div>
      <input
        className="px-2 h-full flex-1 rounded-md focus:outline-none"
        defaultValue={currentSearch}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}
