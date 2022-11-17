import type { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Button from '~/components/Button'
import { IctMahidolOpenHouseWordmark } from '~/components/Icons'
import { useLiff } from '~/context/liff/LIFFProvider'
import { useStoreon } from '~/context/storeon'
import Wrapper, { BG_VARIANT_TYPES } from '~/layouts/Wrapper'

export const getStaticProps: GetStaticProps = async ({ locale = 'th' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'register'])),
  },
})

const Page: NextPage = () => {
  const { liff, isReady } = useLiff()
  const { push } = useRouter()
  const { t } = useTranslation('register')
  const { t: tCommon } = useTranslation('common')
  const { dispatch } = useStoreon('form')

  useEffect(() => {
    if (isReady) {
      if (!liff.isInClient()) {
        setTimeout(() => {
          dispatch('form/register/reset')
          push('/register', undefined, { locale: 'th' })
        }, 2000)
      }
    }
  }, [liff])

  return (
    <Wrapper variant={BG_VARIANT_TYPES.STARDUST}>
      <div className="mx-auto flex min-h-screen max-w-screen-md flex-col items-center px-8 py-10 sm:justify-center">
        <IctMahidolOpenHouseWordmark className="mb-10 w-full" />

        <div className="mb-12 text-center">
          <h1 className="mb-5 font-heading text-4xl font-bold text-ict-turquoise">
            {t('REG_FORM.REG_SUCCESS_TITLE')}
          </h1>
          <h2 className="font-heading text-xl font-bold">
            {t('REG_FORM.REG_SUCCESS_SUBTITLE')}
          </h2>
        </div>

        <img
          src="/static/images/nstar/nstar_atomic_success.svg"
          className="w-full max-w-sm"
          alt="Success"
        />

        {liff.isInClient?.() && (
          <div className="mt-10 w-full text-center">
            <Button
              type="button"
              label={tCommon('BUTTON_LABEL.CLOSE')}
              variant="ictTurquoise"
              className="w-full sm:w-32"
              onClick={() => {
                liff.closeWindow()
              }}
            />
          </div>
        )}
      </div>
    </Wrapper>
  )
}

export default Page
