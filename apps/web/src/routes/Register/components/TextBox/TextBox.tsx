import type { FC } from 'react'

interface TextBoxProps {
  text: string
}

const TextBox: FC<TextBoxProps> = ({ text }) => {
  return (
    <div className="min-h-[24rem] overflow-hidden rounded-xl bg-white p-5 text-black shadow-lg sm:shadow-none">
      <div>{text}</div>
    </div>
  )
}

export default TextBox
