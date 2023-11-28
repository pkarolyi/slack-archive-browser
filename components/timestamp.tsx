import { dateFromSlackTs } from "@/lib/utils";

export default function Timestamp({ timestamp }: { timestamp: string }) {
  const date = dateFromSlackTs(timestamp);
  const dateString = date.toISOString().split(".")[0].split("T").join(" ");
  return <div>{dateString}</div>;
}
