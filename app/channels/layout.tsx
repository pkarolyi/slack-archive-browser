import Sidebar from "@/components/sidebar";
import SidebarSkeleton from "@/components/skeletons/sidebar_skeleton";
import { Suspense } from "react";

export default async function ChannelsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    channelId?: string;
  };
}) {
  return (
    <main className="h-screen bg-gradient-to-br from-cyan-800 to-yellow-800 lg:p-2">
      <div className="flex h-full">
        <div className="hidden lg:block lg:w-1/4">
          <Suspense fallback={<SidebarSkeleton />}>
            <Sidebar activeChannel={params.channelId} />
          </Suspense>
        </div>
        <div className="lg:w-3/4">{children}</div>
      </div>
    </main>
  );
}
