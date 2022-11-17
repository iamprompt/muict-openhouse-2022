import type { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Button from '~/components/Button'
import type { IQuestion } from '~/const/activity/questions'
import { useLiff } from '~/context/liff/LIFFProvider'
import LoadingWrapper from '~/layouts/LoadingWrapper'
import Wrapper from '~/layouts/Wrapper'
import Header from '~/routes/Activity/components/Header'
import type { ApiResponseError, ApiResponseSuccess } from '~/types/api'
import { fetcher } from '~/utils'
import { strSubstitute } from '~/utils/string'

export const getServerSideProps: GetServerSideProps = async ({ locale = 'th' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'activity'])),
  },
})

const Page: NextPage = () => {
  const { query, push, locale } = useRouter()
  const { liff, isReady } = useLiff()
  const { t } = useTranslation(['common', 'activity'])
  const { data, error } = useSWR<ApiResponseSuccess<IQuestion>, ApiResponseError>(
    query.id && locale
      ? {
          method: 'GET',
          url: `/quests/quest?questNo=${query.id}&lang=${locale}`,
        }
      : null,
    fetcher
  )

  if (error) {
    return <div>failed to load</div>
  }

  if (!data || !isReady) {
    return <LoadingWrapper />
  }

  return (
    <Wrapper className="px-5 py-10">
      <div className="mx-auto max-w-screen-md">
        <Header />
        <div className="my-8 text-center font-heading">
          <h2 className="mb-2 text-xl font-normal">
            {strSubstitute(t('QUEST_NUMBER_TITLE', { ns: 'activity' }), data.payload.questNo)}
          </h2>
          <h1 className="text-3xl font-bold">{data.payload.questTitle}</h1>
        </div>

        <img src="/static/images/nstar/nstar_wrong.svg" className="mx-auto h-40 max-w-sm" alt="Wrong Answer" />

        <div className="mt-10 w-full space-y-5 text-center">
          <div className="font-heading text-3xl font-bold text-ict-magenta-process">
            {t('QUEST_RESULT.INCORRECT_TITLE', { ns: 'activity' })}
          </div>
          <div className="font-heading text-2xl">{t('QUEST_RESULT.INCORRECT_SUBTITLE', { ns: 'activity' })}</div>
        </div>

        <div className="my-10 flex justify-between gap-5">
          {liff.isInClient?.() && (
            <Button
              label={t('BUTTON_LABEL.CLOSE', { ns: 'common' })}
              variant="primary"
              className="mx-auto w-full max-w-[264px]"
              onClick={() => {
                liff.closeWindow()
              }}
            />
          )}
          <Button
            type="button"
            label={t('QUEST_RESULT.TRY_AGAIN_BUTTON', { ns: 'activity' })}
            variant="ictTurquoise"
            className="mx-auto w-full max-w-[264px]"
            onClick={() => {
              push({
                pathname: '/quest/[id]',
                query: {
                  ...query,
                },
              })
            }}
          />
        </div>
      </div>
    </Wrapper>
  )
}

export default Page
