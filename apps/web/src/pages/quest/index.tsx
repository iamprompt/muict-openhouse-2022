import type { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import useSWR from 'swr/immutable'
import Button from '~/components/Button'
import type { IQuestList } from '~/const/activity/quests'
import { questLists } from '~/const/activity/quests'
import { useLiff } from '~/context/liff/LIFFProvider'
import LoadingWrapper from '~/layouts/LoadingWrapper'
import Wrapper from '~/layouts/Wrapper'
import Header from '~/routes/Activity/components/Header'
import ActivityCardGrid from '~/routes/Activity/containers/ActivityCardGrid'
import type { ApiResponseSuccess } from '~/types/api'
import { QUEST_STATUS } from '~/types/api/activity'
import type { IMeProfilePayload } from '~/types/api/me'
import { fetcher } from '~/utils'

export const getServerSideProps: GetServerSideProps = async ({ locale = 'th' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'activity'])),
  },
})

const Page: NextPage = () => {
  const { push } = useRouter()
  const { t } = useTranslation(['common', 'activity'])
  const { liff, isReady } = useLiff()
  const { data, error } = useSWR<ApiResponseSuccess<IMeProfilePayload>>(
    isReady
      ? {
          method: 'GET',
          url: '/users/me',
          token: liff?.getIDToken?.() ? liff.getIDToken() : undefined,
        }
      : null,
    fetcher
  )

  const questProgress = useMemo<Record<string, IQuestList>>(() => {
    return questLists.reduce((acc, { questNo, icon, title }) => {
      if (!data) {
        return acc
      }

      return {
        ...acc,
        [questNo]: {
          icon,
          title,
          success: data.payload.quests.find((q) => q.questNo === questNo)?.status === QUEST_STATUS.SUCCESS_QUEST,
        },
      }
    }, {})
  }, [data?.payload?.quests])

  if (error) {
    return <div>error</div>
  }

  if (!data) {
    return <LoadingWrapper />
  }

  return (
    <Wrapper className="px-5 py-10">
      <div className="mx-auto max-w-screen-md">
        <Header />
        <div className="my-8 text-center font-heading">
          <h1 className="mb-2 text-3xl font-bold">{t('ACTIVITY_SUMMARY.TITLE', { ns: 'activity' })}</h1>
          <h2 className="text-xl font-bold">{data.payload.name}</h2>
        </div>
        <ActivityCardGrid activities={Object.values(questProgress)} />

        {data.payload.isRewardEligible && (
          <div className="my-10">
            <Button
              label={t(
                data.payload.isRewardClaimed
                  ? 'ACTIVITY_SUMMARY.REWARD_CLAIMED_BUTTON'
                  : 'ACTIVITY_SUMMARY.REWARD_BUTTON',
                { ns: 'activity' }
              )}
              variant={data.payload.isRewardClaimed ? 'primary' : 'ictTurquoise'}
              className="w-full disabled:cursor-not-allowed"
              disabled={data.payload.isRewardClaimed}
              onClick={() => {
                push('/quest/claim')
              }}
            />
          </div>
        )}
      </div>
    </Wrapper>
  )
}

export default Page
