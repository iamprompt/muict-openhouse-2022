import clsx from 'clsx'
import { forwardRef } from 'react'
import type { ComponentProps } from 'react'

interface BaseTextAreaProps extends Omit<ComponentProps<'textarea'>, 'ref'> {}

const BaseTextArea = forwardRef<HTMLTextAreaElement, BaseTextAreaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={clsx(
          'appearance-none rounded-xl border border-gray-200 py-2 px-3 text-black outline-none placeholder:text-gray-300',
          className,
        )}
        {...props}
      />
    )
  },
)

BaseTextArea.displayName = 'BaseTextArea'

export default BaseTextArea
