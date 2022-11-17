import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import type { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Fragment, useState } from 'react'
import useSWR from 'swr/immutable'
import Button from '~/components/Button'
import { LIFF_STATE } from '~/context/liff/enum'
import { useLiff } from '~/context/liff/LIFFProvider'
import LoadingWrapper from '~/layouts/LoadingWrapper'
import Wrapper from '~/layouts/Wrapper'
import Header from '~/routes/Activity/components/Header'
import type { ApiResponseSuccess } from '~/types/api'
import type { IRewardEligibilityPayload } from '~/types/api/activity'
import { APIInstance, fetcher } from '~/utils'

export const getServerSideProps: GetServerSideProps = async ({ locale = 'th' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'activity'])),
  },
})

const Page: NextPage = () => {
  const { liff, state } = useLiff()
  const { t } = useTranslation(['common', 'activity'])
  const { data, error } = useSWR<ApiResponseSuccess<IRewardEligibilityPayload>>(
    state === LIFF_STATE.READY
      ? {
          method: 'GET',
          url: '/rewards/isEligible',
          token: liff?.getIDToken?.() ? liff.getIDToken() : undefined,
        }
      : null,
    fetcher
  )

  const [isClaimed, setIsClaimed] = useState<boolean>(false)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  if (error) {
    return <div>fail</div>
  }

  if (!data) {
    return <LoadingWrapper />
  }

  return (
    <Wrapper className="relative px-5 py-10">
      <div className="mx-auto max-w-screen-md">
        <Header />
        <div className="my-8 space-y-5 text-center font-heading">
          <h1 className="mb-2 text-3xl font-bold">
            {t(
              !data.payload.isEligible
                ? 'CLAIM_REWARD.NOT_ELIGIBLE_TITLE'
                : data.payload.isClaimed
                ? 'CLAIM_REWARD.CLAIMED_TITLE'
                : 'CLAIM_REWARD.ELIGIBLE_TITLE',
              {
                ns: 'activity',
              }
            )}
          </h1>
          <h2 className="text-2xl">
            {t(
              !data.payload.isEligible
                ? 'CLAIM_REWARD.NOT_ELIGIBLE_SUBTITLE'
                : data.payload.isClaimed
                ? 'CLAIM_REWARD.CLAIMED_SUBTITLE'
                : 'CLAIM_REWARD.ELIGIBLE_SUBTITLE',
              { ns: 'activity' }
            )}
          </h2>
        </div>

        <img
          src={
            !data.payload.isEligible || data.payload.isClaimed
              ? '/static/images/nstar/nstar_atomic_done.svg'
              : '/static/images/nstar/nstar_atomic_prize.svg'
          }
          className="mx-auto h-40"
          alt="Prize"
        />

        <div className="mx-auto mt-10 flex w-full max-w-sm gap-x-5 text-center">
          {liff.isInClient?.() && (
            <Button
              type="button"
              label={t('BUTTON_LABEL.CLOSE', { ns: 'common' })}
              variant="primary"
              className="w-full"
              onClick={() => {
                liff.closeWindow()
              }}
            />
          )}
          {data.payload.isEligible && !data.payload.isClaimed && (
            <Button
              type="button"
              label={t(!isClaimed ? 'CLAIM_REWARD.CLAIM_BUTTON' : 'CLAIM_REWARD.CLAIMED_BUTTON', { ns: 'activity' })}
              variant={!isClaimed ? 'ictTurquoise' : 'primary'}
              disabled={isClaimed}
              className="w-full disabled:cursor-not-allowed"
              onClick={() => {
                if (isClaimed) {
                  return
                }

                setIsDialogOpen(true)
              }}
            />
          )}
        </div>
      </div>
      <Transition appear show={isDialogOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsDialogOpen((v) => !v)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="font-heading text-xl font-bold leading-6 text-ict-magenta-process">
                    {t('CLAIM_REWARD.CONFIRM_DIALOG_TITLE', { ns: 'activity' })}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="font-heading text-black">
                      {t('CLAIM_REWARD.CONFIRM_DIALOG_MESSAGE', {
                        ns: 'activity',
                      })}
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button
                      type="button"
                      label={t('CLAIM_REWARD.CONFIRM_DIALOG_CONFIRM_BUTTON', {
                        ns: 'activity',
                      })}
                      variant="ictTurquoise"
                      onClick={async () => {
                        try {
                          await APIInstance.get('/rewards/claim', {
                            headers: {
                              Authorization: `Bearer ${liff.getIDToken()}`,
                            },
                          })

                          setIsClaimed(true)
                          setIsDialogOpen((v) => !v)
                        } catch (error) {}
                      }}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Wrapper>
  )
}

export default Page
