import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'

const NotFoundPage = () => {
  return (
    <Layout home>
      <Head>
        <title>404 - {siteTitle}</title>
      </Head>

      <div className="container px-4 mx-auto py-12">
        404 - Không tìm thấy dữ liệu
      </div>
    </Layout>
  )
}

export default NotFoundPage