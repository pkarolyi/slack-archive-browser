import { prisma } from "@/lib/prisma";

export async function GET() {
  const channels = await prisma.archiveChannel.findMany();
  return Response.json(channels);
}
