import { AuthorizedApiHandlerParams } from '@interfaces/api'
import { authorizedApiHandler, CustomError } from '@lib/apiHandler'
import { prisma } from '@lib/prisma'

async function getMessages({ req, res, jwt }: AuthorizedApiHandlerParams) {
  const {
    query: { channelId },
  }: any = req

  if (!channelId) {
    throw new CustomError('channelId is required', { status: 400 })
  }

  const messages = await prisma.archiveMessage.findMany({
    where: { channelId },
  })
  return res.status(200).json(messages)
}

export default authorizedApiHandler({ GET: getMessages })
