export function dateFromSlackTs(ts: string) {
  const tsWithoutSequence = parseInt(ts.split(".")[0]);
  const date = new Date(tsWithoutSequence * 1000);
  return date;
}
