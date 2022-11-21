import clsx from 'clsx'
import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'
import type {
  FieldValues,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form'
import type { ChoiceInputProps } from '../ChoiceInput/ChoiceInput'
import ChoiceInput from '../ChoiceInput'

interface ChoiceGroupProps extends ComponentPropsWithoutRef<'div'> {
  register: UseFormRegister<FieldValues>
  watch: UseFormWatch<FieldValues>
  options: Omit<ChoiceInputProps, 'type'>[]
  name: string
  type?: 'radio' | 'checkbox'
}

const ChoiceGroup = forwardRef<HTMLDivElement, ChoiceGroupProps>(
  (
    { className, options, name, type = 'radio', register, watch, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={clsx('flex flex-col gap-3', className)}
        {...props}
      >
        {options.map(option => (
          <ChoiceInput
            type={type}
            key={option.label}
            label={option.label}
            value={option.value}
            selected={
              type === 'radio'
                ? watch(name) === option.value
                : type === 'checkbox'
                  ? (watch(name) || []).includes(option.value)
                  : false
            }
            id={option.value as string}
            {...register(name)}
          />
        ))}
      </div>
    )
  },
)

ChoiceGroup.displayName = 'ChoiceGroup'

export default ChoiceGroup
