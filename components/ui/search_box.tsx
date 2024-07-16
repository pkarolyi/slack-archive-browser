"use client";

import { createURLWithSearchParams } from "@/lib/utils";
import clsx from "clsx";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("term") ?? "";

  const [search, setSearch] = useState(currentSearch);
  const [focused, setFocused] = useState(false);

  const handleSearch = useDebouncedCallback((term) => {
    const newURL = createURLWithSearchParams("/search", searchParams, {
      term,
      page: null,
    });
    router.push(newURL);
  }, 300);

  useEffect(() => {
    setSearch(currentSearch);
  }, [currentSearch]);

  return (
    <div
      className={clsx(
        "flex flex-1 items-center rounded-md border bg-white",
        focused ? "border-stone-500" : "border-stone-400",
      )}
    >
      <div className="ml-2 text-stone-500">
        <SearchIcon className="h-4 w-4" />
      </div>
      <input
        className="h-full flex-1 rounded-md px-2 focus:outline-none"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          handleSearch(e.target.value);
        }}
      />
    </div>
  );
}
