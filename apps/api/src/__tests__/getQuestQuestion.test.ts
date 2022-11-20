import { getQuestQuestion } from '~/routes/quests/helpers/getQuestQuestion'

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
describe('getQuestQuestion', () => {
  it('should return a question object', async () => {
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
  })

  it('should return a question object without showing question and answer', async () => {
    const result = await getQuestQuestion(2)

    expect(result).toMatchObject([
      {
        id: 'Q1',
        type: 'TEXT_FIELD',
        questNo: 2,
        questTitle: 'Meet & Greet Zone',
      },
    ])
  })

  it('should return a question object with choice', async () => {
    expect(await getQuestQuestion(4, 'th', true, true)).toMatchObject([
      {
        id: 'Q3',
        type: 'TEXT_FIELD',
        questNo: 4,
        questTitle: 'Guidance Zone',
        question: 'หลักสูตรปริญญาตรี ICT Program มีทั้งหมดกี่ Specializations',
        expectedAnswer: ['8', 'eight', 'แปด', '8 สาขา', '8 specializations'],
      },
      {
        id: 'Q4',
        type: 'MULTIPLE_CHOICE',
        questNo: 4,
        questTitle: 'Guidance Zone',
        question: 'หลักสูตรปริญญาตรีใดของคณะ ICT ที่มุ่งเน้นการทำสหกิจศึกษาและฝึกงาน',
        choices: {
          'ict-program': 'ICT Program',
          'dst-program': 'DST Program',
        },
        expectedAnswer: 'dst-program',
      },
    ])
  })

  it('should throw an error if the question is not found', async () => {
    try {
      await getQuestQuestion(6, 'th', true, true)
    } catch (e) {
      expect(e.message).toBe('Question not found')
    }
  })

  it('should throw an error if the question number is negative', async () => {
    try {
      await getQuestQuestion(-1, 'th', true, true)
    } catch (e) {
      expect(e.message).toBe('Question not found')
    }
  })

  it('should return a question object in English', async () => {
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
  })
})
