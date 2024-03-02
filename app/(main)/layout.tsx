import Sidebar from "@/components/sidebar";
import SidebarSkeleton from "@/components/skeletons/sidebar_skeleton";
import { Suspense } from "react";

export default async function ChannelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen bg-gradient-to-br from-cyan-800 to-yellow-800 lg:p-2">
      <div className="flex h-full">
        <div className="hidden lg:block lg:w-1/4">
          <Suspense fallback={<SidebarSkeleton />}>
            <Sidebar />
          </Suspense>
        </div>
        <div className="lg:w-3/4">{children}</div>
      </div>
    </main>
  );
}
