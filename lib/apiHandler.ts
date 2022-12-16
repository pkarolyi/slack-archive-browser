import type {
  ApiHandlerParams,
  AuthorizedApiHandlers,
  CustomErrorOptions,
  ApiHandlers,
  ApiHandler,
  AuthorizedApiHandler,
} from '@interfaces/api'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken, JWT } from 'next-auth/jwt'

export function unauthorizedApiHandler(handlers: ApiHandlers) {
  const internalAPIHandler = async (
    req: NextApiRequest,
    res: NextApiResponse
  ) => {
    try {
      const handler = getHandler({ req, res }, handlers)

      await handler({ req, res })
    } catch (error: any) {
      errorHandler(error, res)
    }
  }
  return internalAPIHandler
}

export function authorizedApiHandler(handlers: AuthorizedApiHandlers) {
  const internalAPIHandler = async (
    req: NextApiRequest,
    res: NextApiResponse
  ) => {
    try {
      const handler = getHandler({ req, res }, handlers)

      let jwt: JWT | null = { sub: 'fake' }
      if (process.env.INSECURE_DISABLE_AUTH !== 'yes_im_sure') {
        jwt = await getToken({ req })
        if (!jwt) throw new CustomError('Unauthorized', { status: 401 })
      }

      await handler({ req, res, jwt })
    } catch (error: any) {
      errorHandler(error, res)
    }
  }
  return internalAPIHandler
}

// Overloads for correct typings
function getHandler(params: ApiHandlerParams, handlers: ApiHandlers): ApiHandler
function getHandler(
  params: ApiHandlerParams,
  handlers: AuthorizedApiHandlers
): AuthorizedApiHandler

function getHandler({ req }: ApiHandlerParams, handlers: any) {
  const method = req.method as string

  if (method && !handlers[method]) {
    const allowed = Object.keys(handlers)
    throw new CustomError(`Method ${method} is not allowed`, {
      status: 405,
      allowed,
    })
  }

  return handlers[method]
}

function errorHandler(error: CustomError, res: NextApiResponse) {
  console.error(error)
  if (error.allowed) res.setHeader('Allow', error.allowed)
  return res.status(error.status || 500).json({
    message: error.message,
  })
}

export class CustomError extends Error {
  constructor(message: string, options?: CustomErrorOptions, ...params: any) {
    super(message, ...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError)
    }

    this.name = 'CustomError'
    this.status = options?.status || 500
    this.allowed = options?.allowed || []

    if (options?.error && options.error.stack) {
      this.stack =
        this.stack
          ?.split('\n')
          .slice(0, (this.message.match(/\n/g) || []).length + 2)
          .join('\n') +
        '\n' +
        options.error.stack
    }
  }

  status: number
  allowed: string[]
}
