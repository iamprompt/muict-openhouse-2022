import { Request } from 'express'
import { getAuthorizationToken } from '../../../utils'
import { getLineUserFromIdToken } from './getLineUserFromIdToken'

export const getLineUserFromRequest = async (req: Request) => {
  try {
    const token = getAuthorizationToken(req)
    if (!token) {
      // throw new Error('No LINE Id token provided')
      return null
    }

    const user = await getLineUserFromIdToken(token)
    return user
  } catch (error: any) {
    throw new Error(error.message)
  }
}
