import { I18nTranslation, IQuestion, QUESTIONS, QUESTION_TYPE } from '~/const/quests/questions'

export const formatQuestion = (
  question: IQuestion<I18nTranslation>,
  lang: 'th' | 'en' = 'th',
  showQuestion = false,
  showAnswer = false
) => {
  const questionResult: Partial<IQuestion> = {
    id: question.id,
    type: question.type,
    questNo: question.questNo,
    questTitle: question.questTitle[lang],
  }

  if (question.type === QUESTION_TYPE.MULTIPLE_CHOICE || question.type === QUESTION_TYPE.MULTIPLE_SELECT) {
    const choiceEntries = Object.entries(question.choices)

    const randomChoices: Record<string, string> = {}

    for (let i = 0; choiceEntries.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * choiceEntries.length)
      const elem = choiceEntries.splice(randomIndex, 1)[0]
      Object.assign(randomChoices, {
        [elem[0]]: elem[1][lang],
      })
    }

    Object.assign(questionResult, {
      choices: randomChoices,
    })
  }

  if (showQuestion) {
    Object.assign(questionResult, {
      question: question.question[lang],
    })
  }

  if (showAnswer) {
    Object.assign(questionResult, {
      expectedAnswer: question.expectedAnswer,
    })
  }

  return questionResult as IQuestion
}

export const getQuestQuestion = async (questNo: number, lang: 'th' | 'en' = 'th', question = true, answer = false) => {
  const quests = QUESTIONS.filter((q) => q.questNo === questNo)

  if (!quests || !quests.length) {
    throw new Error('Question not found')
  }

  return quests.map((q) => formatQuestion(q, lang, question, answer))
}
