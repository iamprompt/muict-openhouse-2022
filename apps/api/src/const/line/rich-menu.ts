export const RICH_MENU_BY_ENV = {
  production: {
    DEFAULT: 'richmenu-1da194a57629a783ac98a2fb26434f6b',
    REGISTERED: 'richmenu-79c95553ded5523f94786641adeb31d4',
  },
  development: {
    DEFAULT: 'richmenu-118cf162f175ff0a6e7833f164022607',
    REGISTERED: 'richmenu-b876c8dbbf160009e38c78101100f046',
  },
  test: {
    DEFAULT: 'richmenu-118cf162f175ff0a6e7833f164022607',
    REGISTERED: 'richmenu-b876c8dbbf160009e38c78101100f046',
  },
}

export const RICH_MENU_ID = RICH_MENU_BY_ENV[process.env.NODE_ENV || 'development']
