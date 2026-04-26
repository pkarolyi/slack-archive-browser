import "dotenv/config";
import { PrismaClient, MessageType } from "@sab/db";
import { PrismaPg } from "@prisma/adapter-pg";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";

console.log(
  "Assuming clean database. If you have previous messages loaded reset the database!",
);

const adapter = new PrismaPg({
  connectionString: process.env.POSTGRES_URL,
});
const prisma = new PrismaClient({ adapter });

const ARCHIVE_DIR = path.join(process.cwd(), process.argv[2]);

const ONLY = process.argv[3] || null;

const BATCH_SIZE = 5000;

function escapeSQL(str: string): string {
  return str.replace(/'/g, "''");
}

function sqlVal(val: string | null): string {
  if (val === null) return "NULL";
  return `'${escapeSQL(val)}'`;
}

async function createUsers(users: any[]) {
  // create user from users.json
  await prisma.user.createMany({
    data: users.map((u) => ({
      id: u.id,
      name: u.profile.display_name || u.name,
      imageUrl: u.profile.image_72,
    })),
  });

  // create special users
  await prisma.user.create({
    data: {
      id: "USLACKBOT",
      name: "Slackbot",
      imageUrl: "https://a.slack-edge.com/80588/img/slackbot_72.png",
    },
  });
  await prisma.user.create({
    data: {
      id: "NO_ID",
      name: "[some_bot]",
    },
  });
  await prisma.user.create({
    data: {
      id: "UNKNOWN_ID",
      name: "[external_user]",
    },
  });
}

async function createMessages(
  channelId: string,
  users: any[],
  messages: any[],
) {
  const processedMessages: any[] = [];
  const reactions: any[] = [];
  const childMeta: any = {};
  const parentLookup: any = {};
  for (const message of messages) {
    // some random entries are not messages, these don't have a ts
    if (!message.ts) continue;

    // resolve missing or unknown user IDs
    if (!message.user) {
      message.user = "NO_ID";
    } else if (
      message.user !== "USLACKBOT" &&
      !users.find((u) => u.id === message.user)
    ) {
      message.user = "UNKNOWN_ID";
    }

    // messages don't have a consistent ID so we generate one
    message.id = randomUUID();

    // determine message type (need long checks because of inconsistencies)
    if (message.thread_ts && message.parent_user_id && !message.reply_count) {
      // message is in a thread
      if (message.subtype === "thread_broadcast" && message.root) {
        // message is also sent to channel
        message.type = MessageType.THREAD_CHILD_BROADCAST;
      } else {
        message.type = MessageType.THREAD_CHILD;
      }
      // populate parent-searching metadata for child
      childMeta[message.id] = {
        parent_user_id: message.parent_user_id,
        thread_ts: message.thread_ts,
      };
    } else {
      // message is not in a thread
      if (message.thread_ts && message.reply_count) {
        // message has thread replies
        message.type = MessageType.THREAD_PARENT;
        // speed-up lookup for finding this as a parent
        parentLookup[message.ts] = message.id;
      } else {
        message.type = MessageType.NORMAL;
      }
    }

    processedMessages.push({
      id: message.id,
      ts: message.ts,
      type: message.type,
      isoDate: new Date(message.ts.split(".")[0] * 1000).toISOString(),
      text: message.text || "[empty_message_text]",
      blocks: message.blocks
        ? JSON.stringify(message.blocks)
        : null,
      userId: message.user,
      channelId: channelId,
      parentId: null as string | null,
    });

    // process reactions
    if (message.reactions) {
      for (const reaction of message.reactions) {
        for (const user of reaction.users) {
          reactions.push({
            id: randomUUID(),
            messageId: message.id,
            userId: user,
            name: reaction.name,
          });
        }
      }
    }
  }

  // for thread messages we need to find their parent
  for (const message of processedMessages) {
    if (
      message.type === MessageType.THREAD_CHILD ||
      message.type === MessageType.THREAD_CHILD_BROADCAST
    ) {
      const meta = childMeta[message.id];
      const parentId = parentLookup[meta.thread_ts];
      if (parentId) {
        message.parentId = parentId;
      } else {
        console.warn("No parent for thread message", message.ts);
        throw new Error();
      }
    }
  }

  console.log(`    creating ${processedMessages.length} messages...`);
  for (let i = 0; i < processedMessages.length; i += BATCH_SIZE) {
    const batch = processedMessages.slice(i, i + BATCH_SIZE);
    const values = batch
      .map(
        (m) =>
          `(${sqlVal(m.id)},${sqlVal(m.ts)},${sqlVal(m.isoDate)},${sqlVal(m.text)},${m.blocks ? `'${escapeSQL(m.blocks)}'::jsonb` : "NULL"},${sqlVal(m.type)},${sqlVal(m.channelId)},${sqlVal(m.userId)},${sqlVal(m.parentId)})`,
      )
      .join(",");
    await prisma.$executeRawUnsafe(
      `INSERT INTO "Message" ("id","ts","isoDate","text","blocks","type","channelId","userId","parentId") VALUES ${values}`,
    );
  }

  console.log(`    creating ${reactions.length} reactions...`);
  for (let i = 0; i < reactions.length; i += BATCH_SIZE) {
    const batch = reactions.slice(i, i + BATCH_SIZE);
    const values = batch
      .map(
        (r) =>
          `(${sqlVal(r.id)},${sqlVal(r.name)},${sqlVal(r.messageId)},${sqlVal(r.userId)})`,
      )
      .join(",");
    await prisma.$executeRawUnsafe(
      `INSERT INTO "Reaction" ("id","name","messageId","userId") VALUES ${values}`,
    );
  }
}

async function createChannels(users: any[], channels: any[]) {
  for (const channel of channels) {
    console.log(`  importing ${channel.name}...`);

    await prisma.channel.create({
      data: {
        name: channel.name,
        id: channel.id,
        isGeneral: channel.is_general,
      },
    });

    const channelDir = path.join(ARCHIVE_DIR, channel.name);
    const files = fs.readdirSync(channelDir);

    const messages: any[] = [];
    for (const file of files) {
      const filePath = path.join(channelDir, file);
      const fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      messages.push(...fileContent);
    }

    await createMessages(channel.id, users, messages);
  }
}

async function main() {
  console.log("Importing users...");
  const users: any[] = JSON.parse(
    fs.readFileSync(path.join(ARCHIVE_DIR, "users.json"), "utf-8"),
  );

  await createUsers(users);

  console.log("Importing channels...");
  const channels: any[] = JSON.parse(
    fs.readFileSync(path.join(ARCHIVE_DIR, "channels.json"), "utf-8"),
  ).filter((ch: any) => (ONLY ? ch.name === ONLY : true));

  await createChannels(users, channels);
}

main();
