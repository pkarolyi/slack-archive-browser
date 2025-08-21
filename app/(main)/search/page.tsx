import SearchResults from "@/components/search_results";
import SearchResultsSkeleton from "@/components/skeletons/search_results_skeleton";
import BackToButton from "@/components/ui/back_to_button";
import Content from "@/components/ui/content";
import SearchBox from "@/components/ui/search_box";
import { Suspense } from "react";

export default function SearchPage({
  searchParams,
}: Readonly<{
  searchParams: { term?: string; from?: string };
}>) {
  return (
    <Content>
      <div className="flex flex-none flex-row justify-between gap-2 border-b border-stone-400 p-4 lg:h-16">
        <BackToButton />
        <SearchBox />
      </div>
      <Suspense key={searchParams.term} fallback={<SearchResultsSkeleton />}>
        <SearchResults term={searchParams.term} />
      </Suspense>
    </Content>
  );
}
