import Joi from 'joi'
import type { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Button from '~/components/Button'
import SelectInput from '~/components/Input/SelectInput'
import TextInput from '~/components/Input/TextInput'
import EduLevels from '~/const/register/eduLevel'
import Provinces from '~/const/register/province'
import { useLiff } from '~/context/liff/LIFFProvider'
import { useStoreon } from '~/context/storeon'
import Wrapper from '~/layouts/Wrapper'
import FormHeader from '~/routes/Register/components/FormHeader'
import { strSubstitute } from '~/utils/string'
import { APIInstance } from '~/utils'

const schema = Joi.object({
  regType: Joi.string().required(),
  province: Joi.string().required(),
  school: Joi.alternatives().conditional('regType', [
    {
      is: 'student',
      then: Joi.string().required(),
    },
    {
      is: 'uni_student',
      then: Joi.string().required(),
    },
    {
      is: 'teacher',
      then: Joi.string().required(),
    },
  ]),
  educationLevel: Joi.alternatives().conditional('regType', [
    {
      is: 'student',
      then: Joi.number().required(),
    },
    {
      is: 'uni_student',
      then: Joi.number().required(),
    },
    {
      is: 'teacher',
      then: Joi.number().required(),
    },
  ]),
})

export const getStaticProps: GetStaticProps = async ({ locale = 'th' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'register'])),
  },
})

const Page: NextPage = () => {
  const { liff } = useLiff()
  const { t } = useTranslation('register')
  const { t: tCommon } = useTranslation('common')
  const { push, locale = 'th' } = useRouter()
  const { form, dispatch } = useStoreon('form')

  const [isSubmitting, setSubmitting] = useState(false)

  const isEduRequired = useMemo(() => {
    return ['student', 'uni_student', 'teacher'].includes(form.register.fields?.regType || '')
  }, [form.register.fields?.regType])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      regType: form.register.fields?.regType,
      province: form.register.fields?.province || undefined,
      school: isEduRequired ? form.register.fields?.school || '' : undefined,
      educationLevel: isEduRequired ? form.register.fields?.educationLevel || undefined : undefined,
    },
  })

  const provincesList = useMemo(() => {
    const provinceSorted
      = locale === 'th'
        ? Provinces
        : Provinces.sort((a, b) => {
          if (a.province_id === 1)
            return -1

          return a.name.en.localeCompare(b.name.en)
        })

    return provinceSorted.map(p => ({
      value: `${p.province_id}`,
      label: p.name[locale as 'th' | 'en'],
    }))
  }, [])

  const educationList = useMemo(() => {
    return EduLevels.map(e => ({
      value: `${e.id}`,
      label: e.label[locale as 'th' | 'en'],
    }))
  }, [])

  return (
    <Wrapper>
      <div className="mx-auto flex min-h-screen max-w-screen-md flex-col px-8 py-10 sm:justify-center">
        <form
          data-test="additional-info-form"
          onSubmit={handleSubmit(
            async (data) => {
              dispatch('form/register/setFields', {
                province: data.province,
                school: data.school,
                educationLevel: data.educationLevel,
              })

              const liffIdToken = liff.getIDToken() || undefined

              setSubmitting(true)

              await APIInstance.post(
                '/users/register',
                {
                  ...form.register.fields,
                  ...data,
                },
                {
                  headers: {
                    authorization: liffIdToken ? `Bearer ${liffIdToken}` : undefined,
                  },
                },
              )

              dispatch('form/register/nextStep')
              push('/register/success')
            },
            (error) => {
              console.log(error)
            },
          )}
        >
          <div className="rounded-xl sm:bg-white sm:p-16 sm:text-black">
            <div className="mb-10 w-full">
              <FormHeader
                title={t('REG_FORM.REG_FORM_TITLE')}
                section={strSubstitute(t('REG_FORM.REG_SECTION_TEMPLATE'), '2', t('REG_FORM.REG_SECTION_ADDITIONAL'))}
              />
            </div>

            <div className="w-full space-y-5">
              <SelectInput
                id="province"
                data-test="province-select"
                label={t('REG_FORM.REG_FIELD_PROVINCE')}
                required
                className="w-full capitalize"
                options={provincesList}
                {...register('province', { required: true })}
              />
              {isEduRequired && (
                <TextInput
                  id="school"
                  data-test="school-input"
                  label={t('REG_FORM.REG_FIELD_SCHOOL')}
                  placeholder={t('REG_FORM.REG_FIELD_SCHOOL_PLACEHOLDER')}
                  error={errors.school?.message}
                  required
                  className="w-full"
                  {...register('school', { required: true })}
                />
              )}
              {isEduRequired && (
                <SelectInput
                  id="level"
                  data-test="level-select"
                  label={t('REG_FORM.REG_FIELD_SCHOOL_LEVEL')}
                  required
                  className="w-full"
                  options={educationList}
                  {...register('educationLevel', { required: true })}
                />
              )}
            </div>
          </div>
          <div className="mt-10 flex justify-between gap-5">
            <Button
              label={tCommon('BUTTON_LABEL.BACK')}
              variant="primary"
              className="w-full sm:w-32"
              onClick={() => {
                dispatch('form/register/prevStep')
                push('/register/info')
              }}
            />
            <Button
              type="submit"
              label={t('REG_FORM.REG_BUTTON_SUBMIT')}
              variant="ictTurquoise"
              className="w-full sm:w-32"
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </Wrapper>
  )
}

export default Page
