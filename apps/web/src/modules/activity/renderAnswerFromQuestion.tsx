import type { FieldValues, UseFormRegister, UseFormWatch } from 'react-hook-form'
import TextInput from '~/components/Input/TextInput'
import type { IQuestion } from '~/const/activity/questions'
import { QUESTION_TYPE } from '~/const/activity/questions'
import ChoiceGroup from '~/routes/Activity/components/Input/ChoiceGroup'

export const renderAnswerFromQuestion = (
  question: IQuestion,
  register: UseFormRegister<FieldValues>,
  watch: UseFormWatch<FieldValues>,
) => {
  if (question.type === QUESTION_TYPE.MULTIPLE_CHOICE) {
    return (
      <ChoiceGroup
        register={register}
        watch={watch}
        name="answer"
        type="radio"
        options={Object.entries(question.choices).map(([value, label]) => ({
          label,
          value,
        }))}
      />
    )
  }

  if (question.type === QUESTION_TYPE.MULTIPLE_SELECT) {
    return (
      <ChoiceGroup
        register={register}
        watch={watch}
        name="answer"
        type="checkbox"
        options={Object.entries(question.choices).map(([value, label]) => ({
          label,
          value,
        }))}
      />
    )
  }

  return <TextInput className="w-full" {...register('answer')} />
}
