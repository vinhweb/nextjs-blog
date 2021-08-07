import Head from 'next/head'
import Layout, { siteTitle } from '../../components/Layout/layout'

export default function IndexDetailPage() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <div className="container px-4 mx-auto py-12">

      </div>
    </Layout>
  )
}

