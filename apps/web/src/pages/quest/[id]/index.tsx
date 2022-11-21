import type { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import useSWR from 'swr/immutable'
import Button from '~/components/Button'
import type { IQuestion } from '~/const/activity/questions'
import { useLiff } from '~/context/liff/LIFFProvider'
import LoadingWrapper from '~/layouts/LoadingWrapper'
import Wrapper from '~/layouts/Wrapper'
import { renderAnswerFromQuestion } from '~/modules/activity'
import Header from '~/routes/Activity/components/Header'
import type { ApiResponseError, ApiResponseSuccess } from '~/types/api'
import type { IQuestPayload } from '~/types/api/activity'
import { QUEST_STATUS } from '~/types/api/activity'
import { APIInstance, fetcher } from '~/utils'
import { strSubstitute } from '~/utils/string'

export const getServerSideProps: GetServerSideProps = async ({ locale = 'th' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'activity'])),
  },
})

const Page: NextPage = () => {
  const { register, watch, handleSubmit, setValue } = useForm()
  const { query, push, locale } = useRouter()
  const { liff, isReady } = useLiff()
  const { t } = useTranslation(['common', 'activity'])

  const { data, error } = useSWR<ApiResponseSuccess<IQuestPayload>, ApiResponseError>(
    query.id && locale && isReady
      ? {
          method: 'GET',
          url: `/quests/question?questNo=${query.id}&lang=${locale}`,
          token: liff?.getIDToken?.() ? liff.getIDToken() : undefined,
        }
      : null,
    fetcher,
  )

  const { data: questData } = useSWR<ApiResponseSuccess<IQuestion>, ApiResponseError>(
    query.id && locale
      ? {
          method: 'GET',
          url: `/quests/quest?questNo=${query.id}&lang=${locale}`,
        }
      : null,
    fetcher,
  )

  useEffect(() => {
    if (data?.payload.question) {
      setValue('questNo', data.payload.question.questNo)
      setValue('questionId', data.payload.question.id)
    }
  }, [data?.payload])

  if (error)
    return <div>failed to load</div>

  if (!data || !questData || !isReady)
    return <LoadingWrapper />

  if (data.payload.status === QUEST_STATUS.SUCCESS_QUEST)
    push(`/quest/${query.id}/done`)

  return (
    <Wrapper className="px-5 py-10">
      <div className="mx-auto max-w-screen-md">
        <Header />
        <div className="my-8 text-center font-heading">
          <h2 className="mb-2 text-xl font-normal">
            {strSubstitute(t('QUEST_NUMBER_TITLE', { ns: 'activity' }), questData.payload.questNo)}
          </h2>
          <h1 className="text-3xl font-bold">{questData.payload.questTitle}</h1>
        </div>

        {data.payload.question && (
          <form
            onSubmit={handleSubmit(async (d) => {
              const {
                data: { payload },
              } = await APIInstance.post('/quests/submit', d, {
                headers: {
                  Authorization: liff.getIDToken() ? `Bearer ${liff.getIDToken()}` : undefined,
                },
              })

              if (payload.result) {
                push({
                  pathname: '/quest/[id]/correct',
                  query: {
                    ...query,
                  },
                })
              }
              else {
                push({
                  pathname: '/quest/[id]/incorrect',
                  query: {
                    ...query,
                  },
                })
              }
            })}
          >
            <input type="hidden" {...register('questNo')} />
            <input type="hidden" {...register('questionId')} />
            <div className="my-10">
              <div className="mb-1 font-heading font-bold">
                {t('QUEST_QUESTION.QUESTION_SECTION_TITLE', { ns: 'activity' })}
              </div>
              <p>{data.payload.question.question}</p>
            </div>

            <div className="my-10">
              <div className="mb-1 font-heading font-bold">
                {t('QUEST_QUESTION.ANSWER_SECTION_TITLE', { ns: 'activity' })}
              </div>
              {renderAnswerFromQuestion(data.payload.question, register, watch)}
            </div>

            <div className="my-10 flex justify-between gap-5">
              {liff.isInClient?.() && (
                <Button
                  label={t('BUTTON_LABEL.CLOSE', { ns: 'common' })}
                  variant="primary"
                  className="w-full max-w-[264px]"
                  onClick={() => {
                    liff.closeWindow()
                  }}
                />
              )}
              <Button
                type="submit"
                label={t('QUEST_QUESTION.SUBMIT_ANSWER_BUTTON', {
                  ns: 'activity',
                })}
                variant="ictTurquoise"
                className="mx-auto w-full max-w-[264px]"
              />
            </div>
          </form>
        )}
      </div>
    </Wrapper>
  )
}

export default Page
