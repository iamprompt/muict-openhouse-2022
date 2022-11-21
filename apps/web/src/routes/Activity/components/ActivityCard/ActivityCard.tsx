import { Icon } from '@iconify/react'
import clsx from 'clsx'
import type { ComponentProps, FC } from 'react'

interface ActivityCardProps extends ComponentProps<'div'> {
  icon: string
  title: string
  success?: boolean
}

const ActivityCard: FC<ActivityCardProps> = ({
  icon,
  title,
  success,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'flex flex-col items-center rounded-xl bg-dst-prussian-blue px-3 pt-5 pb-2 text-center text-white',
        className,
      )}
      {...props}
    >
      <Icon
        icon={success ? 'op2022:check-circle' : icon}
        className={clsx(
          'mb-2 h-12 w-12 text-4xl',
          success && 'text-ict-turquoise',
        )}
      />
      <div className="flex h-12 items-center break-words font-heading font-bold">
        {title}
      </div>
    </div>
  )
}

export default ActivityCard
