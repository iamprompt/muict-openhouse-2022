import type { GetStaticProps, NextPage } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { Icon } from '@iconify/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dayjs from '~/utils/dayjs'
import Button from '~/components/Button'
import Wrapper from '~/layouts/Wrapper'
import Header from '~/routes/Activity/components/Header'
import { AGENDA } from '~/const/agenda/agenda'

export const getStaticProps: GetStaticProps = async ({ locale = 'th' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

const Page: NextPage = () => {
  const { locale = 'th' } = useRouter()
  const [selectedDate, setSelectedDate] = useState<string>('2022-10-29')

  return (
    <Wrapper className="px-5 pt-10 pb-14">
      <div className="mx-auto mb-6 max-w-screen-md">
        <Header />
      </div>

      <div className="mx-auto mb-10 flex max-w-sm items-center justify-center gap-5 font-heading">
        <div className="text-xl font-bold">Date:</div>
        <div className="flex grow gap-2">
          {['2022-10-28', '2022-10-29'].map(date => (
            <Button
              label={dayjs.tz(date).format('DD MMM')}
              key={date}
              variant={selectedDate === date ? 'ictTurquoise' : 'primary'}
              className="w-full"
              onClick={() => setSelectedDate(date)}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-screen-sm space-y-5">
        {AGENDA[selectedDate].map((agenda, i) => (
          <div
            key={`${selectedDate}-${i}`}
            className={clsx('rounded-xl p-5', i % 2 === 0 ? 'bg-[#003366]/60' : 'bg-[#567A9E]/60')}
          >
            <div className="mb-1 flex items-center">
              <div className="text-ictTurquoise font-heading text-sm">
                {dayjs.tz(agenda.startAt).format('HH:mm')} - {dayjs.tz(agenda.endAt).format('HH:mm')}
              </div>
              {agenda.isLive
                ? (
                <div className="text-ictTurquoise ml-2 flex items-center rounded-full bg-white/30 px-3 font-heading text-sm font-bold">
                  <div className="mr-2 h-2 w-2 rounded-full bg-red-600" /> LIVE
                </div>
                  )
                : null}
            </div>
            <div className="font-heading text-lg font-bold">{agenda.title[locale]}</div>
            {agenda.speakers?.length
              ? (
              <div className="mt-2">
                <div className="text-sm">{agenda.speakers?.[0].name[locale]}</div>
                <div className="text-xs">{agenda.speakers?.[0].position[locale]}</div>
              </div>
                )
              : null}
            <div className="mt-2">
              <Icon icon="op2022:location" inline className="inline" />{' '}
              <span className="font-heading text-sm">{agenda.location[locale]}</span>
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  )
}

export default Page
