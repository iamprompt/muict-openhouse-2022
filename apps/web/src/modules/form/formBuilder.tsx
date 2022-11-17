import type { FC } from 'react'
import type { FieldErrorsImpl, FieldValues, UseFormRegister, UseFormWatch } from 'react-hook-form'
import TextAreaInput from '~/components/Input/TextAreaInput'
import TextInput from '~/components/Input/TextInput'
import ChoiceGroup from '~/routes/Activity/components/Input/ChoiceGroup'
import type { IFormSection } from '~/types/formbuilder'
import { QuestionType } from '~/types/formbuilder'
import { strSubstitute } from '~/utils/string'

interface FormBuilderProps {
  form: IFormSection
  register: UseFormRegister<FieldValues>
  watch: UseFormWatch<FieldValues>
  i18n?: any
  errors?: Partial<
    FieldErrorsImpl<{
      [x: string]: any
    }>
  >
}

export const FormBuilder: FC<FormBuilderProps> = ({ form, register, watch, errors, i18n }) => {
  const t = i18n || ((key) => key)

  return (
    <>
      <h1 className="mb-5 font-heading text-xl font-extrabold">
        {strSubstitute(t('SECTION_TITLE_TEMPLATE'), form.sectionNo)}: {t(form.sectionName)}
      </h1>
      <div className="space-y-10 divide-y">
        {form.questions.map((group) => {
          return (
            <section key={t(group.groupName)}>
              {group.isTitleShown && <h2 className="mb-3 mt-8 font-heading text-xl font-bold">{t(group.groupName)}</h2>}

              <div className="space-y-5">
                {group.questions.map((question) => {
                  return (
                    <div key={question.questionNo}>
                      <label className="mb-3 block font-heading text-base font-bold">
                        {question.questionNo}. {t(question.question)}
                      </label>
                      {question.questionType === QuestionType.Text ? (
                        <TextInput error={errors?.[question.key]?.message?.toString()} {...register(question.key)} />
                      ) : question.questionType === QuestionType.Radio ? (
                        <ChoiceGroup
                          name={question.key}
                          options={question.options.map((option) => ({
                            label: t(option.label),
                            value: option.value,
                          }))}
                          register={register}
                          watch={watch}
                        />
                      ) : question.questionType === QuestionType.Checkbox ? (
                        <ChoiceGroup
                          type="checkbox"
                          name={question.key}
                          options={question.options.map((option) => ({
                            label: t(option.label),
                            value: option.value,
                          }))}
                          register={register}
                          watch={watch}
                        />
                      ) : question.questionType === QuestionType.MultipleText ? (
                        <div className="space-y-3">
                          {question.quantity &&
                            Array.from(Array(question.quantity)).map((_, i) => {
                              return (
                                <div key={`${question.key}.${i}`}>
                                  {question.subAnswersTitle && (
                                    <div className="font-heading">
                                      {strSubstitute(t(question.subAnswersTitle), i + 1)}
                                    </div>
                                  )}
                                  <TextInput className="w-full" {...register(`${question.key}.${i}`)} />
                                </div>
                              )
                            })}
                        </div>
                      ) : question.questionType === QuestionType.TextArea ? (
                        <TextAreaInput className="w-full" {...register(question.key)} />
                      ) : null}
                    </div>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </>
  )
}
