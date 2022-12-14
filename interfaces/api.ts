import type { NextApiRequest, NextApiResponse } from 'next'
import type { JWT } from 'next-auth/jwt'

export type CustomErrorOptions = {
  status?: number
  error?: Error
  allowed?: string[]
}

export interface ApiHandlerParams {
  req: NextApiRequest
  res: NextApiResponse
}

export type ApiHandler = (params: ApiHandlerParams) => any

export interface ApiHandlers {
  [key: string]: ApiHandler
}

export interface AuthorizedApiHandlerParams extends ApiHandlerParams {
  jwt: JWT
}

export type AuthorizedApiHandler = (params: AuthorizedApiHandlerParams) => any

export interface AuthorizedApiHandlers {
  [key: string]: AuthorizedApiHandler
}
