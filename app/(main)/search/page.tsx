import SearchResults from "@/components/search_results";
import SearchResultsSkeleton from "@/components/skeletons/search_results_skeleton";
import BackToButton from "@/components/ui/back_to_button";
import Content from "@/components/ui/content";
import ContentHeader from "@/components/ui/content_header";
import SearchBox from "@/components/ui/search_box";
import { Suspense } from "react";

export default function SearchPage({
  searchParams,
}: Readonly<{
  searchParams: { term?: string; from?: string };
}>) {
  return (
    <Content>
      <ContentHeader className="gap-2!">
        <BackToButton />
        <SearchBox />
      </ContentHeader>
      <Suspense key={searchParams.term} fallback={<SearchResultsSkeleton />}>
        <SearchResults term={searchParams.term} />
      </Suspense>
    </Content>
  );
}
