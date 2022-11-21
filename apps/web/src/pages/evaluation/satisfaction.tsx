import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import type { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { generalSchema } from './general'
import Button from '~/components/Button'
import { EvaluationHeaderWordmark } from '~/components/Icons'
import { Evaluation_EN } from '~/const/evaluation/evaluationForm'
import { useStoreon } from '~/context/storeon'
import Wrapper from '~/layouts/Wrapper'
import { FormBuilder } from '~/modules/form/formBuilder'

export const getStaticProps: GetStaticProps = async ({ locale = 'th' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'evaluation'])),
  },
})

export const satisfactionSchema = generalSchema.keys({
  'date-and-time-rating': Joi.string().required(),
  'location-rating': Joi.string().required(),
  'service-rating': Joi.string().required(),
  'understanding-rating': Joi.string().required(),
  'stage-rating': Joi.string().required(),
  'booths-rating': Joi.string().required(),
  'project-rating': Joi.string().required(),
  'guidance-rating': Joi.string().required(),
  'intl-exp-rating': Joi.string().required(),
  'benefit-rating': Joi.string().required(),
  'overall-rating': Joi.string().required(),
  'interest-rating': Joi.string().required(),
})

const Page: NextPage = () => {
  const { t } = useTranslation('evaluation')
  const { push } = useRouter()
  const { form, dispatch } = useStoreon('form')
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(satisfactionSchema),
    defaultValues: form.evaluation,
  })

  return (
    <Wrapper>
      <div className="mx-auto flex min-h-screen max-w-screen-md flex-col px-8 py-10 sm:justify-center">
        <form
          onSubmit={handleSubmit(
            (data) => {
              dispatch('form/evaluation/setFields', data)
              push('/evaluation/others')
            },
            (error) => {
              console.log(error)
            },
          )}
        >
          <div className="rounded-xl sm:bg-white sm:p-16 sm:text-black">
            <EvaluationHeaderWordmark className="mb-6 text-white sm:text-black" />
            <FormBuilder form={Evaluation_EN[1]} register={register} errors={errors} watch={watch} i18n={t} />
          </div>
          <div className="mt-10 flex justify-between">
            <Button
              label={t('BUTTON_LABEL.BACK')}
              variant="primary"
              className="w-32"
              onClick={() => push('/evaluation/general')}
            />
            <Button
              type="submit"
              data-test="next-button"
              label={t('BUTTON_LABEL.NEXT')}
              variant="ictTurquoise"
              className="w-32"
            />
          </div>
        </form>
      </div>
    </Wrapper>
  )
}

export default Page
