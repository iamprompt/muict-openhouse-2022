import { useRouter } from 'next/router'
import type { ComponentProps, FC } from 'react'
import useSWR from 'swr'
import LoadingWrapper from './LoadingWrapper'
import { useLiff } from '~/context/liff/LIFFProvider'
import type { ApiResponseSuccess } from '~/types/api'
import { fetcher } from '~/utils'
import type { IMeProfilePayload } from '~/types/api/me'

const LocaleWrapper: FC<ComponentProps<'div'>> = ({ children }) => {
  const { locale, query, pathname, push, asPath } = useRouter()
  const { liff, isReady } = useLiff()
  const { data, error } = useSWR<ApiResponseSuccess<IMeProfilePayload>>(
    isReady
      ? {
          url: '/users/me',
          method: 'GET',
          token: liff.getIDToken() ? liff.getIDToken() : undefined,
        }
      : null,
    fetcher,
  )

  if (!liff.isLoggedIn())
    return <>{children}</>

  if (error)
    return <div>error</div>

  if (!isReady || !data)
    return <LoadingWrapper />

  if (data.payload.language !== locale)
    push({ pathname, query }, asPath, { locale: data.payload.language })

  return <>{children}</>
}

export default LocaleWrapper
