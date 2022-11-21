import { Icon } from '@iconify/react'
import clsx from 'clsx'
import type { ComponentProps } from 'react'
import { forwardRef } from 'react'
import BaseInput from '../BaseInput'
import InputLabel from '../InputLabel'

interface TextInputProps
  extends Omit<ComponentProps<typeof BaseInput>, 'type'> {
  label?: string
  error?: string
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ name, label, required, className, error, ...props }, ref) => {
    return (
      <div>
        {label
          ? (
          <InputLabel
            htmlFor={name}
            label={label}
            className="mb-1 block"
            required={required}
            data-test={`input-label-${name}`}
          />
            )
          : null}
        <div className="relative">
          <BaseInput
            type="text"
            id={name}
            name={name}
            ref={ref}
            // required={required}
            data-test={`input-${name}`}
            className={clsx('block', className)}
            {...props}
          />
          {error
            ? (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-red-800">
              <Icon icon="op2022:error" />
            </div>
              )
            : null}
        </div>
      </div>
    )
  },
)

TextInput.displayName = 'TextInput'

export default TextInput
