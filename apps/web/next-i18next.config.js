const path = require('path')

module.exports = {
  i18n: {
    // debug: process.env.NODE_ENV === 'development',
    defaultLocale: 'th',
    locales: ['th', 'en'],
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  localePath: path.resolve('./public/static/locales'),
}
