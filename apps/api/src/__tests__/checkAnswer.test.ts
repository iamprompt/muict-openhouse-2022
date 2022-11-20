import { checkAnswer } from '~/routes/quests/helpers/checkAnswer'

/**
 * Test check answer.
 *  checkAnserwer(expectedAnswer, answer) uses to check between two strings are the same or not.
 * If thery are the same, it will return true. Otherwise, it will return false.
 *
 * For this test case, we apply ISP technique. In result, it can achive high percentage of
 * coverage.
 */
describe('Check Answer Function', () => {
  it('should return true if the answer is correct', () => {
    expect(checkAnswer('MUICT', 'MUICT')).toBe(true)
  })

  it('should return false if the answer is incorrect', () => {
    expect(checkAnswer('MUICT', 'LA')).toBe(false)
  })

  it('should return false if the answer is incorrect', () => {
    expect(checkAnswer(['MUICT', 'MUIC'], 'LA')).toBe(false)
  })

  it('should return false if the answer is empty', () => {
    expect(checkAnswer('MUICT', '')).toBe(false)
  })

  it('should return false if the answer is an array', () => {
    expect(checkAnswer('MUICT', [''])).toBe(false)
  })
})
