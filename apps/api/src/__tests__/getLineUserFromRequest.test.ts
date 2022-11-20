import { Request } from 'express'
import { mocked } from 'ts-jest/utils'
import { getLineUserFromRequest } from '~/routes/users/helpers/getLineUserFromRequest'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = mocked(axios, true)

/**
 * Test get line user from requets.
 * getLineUserFromReq(NextApiRequest) will get Line user information by using token from header
 * If token is valid, it will return
 *  - userId
 *  - displayName
 *  - picture
 *  - email
 * Otherwise, it will throw an error.
 *
 * In this test, we apply graph technique, since this function contains only 1 condition.
 */
describe('getLineUserFromRequest', () => {
  afterEach(() => {
    mockedAxios.mockClear()
  })

  it('should return line user', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        sub: 'U1234567890abcdef1234567890abcdef',
        name: 'John Doe',
        picture: 'https://example.com/picture.jpg',
        email: 'john.doe@gmail.com',
      },
    })

    const requestPayload = {
      headers: {
        authorization: 'Bearer ValidToken',
      },
    } as Request

    const user = await getLineUserFromRequest(requestPayload)

    expect(user).toMatchObject({
      userId: 'U1234567890abcdef1234567890abcdef',
      displayName: 'John Doe',
      picture: 'https://example.com/picture.jpg',
      email: 'john.doe@gmail.com',
    })
  })

  it('should return null (invalid token)', async () => {
    mockedAxios.post.mockRejectedValue({
      data: {
        error: 'invalid_request',
        error_description: 'Invalid IdToken.',
      },
    })

    const requestPayload = {
      headers: {
        authorization: 'token InvalidToken',
      },
    } as Request

    const user = await getLineUserFromRequest(requestPayload)

    expect(user).toBeNull()
  })

  it('should return null (token not provided)', async () => {
    const requestPayload = {
      headers: {},
    } as Request

    const user = await getLineUserFromRequest(requestPayload)

    expect(user).toBeNull()
  })
})
