import type { GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Wrapper from '~/layouts/Wrapper'

export const getStaticProps: GetStaticProps = async ({ locale = 'th' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

const Page: NextPage = () => {
  return <Wrapper>hello</Wrapper>
}

export default Page
