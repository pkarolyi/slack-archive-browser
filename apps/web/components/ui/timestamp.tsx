export default function Timestamp({ date }: Readonly<{ date: string }>) {
  const dateString = date.split(".")[0].split("T").join(" ");
  return <span>{dateString}</span>;
}
