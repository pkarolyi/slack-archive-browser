"use client";

import { createURLWithSearchParams } from "@/lib/utils";
import clsx from "clsx";
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
        "flex-1 flex items-center rounded-md border  bg-white",
        focused ? "border-stone-500" : "border-stone-400"
      )}
    >
      <div className="ml-2">🔍</div>
      <input
        className="px-2 h-full flex-1 rounded-md focus:outline-none"
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
