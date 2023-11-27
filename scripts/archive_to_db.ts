import { PrismaClient } from '@prisma/client'
import path from 'path'
import fs from 'fs'
import { randomUUID } from 'crypto'

console.log(
  'Assuming clean database. If you have previous messages loaded reset the database!'
)

const prisma = new PrismaClient({})

const ARCHIVE_DIR = path.join(process.cwd(), process.argv[2])

const ONLY = process.argv[3] || null

type JSONChannel = { id: string; name: string }
type JSONUser = {
  id: string
  name: string
  profile: { display_name?: string; image_72?: string }
}

type JSONMessage = {
  ts: string
  user?: string
  text: string
  thread_ts?: string
  reply_count?: string
  parent_user_id?: string
}

type Message = {
  id: string
  ts: string
  user: string
  text: string
  thread_ts?: string
  reply_count?: string
  parent_user_id?: string
}

type ThreadMessage = {
  id: string
  ts: string
  user: string
  text: string
  thread_ts: string
  parent_user_id: string
}

async function main() {
  const users: JSONUser[] = JSON.parse(
    fs.readFileSync(path.join(ARCHIVE_DIR, 'users.json'), 'utf-8')
  )

  await prisma.archiveUser.createMany({
    data: users.map((u) => ({
      id: u.id,
      name: u.profile.display_name || u.name,
      imageUrl: u.profile.image_72,
    })),
  })

  await prisma.archiveUser.create({
    data: {
      id: 'USLACKBOT',
      name: 'Slackbot',
      imageUrl: 'https://a.slack-edge.com/80588/img/slackbot_72.png',
    },
  })

  await prisma.archiveUser.create({
    data: {
      id: 'NO_ID',
      name: 'Probably a bot',
    },
  })

  await prisma.archiveUser.create({
    data: {
      id: 'UNKNOWN_ID',
      name: 'Probably an external user',
    },
  })

  const channels: JSONChannel[] = JSON.parse(
    fs.readFileSync(path.join(ARCHIVE_DIR, 'channels.json'), 'utf-8')
  ).filter((ch: JSONChannel) => (ONLY ? ch.name === ONLY : true))

  for (const channel of channels) {
    console.log(`Importing ${channel.name}...`)

    await prisma.archiveChannel.create({
      data: { name: channel.name, id: channel.id },
    })

    const channelDir = path.join(ARCHIVE_DIR, channel.name)
    const files = fs
      .readdirSync(channelDir)
      .map((f) => path.join(channelDir, f))

    for (const file of files) {
      console.log(`  importing ${file}...`)
      const messages: JSONMessage[] = JSON.parse(
        fs.readFileSync(file).toString()
      )

      const normalMessages: Message[] = []
      const threadMessages: ThreadMessage[] = []

      for (const m of messages) {
        // m.ts bc of random shit like `canvas_in_the_conversation.json`
        if (m.ts) {
          if (!m.user) {
            m.user = 'NO_ID'
          } else if (!users.find((u) => u.id === m.user)) {
            m.user = 'UNKNOWN_ID'
          }

          if (m.parent_user_id && m.thread_ts && !m.reply_count)
            threadMessages.push({ ...m, id: randomUUID() } as ThreadMessage)
          else normalMessages.push({ ...m, id: randomUUID() } as Message)
        }
      }

      await prisma.archiveMessage.createMany({
        data: normalMessages.map((m) => ({
          id: m.id,
          ts: m.ts,
          text: m.text || '',
          channelId: channel.id,
          userId: m.user,
          isThread: m.thread_ts && m.reply_count ? true : false,
        })),
      })

      const threadRootMessages = await prisma.archiveMessage.findMany({
        where: { isThread: true },
      })

      const threadMessagesWithParents = threadMessages.map((m) => {
        const parentMessage = threadRootMessages.find(
          (rm) => rm.ts === m.thread_ts
        )

        if (!parentMessage) {
          console.error(m)
          throw new Error('Fix')
        }

        return {
          id: m.id,
          ts: m.ts,
          text: m.text || '',
          parentId: parentMessage!.id,
          userId: m.user,
        }
      })

      await prisma.archiveThreadMessage.createMany({
        data: threadMessagesWithParents,
      })
    }
  }
}

main()
