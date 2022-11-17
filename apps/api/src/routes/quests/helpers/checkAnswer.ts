import { normalizeString } from '../../../utils/string'

export const checkAnswer = (expectedAnswer: string | string[], answer: string | string[]) => {
  const normalizedExpectedAnswer = Array.isArray(expectedAnswer)
    ? expectedAnswer.map((a) => normalizeString(a))
    : [normalizeString(expectedAnswer)]

  const normalizedAnswer = Array.isArray(answer) ? answer.map((a) => normalizeString(a)) : [normalizeString(answer)]

  const result = normalizedAnswer.every((a) => normalizedExpectedAnswer.includes(a))

  return result
}
