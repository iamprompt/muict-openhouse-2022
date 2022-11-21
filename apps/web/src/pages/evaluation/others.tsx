import type { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '~/components/Button'
import { EvaluationHeaderWordmark } from '~/components/Icons'
import { Evaluation_EN } from '~/const/evaluation/evaluationForm'
import { useLiff } from '~/context/liff/LIFFProvider'
import { useStoreon } from '~/context/storeon'
import Wrapper from '~/layouts/Wrapper'
import { FormBuilder } from '~/modules/form/formBuilder'
import { APIInstance } from '~/utils'

export const getStaticProps: GetStaticProps = async ({ locale = 'th' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'evaluation'])),
  },
})

// const schema = satisfactionSchema.keys({
//   'interested-programs': Joi.array().items(Joi.string().optional()).optional(),
//   factors: Joi.array().items(Joi.string().optional()).optional(),
//   impressed: Joi.string().optional(),
//   unimpressed: Joi.string().optional(),
//   'other-suggestions': Joi.string().optional(),
// })

const Page: NextPage = () => {
  const { liff } = useLiff()
  const { t } = useTranslation('evaluation')
  const { push } = useRouter()
  const { form, dispatch } = useStoreon('form')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: joiResolver(schema),
    defaultValues: form.evaluation,
  })

  return (
    <Wrapper>
      <div className="mx-auto flex min-h-screen max-w-screen-md flex-col px-8 py-10 sm:justify-center">
        <form
          onSubmit={handleSubmit(
            async (data) => {
              dispatch('form/evaluation/setFields', data)

              const liffIdToken = liff.getIDToken() || undefined

              setIsSubmitting(true)

              await APIInstance.post(
                '/evaluations',
                {
                  ...form.evaluation.fields,
                  ...data,
                },
                {
                  headers: {
                    authorization: liffIdToken ? `Bearer ${liffIdToken}` : undefined,
                  },
                },
              )

              push('/evaluation/success')
            },
            (error) => {
              console.log(error)
            },
          )}
        >
          <div className="rounded-xl sm:bg-white sm:p-16 sm:text-black">
            <EvaluationHeaderWordmark className="mb-6 text-white sm:text-black" />
            <FormBuilder form={Evaluation_EN[2]} register={register} errors={errors} watch={watch} i18n={t} />
          </div>
          <div className="mt-10 flex justify-between">
            <Button
              label={t('BUTTON_LABEL.BACK')}
              variant="primary"
              className="w-32"
              onClick={() => push('/evaluation/satisfaction')}
            />
            <Button
              type="submit"
              label={t('BUTTON_LABEL.SUBMIT')}
              variant="ictTurquoise"
              disabled={isSubmitting}
              className="w-32"
            />
          </div>
        </form>
      </div>
    </Wrapper>
  )
}

export default Page
