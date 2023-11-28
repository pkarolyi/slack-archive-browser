export function dateFromSlackTs(ts: string) {
  const tsWithoutSequence = parseInt(ts.split(".")[0]);
  const date = new Date(tsWithoutSequence * 1000);
  return date;
}

export function createURLWithSearchParams(
  pathname: string,
  searchParams: URLSearchParams,
  newSearchParams: { [key: string]: any }
) {
  const params = new URLSearchParams(searchParams);
  for (const [key, value] of Object.entries(newSearchParams)) {
    params.set(key, value.toString());
  }

  return `${pathname}?${params.toString()}`;
}
