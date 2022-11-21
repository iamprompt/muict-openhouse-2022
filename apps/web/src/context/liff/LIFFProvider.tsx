import type { NextPage } from 'next'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import type { Liff } from '@line/liff'
import type { ILIFFConfig, ILIFFContextType, ILIFFProviderProps } from './types'
import { LIFF_STATE } from './enum'

const LIFFContextDefault: ILIFFContextType = {
  liff: {} as Liff,
  profile: null,
  state: LIFF_STATE.INIT,
  isReady: false,
}

const LIFFContext = createContext<ILIFFContextType>(LIFFContextDefault)
const useLIFFProvider = (config: ILIFFConfig): ILIFFContextType => {
  const liff = useRef<ILIFFContextType['liff'] | null>(null)
  const [profile, setProfile] = useState<ILIFFContextType['profile']>(null)
  const [liffState, setLiffState] = useState<ILIFFContextType['state']>(LIFF_STATE.INIT)

  const authCallback = async () => {
    if (!liff.current)
      return

    if (liff.current.isLoggedIn()) {
      const profile = await liff.current.getProfile()
      setProfile(profile)
      setLiffState(LIFF_STATE.READY)
    }
    else {
      setLiffState(LIFF_STATE.READY_UNAUTHENTICATED)
    }
  }

  const initLiff = async () => {
    try {
      setLiffState(LIFF_STATE.PREPARE)
      // Import LIFF SDK
      const liffModule = await import('@line/liff')

      // If the app is in testing environment, use stub SDK
      if (window.Cypress) {
        liff.current = window.Cypress.liffMock
        window.liff = window.Cypress.liffMock
      }
      else {
        liff.current = liffModule.default
        window.liff = liffModule.default // Expose to window
      }

      // console.log('LIFF SDK loaded')

      setLiffState(LIFF_STATE.LOADING)

      // Init LIFF
      await liff.current.init(config)
      // console.log('LIFF init success')

      // Check if user is authenticated
      await authCallback()
    }
    catch (error) {
      // LIFF init failed
      console.error(error)
      setLiffState(LIFF_STATE.ERROR)
    }
  }

  useEffect(() => {
    initLiff()
  }, [])

  return {
    liff: liff.current || ({} as Liff),
    profile,
    state: liffState,
    isReady: liffState === LIFF_STATE.READY || liffState === LIFF_STATE.READY_UNAUTHENTICATED,
  }
}

export const useLiff = () => useContext(LIFFContext)
export const LIFFProvider: NextPage<ILIFFProviderProps> = ({ children, onError, onLoading, ...cfParams }) => {
  const config: ILIFFConfig = {
    ...cfParams,
  }

  const providerValue = useLIFFProvider(config)

  if (onLoading && [LIFF_STATE.INIT, LIFF_STATE.LOADING, LIFF_STATE.PREPARE].includes(providerValue.state))
    return <>{onLoading || null}</>

  if (onError && [LIFF_STATE.ERROR].includes(providerValue.state))
    return <>{onError || null}</>

  return <LIFFContext.Provider value={providerValue}>{children}</LIFFContext.Provider>
}
