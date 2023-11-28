export default function Timestamp({ date }: { date: string }) {
  const dateString = date.split(".")[0].split("T").join(" ");
  return <div>{dateString}</div>;
}
