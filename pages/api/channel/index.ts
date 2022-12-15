import { AuthorizedApiHandlerParams } from '@interfaces/api'
import { authorizedApiHandler } from '@lib/apiHandler'
import { prisma } from '@lib/prisma'

async function getChannels({ req, res, jwt }: AuthorizedApiHandlerParams) {
  const channels = await prisma.archiveChannel.findMany()
  return res.status(200).json(channels)
}

export default authorizedApiHandler({ GET: getChannels })
