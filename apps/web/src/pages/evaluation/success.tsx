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
    ...(await serverSideTranslations(locale, ['common', 'evaluation'])),
  },
})

const Page: NextPage = () => {
  const { liff, isReady } = useLiff()
  const { push } = useRouter()
  const { t } = useTranslation('evaluation')
  const { dispatch } = useStoreon('form')

  useEffect(() => {
    let t: NodeJS.Timeout
    if (isReady) {
      if (!liff.isInClient()) {
        t = setTimeout(() => {
          dispatch('form/evaluation/reset')
          push('/evaluation', undefined, { locale: 'th' })
        }, 2000)
      }
    }
    return () => clearTimeout(t)
  }, [liff])

  return (
    <Wrapper variant={BG_VARIANT_TYPES.STARDUST}>
      <div className="mx-auto flex min-h-screen max-w-screen-md flex-col items-center px-8 py-10 sm:justify-center">
        <IctMahidolOpenHouseWordmark className="mb-10 w-full" />

        <div className="mb-12 text-center">
          <h1 className="mb-5 font-heading text-4xl font-bold text-ict-turquoise">
            {t('EVALUATION_SUCCESS.TITLE')}
          </h1>
          <h2 className="font-heading text-xl font-bold">
            {t('EVALUATION_SUCCESS.MESSAGE')}
          </h2>
        </div>

        <img
          src="/static/images/nstar/nstar_normal.svg"
          className="h-48 w-full"
          alt="Success"
        />

        {liff.isInClient?.() && (
          <div className="mt-10 w-full text-center">
            <Button
              type="button"
              label={t('BUTTON_LABEL.CLOSE')}
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
