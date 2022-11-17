import type { Liff } from '@line/liff'
import type { ReactNode } from 'react'
import type { LIFF_STATE } from './enum'

export type ILIFFConfig = Parameters<Liff['init']>['0']
export type ILIFFConfigPlugins = Array<{
  enabled: boolean
  plugin: Parameters<Liff['use']>['0']
}>

export type ILIFFProviderProps = {
  children?: ReactNode
  onError?: ReactNode
  onLoading?: ReactNode
} & ILIFFConfig

export interface ILIFFContextType {
  liff: Liff
  profile: ILIFFProfile | null
  state: LIFF_STATE
  isReady: boolean
}

export type ILIFFProfile = Awaited<ReturnType<Liff['getProfile']>>
