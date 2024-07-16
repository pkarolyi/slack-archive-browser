import { searchMessages } from "@/lib/data";
import SearchResult from "./ui/search_result";

export default async function SearchResults({
  term,
}: Readonly<{ term?: string }>) {
  const messages = await searchMessages({ term });

  return (
    <div className="h-full overflow-x-hidden overflow-y-scroll py-1 lg:px-4 lg:py-2">
      {messages.map((message) => (
        <SearchResult key={message.id} message={message} />
      ))}
    </div>
  );
}
