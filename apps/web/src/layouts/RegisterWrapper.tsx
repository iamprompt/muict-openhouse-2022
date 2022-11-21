import type { ComponentProps, FC } from 'react'
import useSWR from 'swr'
import LoadingWrapper from './LoadingWrapper'
import { LIFF_STATE } from '~/context/liff/enum'
import { useLiff } from '~/context/liff/LIFFProvider'
import type { ApiResponseSuccess } from '~/types/api'
import { fetcher } from '~/utils'

const RegisterWrapper: FC<ComponentProps<'div'>> = () => {
  const { liff, state } = useLiff()
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
    return <div>error</div>

  if (!data)
    return <LoadingWrapper />

  return <div></div>
}

export default RegisterWrapper
