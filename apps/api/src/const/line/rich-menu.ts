export const RICH_MENU_BY_ENV = {
  production: {
    DEFAULT: 'richmenu-118cf162f175ff0a6e7833f164022607',
    REGISTERED: 'richmenu-359271d66295bbcc9edc2dfb1dbcba3f',
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
