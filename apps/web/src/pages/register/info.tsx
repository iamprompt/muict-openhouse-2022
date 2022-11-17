import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import type { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Button from '~/components/Button'
import TextInput from '~/components/Input/TextInput'
import { useStoreon } from '~/context/storeon'
import Wrapper from '~/layouts/Wrapper'
import FormHeader from '~/routes/Register/components/FormHeader'
import { strSubstitute } from '~/utils/string'

const schema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  phone: Joi.string()
    .regex(/^(\+66|0)([689]{1})(\d{1,8})$/)
    .required(),
})

export const getStaticProps: GetStaticProps = async ({ locale = 'th' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'register'])),
  },
})

const Page: NextPage = () => {
  const { t } = useTranslation('register')
  const { t: tCommon } = useTranslation('common')
  const { push } = useRouter()
  const { form, dispatch } = useStoreon('form')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      firstName: form.register.fields?.firstName || '',
      lastName: form.register.fields?.lastName || '',
      email: form.register.fields?.email || '',
      phone: form.register.fields?.phone || '',
    },
  })

  return (
    <Wrapper>
      <div className="mx-auto flex min-h-screen max-w-screen-md flex-col px-8 py-10 sm:justify-center">
        <form
          onSubmit={handleSubmit(
            (data) => {
              dispatch('form/register/setFields', {
                firstName: data.firstName,
                lastName: data.lastName,
                // dob: data.dob,
                email: data.email,
                phone: data.phone,
              })
              dispatch('form/register/nextStep')
              push('/register/additional')
            },
            (error) => {
              console.log('error', error)
            }
          )}
        >
          <div className="rounded-xl sm:bg-white sm:p-16 sm:text-black">
            <div className="mb-10 w-full">
              <FormHeader
                title={t('REG_FORM.REG_FORM_TITLE')}
                section={strSubstitute(
                  t('REG_FORM.REG_SECTION_TEMPLATE'),
                  '1',
                  t('REG_FORM.REG_SECTION_BASIC_INFO')
                )}
              />
            </div>

            <div className="w-full space-y-5">
              <TextInput
                id="firstName"
                label={t('REG_FORM.REG_FIELD_FIRSTNAME')}
                placeholder={t('REG_FORM.REG_FIELD_FIRSTNAME_PLACEHOLDER')}
                required
                className="w-full"
                error={errors.firstName?.message}
                {...register('firstName', { required: true })}
              />
              <TextInput
                id="lastName"
                label={t('REG_FORM.REG_FIELD_LASTNAME')}
                placeholder={t('REG_FORM.REG_FIELD_LASTNAME_PLACEHOLDER')}
                error={errors.lastName?.message}
                required
                className="w-full"
                {...register('lastName', { required: true })}
              />
              {/* <DateInput
                id="dob"
                label={t('REG_FORM.REG_FIELD_DOB')}
                required
                className="w-full"
                {...register('dob', {
                  required: true,
                  valueAsDate: true,
                })}
              /> */}
              <TextInput
                id="email"
                label={t('REG_FORM.REG_FIELD_EMAIL')}
                placeholder={t('REG_FORM.REG_FIELD_EMAIL_PLACEHOLDER')}
                error={errors.email?.message}
                required
                className="w-full"
                {...register('email', { required: true })}
              />
              <TextInput
                id="phone"
                label={t('REG_FORM.REG_FIELD_PHONE')}
                placeholder={t('REG_FORM.REG_FIELD_PHONE_PLACEHOLDER')}
                error={errors.phone?.message}
                required
                className="w-full"
                {...register('phone', { required: true })}
              />
            </div>
          </div>
          <div className="mt-10 flex justify-between gap-5">
            <Button
              label={tCommon('BUTTON_LABEL.BACK')}
              variant="primary"
              className="w-full sm:w-32"
              onClick={() => {
                dispatch('form/register/prevStep')
                push('/register/policy')
              }}
            />
            <Button
              type="submit"
              label={t('REG_FORM.REG_BUTTON_NEXT')}
              variant="ictTurquoise"
              className="w-full sm:w-32"
            />
          </div>
        </form>
      </div>
    </Wrapper>
  )
}

export default Page
