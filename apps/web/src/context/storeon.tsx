import type { FC, ReactNode } from 'react'
import { createContext } from 'react'
import { createStoreon } from 'storeon'
import { customContext } from 'storeon/react'
import { storeonDevtools } from 'storeon/devtools'
import type { FormEvent, FormStore } from './store/form'
import { form } from './store/form'

export const store = createStoreon<FormStore, FormEvent>([
  form,
  process.env.NODE_ENV !== 'production' && storeonDevtools,
])

const StoreonContext = createContext(store)

export const useStoreon = customContext(StoreonContext)

export const Context: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <StoreonContext.Provider value={store}>{children}</StoreonContext.Provider>
  )
}
