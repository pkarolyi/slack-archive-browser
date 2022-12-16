import { AuthorizedApiHandlerParams } from '@interfaces/api'
import { authorizedApiHandler, CustomError } from '@lib/apiHandler'
import { prisma } from '@lib/prisma'

async function getMessages({ req, res, jwt }: AuthorizedApiHandlerParams) {
  const {
    query: { channelId, before, count },
  }: any = req

  if (!channelId) {
    throw new CustomError('channelId is required', {
      status: 400,
    })
  }

  const take = parseInt(count) || 100

  if (before) {
    const messages = await prisma.archiveMessage.findMany({
      take,
      skip: 1,
      cursor: {
        channelId_ts: {
          channelId,
          ts: before,
        },
      },
      orderBy: {
        ts: 'desc',
      },
      where: { channelId },
    })

    return res.status(200).json(messages)
  } else {
    const messages = await prisma.archiveMessage.findMany({
      take,
      orderBy: {
        ts: 'desc',
      },
      where: { channelId },
    })

    return res.status(200).json(messages)
  }
}

export default authorizedApiHandler({ GET: getMessages })
