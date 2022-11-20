import { checkAnswer } from '~/routes/quests/helpers/checkAnswer'
import { getQuestQuestion } from '~/routes/quests/helpers/getQuestQuestion'
import {getLineUserFromRequest} from '~/routes/users/helpers/getLineUserFromRequest'
import { Request } from 'express'
jest.mock('~/routes/users/helpers/getLineUserFromIdToken')
import { getLineUserFromIdToken, LineUserProfile } from '~/routes/users/helpers/getLineUserFromIdToken'
import { getMockReq, getMockRes } from '@jest-mock/express'

describe('register-unit-tests.ts', () => {
  /**
   * Test check answer.
   *  checkAnserwer(expectedAnswer, answer) uses to check between two strings are the same or not.
   * If thery are the same, it will return true. Otherwise, it will return false.
   *
   * For this test case, we apply ISP technique. In result, it can achive high percentage of
   * coverage.
   */
  it('testCheckAnswer', async () => {
    expect(checkAnswer('MUICT', 'MUICT')).toBe(true)
    expect(checkAnswer('', 'MUICT')).toBe(false)
    expect(checkAnswer(['MUICT', 'LA'], [''])).toBe(false)
    expect(checkAnswer('MUICT', 'LA')).toBe(false)
  })

  /**
   * Test get quest question.
   *  getQuestQuestion(questNo, lang, question, answer) will get a question according to questNo.
   * It will form a question as well by call formquestion(). This function will return an object of
   * question including:
   *  - id
   *  - type
   *  - questNo
   *  - questTitle
   *  - question
   *  - expectedAnswer
   *
   * In this testcase, we combined ISP and graph coverage technique to acheive 75% coverage.
   *
   */
  it('testGetQuestQuestion', async () => {
    expect(await getQuestQuestion(2, 'th', true, true)).toMatchObject([
      {
        id: 'Q1',
        type: 'TEXT_FIELD',
        questNo: 2,
        questTitle: 'Meet & Greet Zone',
        question: 'จำนวนชมรม (Club) ที่จัดแสดงมีกี่ชมรม',
        expectedAnswer: ['4', 'four', 'สี่', '4 ชมรม', '4 clubs', 'four clubs', '4 club', 'four club'],
      },
    ])

    try {
      await getQuestQuestion(6, 'th', true, true)
    } catch (e) {
      expect(e.message).toBe('Question not found')
    }

    try {
      await getQuestQuestion(-1, 'th', true, true)
    } catch (e) {
      expect(e.message).toBe('Question not found')
    }

    expect(await getQuestQuestion(2, 'en', true, true)).toMatchObject([
      {
        id: 'Q1',
        type: 'TEXT_FIELD',
        questNo: 2,
        questTitle: 'Meet & Greet Zone',
        question: 'How many clubs do we have for the open house?',
        expectedAnswer: ['4', 'four', 'สี่', '4 ชมรม', '4 clubs', 'four clubs', '4 club', 'four club'],
      },
    ])

    // @ts-expect-error
    expect(await getQuestQuestion(2, 'jp', true, true)).toMatchObject([
      {
        id: 'Q1',
        type: 'TEXT_FIELD',
        questNo: 2,
        questTitle: undefined,
        question: undefined,
        expectedAnswer: ['4', 'four', 'สี่', '4 ชมรม', '4 clubs', 'four clubs', '4 club', 'four club'],
      },
    ])

    expect(await getQuestQuestion(2, 'th', true, false)).toMatchObject([
      {
        id: 'Q1',
        type: 'TEXT_FIELD',
        questNo: 2,
        questTitle: 'Meet & Greet Zone',
        question: 'จำนวนชมรม (Club) ที่จัดแสดงมีกี่ชมรม',
      },
    ])

    expect(await getQuestQuestion(2, 'th', false, true)).toMatchObject([
      {
        id: 'Q1',
        type: 'TEXT_FIELD',
        questNo: 2,
        questTitle: 'Meet & Greet Zone',
        expectedAnswer: ['4', 'four', 'สี่', '4 ชมรม', '4 clubs', 'four clubs', '4 club', 'four club'],
      },
    ])

    expect(await getQuestQuestion(5, 'th', false, false)).toMatchObject([
      {
        id: 'Q5',
        type: 'MULTIPLE_CHOICE',
        questNo: 5,
        questTitle: 'Innovative Projects Zone',
        choices: {
          'v-achilles': 'V-Achilles',
          mosquito: 'Mosquito',
          'vr-xylophone': 'VR Xylophone',
          midjourney: 'Midjourney',
          psimilan: 'PSIMILAN',
          'food-spoilage': 'Food Spoilage',
          airadar: 'Airadar',
          'dall-e': 'DALL-E',
          'web-audit-tool': 'Web Audit Tool',
          microusity: 'Microusity',
          'mu-blink-analyzer': 'MU Blink Analyzer',
          tpt: 'TPT',
          'receipt-recognizer': 'Receipt Recognizer',
          isit: 'iSit',
          'suture-bot': 'Suture Bot',
          'cof-learn': 'Cof-Learn',
          ocr: 'OCR',
          wabiqa: 'WabiQA',
          ezfit: 'EzFIT',
          'fixme-bot': 'FixMe Bot',
          mirai: 'Mirai',
          'smart-color': 'Smart Color',
          esit: 'eSit',
          landsage: 'LandSage',
          automl: 'AutoML',
          orchidator: 'Orchidator',
          'github-autopilot': 'Github Autopilot',
          'self-driving-car': 'Self-driving car',
          gaifa: 'GAIFA',
          'stable-diffusion': 'Stable Diffusion',
          'air-quality-monitoring': 'Air Quality Monitoring',
          whitedefender: 'WhiteDefender',
        },
      },
    ])

    expect(await getQuestQuestion(3)).toMatchObject([
      {
        id: 'Q2',
        type: 'TEXT_FIELD',
        questNo: 3,
        questTitle: 'International Experiences Zone',
        question: 'ประเทศที่มีจำนวน Exchange Students มากที่สุดคือประเทศใด',
      },
    ])
  })

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
   it('testGetLineUserFromReq', async () => {
    let req = {
      headers : {
        authorization: 'idk imokay'
      }
    }

    const mockedGetLineUserFromIdToken = getLineUserFromIdToken as unknown as jest.Mock<LineUserProfile>;
    mockedGetLineUserFromIdToken.mockReturnValue(
      {
          userId: '1234',
          displayName: "mairu",
          picture: "src/public/image.png",
          email: "mairu@gmail.com",
        }
    );

    const mockreq = getMockReq({
      headers: {
        authorization: 'Bearer 1234'
      }
    })

    expect(await getLineUserFromRequest(mockreq)).toMatchObject({
      userId: '1234',
      displayName: "mairu",
      picture: "src/public/image.png",
      email: "mairu@gmail.com",
    })
    
    const mockreq2 = getMockReq({
      headers: {
        authorization: 'token 1234'
      }
    })
    expect(await getLineUserFromRequest(mockreq2)).toBeNull();
    
  });
})
