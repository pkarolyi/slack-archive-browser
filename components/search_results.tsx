import { searchMessages, getAllUsers } from "@/lib/data";
import SearchResult from "./ui/search_result";

export default async function SearchResults({
  term,
}: Readonly<{ term?: string }>) {
  const [messages, users] = await Promise.all([
    searchMessages({ term }),
    getAllUsers(),
  ]);

  const userMap = new Map(users.map((user) => [user.id, user.name]));

  return (
    <div className="h-full overflow-x-hidden overflow-y-scroll px-2 py-1 lg:px-4 lg:py-2">
      {messages.length === 0 ? (
        term ? (
          <div>No messages found.</div>
        ) : (
          <div>Use the search bar to search.</div>
        )
      ) : (
        messages.map((message) => (
          <SearchResult key={message.id} message={message} userMap={userMap} />
        ))
      )}
    </div>
  );
}
