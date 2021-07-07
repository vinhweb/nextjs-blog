import Head from 'next/head'
import Layout, { siteTitle } from '../../components/layout'

export default function IndexDetailPage() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <div className="container px-4 mx-auto py-12">

      </div>
    </Layout>
  )
}

