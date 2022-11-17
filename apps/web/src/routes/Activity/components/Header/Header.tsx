import type { FC } from 'react'
import { IctMahidolOpenHouseWordmark } from '~/components/Icons'

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <header className="relative flex h-12 items-center justify-center">
      <IctMahidolOpenHouseWordmark className="h-12 max-w-md" />
    </header>
  )
}

export default Header
