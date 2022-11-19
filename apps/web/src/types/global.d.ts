import { Liff } from '@line/liff/dist/lib'

declare global {
  interface Window {
    liff: Liff
    Cypress: any
  }
}
