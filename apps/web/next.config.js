/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: 'th',
    locales: ['th', 'en'],
    localeDetection: false,
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/static/line/images/:image/:size(\\d{1,})',
          destination: '/static/line/images/:image/:size.jpg',
        },
        {
          source: '/static/line/images/:image/:size(\\d{1,})',
          destination: '/static/line/images/:image/:size.png',
        },
      ],
    }
  },
}

module.exports = nextConfig
