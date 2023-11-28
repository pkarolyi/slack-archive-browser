import { prisma } from "@/lib/prisma";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const channelId = searchParams.get("channelId");
  const search = searchParams.get("search");
  const skip = searchParams.get("skip");
  const take = searchParams.get("take");

  if (!channelId) return new Response("channelId is required", { status: 400 });

  const searchQuery = search
    ? {
        OR: [
          { text: { contains: search } },
          { user: { name: { contains: search } } },
          { threadMessages: { some: { text: { contains: search } } } },
        ],
      }
    : null;

  const messages = await prisma.archiveMessage.findMany({
    take: parseInt(take || "100"),
    skip: parseInt(skip || "0"),
    orderBy: { ts: "asc" },
    include: { user: true, threadMessages: true },
    where: { channelId: channelId, ...searchQuery },
  });

  return Response.json(messages);
}
