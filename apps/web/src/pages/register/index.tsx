import type { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import useSWR from 'swr/immutable'
import Button from '~/components/Button'
import { IctMahidolOpenHouseWordmark } from '~/components/Icons'
import { LIFF_STATE } from '~/context/liff/enum'
import { useLiff } from '~/context/liff/LIFFProvider'
import { useStoreon } from '~/context/storeon'
import LoadingWrapper from '~/layouts/LoadingWrapper'
import Wrapper, { BG_VARIANT_TYPES } from '~/layouts/Wrapper'
import type { ApiResponseSuccess } from '~/types/api'
import { fetcher } from '~/utils'

export const getServerSideProps: GetServerSideProps = async ({ locale = 'th' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'register'])),
  },
})

const Page = () => {
  const { liff, state } = useLiff()
  const { push } = useRouter()
  const { dispatch } = useStoreon('form')
  const { data, error } = useSWR<ApiResponseSuccess<{ isRegistered: boolean }>>(
    [LIFF_STATE.READY, LIFF_STATE.READY_UNAUTHENTICATED].includes(state)
      ? {
          url: '/users/isRegistered',
          method: 'GET',
          token: liff.getIDToken() ? liff.getIDToken() : undefined,
        }
      : null,
    fetcher,
  )

  if (error)
    return <div>failed to load</div>

  if (!data)
    return <LoadingWrapper />

  if (data.payload.isRegistered)
    push('/register/registered')

  return (
    <Wrapper variant={BG_VARIANT_TYPES.LANDING}>
      <div className="mx-auto flex min-h-screen max-w-screen-sm flex-col items-center justify-center px-8">
        <IctMahidolOpenHouseWordmark className="mb-10 w-full" />

        <div className="mb-6 space-y-2 text-center font-heading text-xl">
          <div>Select Your Nationality</div>
          <div>เลือกสัญชาติสำหรับลงทะเบียน</div>
        </div>

        <div className="flex w-full flex-col gap-4 sm:flex-row sm:gap-6">
          <Button
            icon="op2022:flag-thailand"
            iconPosition="left"
            label="สัญชาติไทย"
            className="w-full sm:w-1/2"
            data-cy="nationality-th"
            onClick={() => {
              dispatch('form/register/setFields', { language: 'th' })
              dispatch('form/register/nextStep')
              push('/register/type', undefined, { locale: 'th' })
            }}
          />
          <Button
            icon="op2022:globe"
            iconPosition="left"
            label="International"
            className="w-full sm:w-1/2"
            data-cy="nationality-en"
            onClick={() => {
              dispatch('form/register/setFields', { language: 'en' })
              dispatch('form/register/nextStep')
              push('/register/type', undefined, { locale: 'en' })
            }}
          />
        </div>
      </div>
    </Wrapper>
  )
}

export default Page
