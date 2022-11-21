import clsx from 'clsx'
import { forwardRef } from 'react'
import type { ComponentProps } from 'react'

interface BaseInputProps extends Omit<ComponentProps<'input'>, 'ref'> {}

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
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

BaseInput.displayName = 'BaseInput'

export default BaseInput
