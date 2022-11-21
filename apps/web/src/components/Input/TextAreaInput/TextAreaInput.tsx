import clsx from 'clsx'
import type { ComponentProps } from 'react'
import { forwardRef } from 'react'
import BaseTextArea from '../BaseTextArea'
import InputLabel from '../InputLabel'

interface TextAreaInputProps
  extends Omit<ComponentProps<typeof BaseTextArea>, 'type'> {
  label?: string
}

const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
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
        <BaseTextArea
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

TextAreaInput.displayName = 'TextAreaInput'

export default TextAreaInput
