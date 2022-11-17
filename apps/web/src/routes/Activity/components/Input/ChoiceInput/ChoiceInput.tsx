import { Icon } from '@iconify/react'
import clsx from 'clsx'
import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'

export interface ChoiceInputProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
  selected?: boolean
  label: string
  type: 'radio' | 'checkbox'
}

const iconType = {
  radio: {
    checked: 'op2022:radio-button-checked',
    unchecked: 'op2022:radio-button-unchecked',
  },
  checkbox: {
    checked: 'op2022:check-box-checked',
    unchecked: 'op2022:check-box-unchecked',
  },
}

const ChoiceInput = forwardRef<HTMLInputElement, ChoiceInputProps>(
  (
    { className, selected = false, label, id, type = 'radio', name, ...props },
    ref
  ) => {
    return (
      <div>
        <input
          id={`${name}.${id}`}
          ref={ref}
          type={type}
          className={clsx('hidden', className)}
          name={name}
          {...props}
        />
        <label
          className={clsx(
            'border-gray-150 flex cursor-pointer items-center gap-3 rounded-xl border py-3 px-4',
            selected
              ? 'bg-white text-black sm:bg-gray-800 sm:text-white'
              : 'bg-transparent text-white sm:text-black'
          )}
          htmlFor={`${name}.${id}`}
        >
          <Icon
            icon={iconType[type][selected ? 'checked' : 'unchecked']}
            className={clsx(
              'h-6 w-6 shrink-0',
              selected && 'text-ict-turquoise'
            )}
          />
          <span>{label}</span>
        </label>
      </div>
    )
  }
)

ChoiceInput.displayName = 'RadioInput'

export default ChoiceInput
