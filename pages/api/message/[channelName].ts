import { AuthorizedApiHandlerParams } from '@interfaces/api'
import { authorizedApiHandler, CustomError } from '@lib/apiHandler'
import { prisma } from '@lib/prisma'

async function getMessages({ req, res, jwt }: AuthorizedApiHandlerParams) {
  const {
    query: { channelName, from, count },
  }: any = req

  if (!channelName)
    throw new CustomError('channelName is required', {
      status: 400,
    })

  const take = parseInt(count) || 100
  const channel = await prisma.archiveChannel.findUnique({
    where: { name: channelName },
  })

  if (!channel)
    throw new CustomError(`Channel ${channelName} does not exist`, {
      status: 400,
    })

  if (from) {
    const messages = await prisma.archiveMessage.findMany({
      take,
      skip: 1,
      cursor: {
        channelId_ts: {
          channelId: channel.id,
          ts: from,
        },
      },
      orderBy: {
        ts: 'asc',
      },
      where: { channelId: channel.id },
    })

    return res.status(200).json(messages)
  } else {
    const messages = await prisma.archiveMessage.findMany({
      take,
      orderBy: {
        ts: 'asc',
      },
      where: { channelId: channel.id },
    })

    return res.status(200).json(messages)
  }
}

export default authorizedApiHandler({ GET: getMessages })
