import clsx from 'clsx'
import type { ComponentProps, FC } from 'react'

export enum BG_VARIANT_TYPES {
  BASE = 'base',
  STARDUST = 'stardust',
  LANDING = 'landing',
  SPACE = 'space',
}

const WrapperBgVariants: Record<BG_VARIANT_TYPES, string> = {
  base: 'bg-base-mobile sm:bg-base-desktop',
  stardust: 'bg-stardust-mobile sm:bg-stardust-desktop',
  landing: 'bg-landing-mobile sm:bg-landing-desktop',
  space: 'bg-space-desktop',
}

interface WrapperProps extends ComponentProps<'div'> {
  variant?: BG_VARIANT_TYPES
}

const Wrapper: FC<WrapperProps> = ({
  variant = BG_VARIANT_TYPES.BASE,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'min-h-screen w-full bg-cover bg-fixed bg-center bg-no-repeat',
        WrapperBgVariants[variant],
        className,
      )}
      {...props}
    />
  )
}

export default Wrapper
