import { getMessages } from "@/lib/data";
import { dateFromSlackTs } from "@/lib/utils";

export default async function Channel({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { search?: string; take?: string; skip?: string };
}) {
  const { id: channelId } = params;
  const { search, take, skip } = searchParams;

  const messages = await getMessages({
    channelId,
    search,
    take: parseInt(take || "100"),
    skip: parseInt(skip || "0"),
  });

  return (
    <main>
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <em>{dateFromSlackTs(message.ts).toLocaleString()}</em>{" "}
            <strong>{message.user.name}</strong> : {message.text}
          </div>
        ))}
      </div>
    </main>
  );
}
