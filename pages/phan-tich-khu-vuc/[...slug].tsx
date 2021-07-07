import Head from 'next/head'
import Layout, { siteTitle } from '../../components/layout'
import { useRouter, withRouter } from 'next/router';

export default function DetailPage() {
  const router = useRouter();
  let area = '';
  if (typeof router.query.slug !== 'undefined'){
    area = (router.query.slug.length > 0) && router.query.slug[0]
  } 

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <div className="container px-4 mx-auto py-12">
        {area}
      </div>
    </Layout>
  )
}

