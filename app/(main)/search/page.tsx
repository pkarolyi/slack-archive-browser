import SearchResults from "@/components/search_results";
import BackButton from "@/components/ui/back_button";
import Content from "@/components/ui/content";
import ContentHeader from "@/components/ui/content_header";
import SearchBox from "@/components/ui/search_box";
import { Suspense } from "react";

export default function SearchPage({
  searchParams,
}: {
  searchParams: { term?: string };
}) {
  return (
    <Content>
      <ContentHeader className="!gap-2">
        <BackButton />
        <SearchBox />
      </ContentHeader>
      <Suspense key={searchParams.term} fallback={<div>loading...</div>}>
        <SearchResults term={searchParams.term} />
      </Suspense>
    </Content>
  );
}
