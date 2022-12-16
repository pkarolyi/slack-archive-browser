import { PrismaClient } from '@prisma/client'
import path from 'path'
import fs from 'fs'

console.log(
  'Assuming clean database. If you have previous messages loaded reset the database!'
)

const prisma = new PrismaClient({})

const ARCHIVE_DIR = path.join(process.cwd(), process.argv[2])

async function main() {
  // Assuming all subdirectories are channels
  const channels = fs
    .readdirSync(ARCHIVE_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)

  for (const channel of channels) {
    console.log(`Importing ${channel}...`)

    const { id: channelId } = await prisma.archiveChannel.create({
      data: { name: channel },
    })

    const channelDir = path.join(ARCHIVE_DIR, channel)
    const files = fs
      .readdirSync(channelDir)
      .map((f) => path.join(channelDir, f))
    for (const file of files) {
      const messages = JSON.parse(fs.readFileSync(file).toString())
      const strippedMessages = messages.map((m: any) => ({
        ts: m.ts,
        text: m.text || '',
        name: m.user_profile?.name || m.user || '',
        channelId,
      }))
      await prisma.archiveMessage.createMany({ data: strippedMessages })
    }
  }
}

main()
