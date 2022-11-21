import clsx from 'clsx'
import type { ComponentProps } from 'react'
import { forwardRef } from 'react'
import InputLabel from '../InputLabel'

interface OptionObjProps {
  label: string
  value: string
}

type OptionProps = OptionObjProps | string

interface SelectInputProps extends ComponentProps<'select'> {
  label?: string
  options?: OptionProps[]
}

const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ label, name, required, options = [], className, ...props }, ref) => {
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
        <select
          name={name}
          id={name}
          ref={ref}
          required={required}
          data-test={`input-select-${name}`}
          className={clsx(
            'appearance-none rounded-xl border border-gray-200 py-2 px-3 text-black outline-none placeholder:text-gray-300',
            className,
          )}
          {...props}
        >
          {options.map((option) => {
            const optionObj
              = typeof option === 'string'
                ? { label: option, value: option }
                : option

            return (
              <option value={optionObj.value} key={optionObj.value}>
                {optionObj.label}
              </option>
            )
          })}
        </select>
      </div>
    )
  },
)

SelectInput.displayName = 'SelectInput'

export default SelectInput
