import { Player } from '@lottiefiles/react-lottie-player'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import type { ComponentProps, FC } from 'react'
import Wrapper from './Wrapper'

const LoadingWrapper: FC<ComponentProps<typeof Wrapper>> = ({
  className,
  ...props
}) => {
  const { t } = useTranslation('common')
  return (
    <Wrapper
      className={clsx('flex flex-col items-center justify-center', className)}
      {...props}
    >
      <Player
        autoplay
        loop
        src="/static/animations/nstar_loading.json"
        style={{ height: '300px', width: '300px' }}
      />
      <div className="space-y-2 text-center font-heading">
        <div className="text-2xl font-bold">{t('LOADING_STATE_TITLE')}</div>
        <div className="text-lg">{t('LOADING_STATE_SUBTITLE')}</div>
      </div>
    </Wrapper>
  )
}

export default LoadingWrapper
