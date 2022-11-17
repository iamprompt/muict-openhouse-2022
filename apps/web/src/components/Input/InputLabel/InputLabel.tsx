import clsx from 'clsx'
import type { ComponentProps, FC } from 'react'

interface InputLabelProps extends ComponentProps<'label'> {
  label: string
  required?: boolean
}

const InputLabel: FC<InputLabelProps> = ({
  label,
  required,
  className,
  ...props
}) => {
  return (
    <label className={clsx('font-heading font-bold', className)} {...props}>
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
  )
}

export default InputLabel
