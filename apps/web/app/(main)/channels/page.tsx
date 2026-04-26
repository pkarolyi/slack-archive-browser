import Sidebar from "@/components/sidebar";
import SidebarSkeleton from "@/components/skeletons/sidebar_skeleton";
import Content from "@/components/ui/content";
import { Suspense } from "react";

export default async function ChannelsPage() {
  return (
    <>
      <div className="block h-full lg:hidden">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
      </div>
      <div className="hidden h-full lg:block">
        <Content />
      </div>
    </>
  );
}
