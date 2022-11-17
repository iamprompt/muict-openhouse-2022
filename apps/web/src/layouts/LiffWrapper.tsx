import type { ComponentProps, FC, Provider } from 'react'
import LoadingWrapper from './LoadingWrapper'
import { LIFF_ID } from '~/const/liff'
import { LIFFProvider } from '~/context/liff/LIFFProvider'
import type { ILIFFContextType } from '~/context/liff/types'

type LIFFWrapperProps = Pick<ComponentProps<Provider<ILIFFContextType>>, 'children'>

const LIFFWrapper: FC<LIFFWrapperProps> = ({ ...props }) => {
  return <LIFFProvider liffId={LIFF_ID} onLoading={<LoadingWrapper />} {...props} />
}

export default LIFFWrapper
