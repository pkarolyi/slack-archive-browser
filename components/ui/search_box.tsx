"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import SearchIcon from "../icons/search";

export default function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("term") ?? "";

  const [search, setSearch] = useState(currentSearch);

  const handleSearch = useDebouncedCallback((term) => {
    const newURL = `/search?term=${term}`;
    router.push(newURL);
  }, 300);

  useEffect(() => {
    setSearch(currentSearch);
  }, [currentSearch]);

  return (
    <div className="flex flex-1 items-center rounded-md border border-stone-400 bg-white ring-cyan-600 ring-offset-2 has-focus-visible:ring-2">
      <div className="ml-2 text-stone-500">
        <SearchIcon className="size-4" />
      </div>
      <input
        className="h-full flex-1 rounded-md px-2 focus-visible:outline-hidden"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          handleSearch(e.target.value);
        }}
        autoFocus
      />
    </div>
  );
}
