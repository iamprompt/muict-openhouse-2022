import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import '~/utils/iconify.ts'
import { DefaultSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import TagManager from 'react-gtm-module'
import nextI18nConfig from '../../next-i18next.config'
import LIFFWrapper from '~/layouts/LiffWrapper'
import { Context } from '~/context/storeon'
import LocaleWrapper from '~/layouts/LocaleWrapper'

const App = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter()

  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-MDH3CML' })
  }, [])

  return (
    <>
      <DefaultSeo
        defaultTitle={'ICT Mahidol Open House 2022'}
        titleTemplate={'%s | ICT Mahidol Open House 2022'}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/static/images/favicon.svg',
            type: 'image/svg+xml',
          },
        ]}
      />
      {/* StoreOn Context */}
      <Context>
        {/* LIFF Wrapper */}
        <LIFFWrapper>
          {['/quest', '/quest/[id]', '/evaluation', '/agenda'].includes(pathname)
            ? (
            <LocaleWrapper>
              <Component {...pageProps} />
            </LocaleWrapper>
              )
            : (
            <Component {...pageProps} />
              )}
        </LIFFWrapper>
      </Context>
    </>
  )
}

export default appWithTranslation(App, nextI18nConfig)
