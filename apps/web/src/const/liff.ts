export const LIFF_ID_BY_ENV = {
  production: '1657589097-nR7r7Xxp',
  development: '1657522185-7Jyxy33A',
  test: '1657522185-7Jyxy33A',
}

export const LIFF_ID = LIFF_ID_BY_ENV[process.env.NODE_ENV || 'development']

export const getLiffUrl = (path: string) => `https://liff.line.me/${LIFF_ID}${path}`
