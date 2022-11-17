enum AUTHENTICATION_METHOD {
  PASSWORD = 'pwd',
  LINE_AUTO_LOGIN = 'lineautologin',
  QR = 'lineqr',
  SSO = 'linesso',
}

export interface IVerifyIdTokenResponse {
  iss: string
  sub: string
  aud: string
  exp: number
  iat: number
  nonce: string
  amr: AUTHENTICATION_METHOD[]
  name: string
  picture: string
  email?: string
}
