import { searchMessages } from "@/lib/data";
import SearchResult from "./ui/search_result";

export default async function SearchResults({ term }: { term?: string }) {
  const messages = await searchMessages({ term });

  return (
    <div className="h-full overflow-y-scroll overflow-x-hidden py-1 lg:py-2 lg:px-4">
      {messages.map((message) => (
        <SearchResult key={message.id} message={message} />
      ))}
    </div>
  );
}
