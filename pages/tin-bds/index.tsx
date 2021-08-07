import Head from 'next/head'
import Layout, { siteTitle } from '../../components/Layout/layout'
import base from '../../components/Airtable';
import _ from 'lodash';
import Breadcrumb from '../../components/Head/Breadcrumb';
import Link from 'next/link';
import PageTitle from '../../components/Head/PageTitle';
import PostList from '../../components/PostList/PostList';

export default function IndexDetailPage({postList}) {
  const breadList = [
    {name: 'Trang chủ', link: '/'},
    {name: 'Tin BĐS', link: ''},
  ]

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <div className="container px-4 mx-auto py-12">
        <Breadcrumb List={breadList} />
        <PageTitle title={`Tin bất động sản`} 
                  subtitle={`Các tin bất động sản được tổng hợp`}  />
        
        <div className="mt-8">
          <PostList data={postList}/>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  let postList: any;

  // Area List
  postList = await base('guest')
    .select({
    })
    .all()
    .catch(err => console.log(err));
  if(!_.isEmpty(postList)){
    postList = postList.map(item => item._rawJson);
  }

  return{
    props: {
      postList
    }
  }
}