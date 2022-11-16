import { Request } from 'express'

export const getAuthorizationToken = (req: Request) => {
  const { authorization } = req.headers
  if (!authorization) {
    return null
  }
  const [type, token] = authorization.split(' ')
  if (type !== 'Bearer') {
    return null
  }
  return token
}
