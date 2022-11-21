import { Icon } from '@iconify/react'
import clsx from 'clsx'
import type { ComponentProps, FC } from 'react'
import { ColorVariants } from './variants'

interface ButtonProps extends ComponentProps<'button'> {
  label: string
  icon?: string
  iconPosition?: 'left' | 'right'
  variant?: keyof typeof ColorVariants
}

const Button: FC<ButtonProps> = ({
  label,
  type = 'button',
  icon,
  iconPosition = 'left',
  variant = 'primary',
  className,
  ...props
}) => {
  return (
    <button
      type={type}
      {...props}
      className={clsx(
        'rounded-xl py-2 px-4 font-heading font-bold',
        ColorVariants[variant],
        className,
      )}
    >
      {icon && iconPosition === 'left' && (
        <Icon icon={icon} inline className="mr-2 inline" />
      )}
      {label}
      {icon && iconPosition === 'right' && (
        <Icon icon={icon} inline className="ml-2 inline" />
      )}
    </button>
  )
}

export default Button
