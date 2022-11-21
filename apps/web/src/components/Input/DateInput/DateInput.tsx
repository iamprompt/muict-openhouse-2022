import clsx from 'clsx'
import type { ComponentProps } from 'react'
import { forwardRef } from 'react'
import BaseInput from '../BaseInput'
import InputLabel from '../InputLabel'

interface DateInputProps extends Omit<ComponentProps<'input'>, 'type' | 'ref'> {
  label?: string
}

const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ name, label, required, className, ...props }, ref) => {
    return (
      <div>
        {label && (
          <InputLabel
            htmlFor={name}
            label={label}
            className="mb-1 block"
            data-test={`input-label-${name}`}
            required={required}
          />
        )}
        <BaseInput
          type="date"
          id={name}
          name={name}
          ref={ref}
          required={required}
          data-test={`input-${name}`}
          className={clsx('block', className)}
          {...props}
        />
      </div>
    )
  },
)

DateInput.displayName = 'DateInput'

export default DateInput
