import { AuthorizedApiHandlerParams } from '@interfaces/api'
import { authorizedApiHandler } from '@lib/apiHandler'

async function hello({ req, res, jwt }: AuthorizedApiHandlerParams) {
  return res.status(200).json(jwt)
}

export default authorizedApiHandler({ GET: hello })
