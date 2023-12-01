export default async function ChannelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen bg-gradient-to-br from-cyan-800 to-yellow-800 lg:p-2">
      {children}
    </main>
  );
}
