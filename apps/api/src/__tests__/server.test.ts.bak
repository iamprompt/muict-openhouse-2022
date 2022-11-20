import supertest from 'supertest'
import { createServer } from '../server'
import { mocked } from 'ts-jest/utils'

import { TextEncoder, TextDecoder } from 'util'

import * as mockingoose from 'mockingoose'

// import axios from 'axios'
import mockAxios from 'jest-mock-axios'
import { Client } from '@line/bot-sdk'
import Participant from '~/models/participant.model'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

jest.mock('@line/bot-sdk')
const mockLineClient = mocked(Client, true)

describe('server', () => {
  beforeEach(() => {
    mockLineClient.mockClear()
  })

  afterEach(() => {
    mockAxios.reset()
  })

  it('line participant is registered, should return "registered" status', async () => {
    mockAxios.post.mockResolvedValue({
      data: {
        sub: 'U1234567890abcdef1234567890abcdef',
        name: 'John Doe',
        picture: 'https://example.com/picture.jpg',
        email: 'john.doe@gmail.com',
      },
    })

    mockingoose(Participant).toReturn(
      {
        _id: '5f9f1b9b9b9b9b9b9b9b9b9b',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@gmail.com',
        lineUserId: 'U1234567890abcdef1234567890abcdef',
        lineDisplayName: 'John Doe',
        linePictureUrl: 'https://example.com/picture.jpg',
      },
      'findOne'
    )

    await supertest(createServer())
      .get('/api/users/isRegistered')
      .set('Authorization', 'Bearer 123')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          success: true,
          payload: {
            isRegistered: true,
          },
        })
      })
  })

  it('line participant is not registered yet, should return "not registered" status', async () => {
    mockAxios.post.mockResolvedValue({
      data: {
        sub: 'U1234567890abcdef1234567890abcdef',
        name: 'John Doe',
        picture: 'https://example.com/picture.jpg',
        email: 'john.doe@gmail.com',
      },
    })

    mockingoose(Participant).toReturn(null, 'findOne')

    await supertest(createServer())
      .get('/api/users/isRegistered')
      .set('Authorization', 'Bearer 123')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          success: true,
          payload: {
            isRegistered: false,
          },
        })
      })
  })

  it('line participant is not registered yet, should return "not registered" status', async () => {
    mockingoose(Participant).toReturn(null, 'findOne')

    await supertest(createServer())
      .get('/api/users/isRegistered')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          success: true,
          payload: {
            isRegistered: false,
          },
        })
      })
  })
})
