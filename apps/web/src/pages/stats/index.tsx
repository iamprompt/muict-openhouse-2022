import useSWR from 'swr'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import dayjs from '~/utils/dayjs'
import { IctMahidolOpenHouseWordmark } from '~/components/Icons'
import LoadingWrapper from '~/layouts/LoadingWrapper'
import Wrapper, { BG_VARIANT_TYPES } from '~/layouts/Wrapper'
import type { ApiResponseSuccess } from '~/types/api'
import { fetcher } from '~/utils'

export const getStaticProps: GetStaticProps = async ({ locale = 'th' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'register'])),
  },
})

const Page = () => {
  const { isReady } = useRouter()
  const { data } = useSWR<
    ApiResponseSuccess<{
      total: number
      dates: Record<string, number>
      timestamp: string
    }>
  >(
    isReady
      ? {
          url: `stats/total`,
          method: 'GET',
        }
      : null,
    fetcher,
    {
      refreshInterval: 5000,
    }
  )

  if (!data) {
    return <LoadingWrapper />
  }

  return (
    <Wrapper variant={BG_VARIANT_TYPES.SPACE} className="flex flex-col items-center justify-center p-10">
      <IctMahidolOpenHouseWordmark className="mx-auto h-36" />

      <div>
        <div className="mt-10 flex justify-center gap-8">
          {data?.payload.total
            .toString()
            .split('')
            .map((number, index) => (
              <div
                key={index}
                className="inline-block w-44 rounded-xl bg-white px-5 text-center font-heading font-bold text-ict-magenta-process"
              >
                <div className="text-center text-[200px] font-bold leading-tight">{number}</div>
              </div>
            ))}
        </div>

        <div className="mt-5 flex gap-5">
          {Object.entries(data?.payload.dates).map(([date, count]) => (
            <div key={date} className="w-full rounded-xl bg-white px-5 py-3 text-center font-heading text-black">
              <div>{dayjs(date).format('DD MMMM YYYY')}</div>
              <div className="text-center text-4xl font-bold text-ict-magenta-process">{count}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mt-10 text-center font-heading text-2xl font-bold">
          ข้อมูล ณ วันที่ {dayjs(data?.payload.timestamp).format('DD MMMM YYYY HH:mm:ss น.')}
        </div>
      </div>
    </Wrapper>
  )
}

export default Page
