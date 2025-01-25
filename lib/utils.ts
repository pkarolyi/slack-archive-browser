import type { ReadonlyURLSearchParams } from "next/navigation";

export function createURLWithSearchParams(
  pathname: string,
  searchParams: ReadonlyURLSearchParams,
  newSearchParams: { [key: string]: any },
) {
  const params = new URLSearchParams(Array.from(searchParams.entries()));
  for (const [key, value] of Object.entries(newSearchParams)) {
    if (value) {
      params.set(key, value.toString());
    } else {
      params.delete(key);
    }
  }

  if (params.size === 0) return pathname;

  return `${pathname}?${params.toString()}`;
}
