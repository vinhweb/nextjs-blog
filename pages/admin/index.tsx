import Head from 'next/head';
import Layout, { siteTitle } from '../../components/Layout/layout';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import base from './../../components/Airtable';

export default function Admin(props: {regionList, areaList, wardList}) {

  return (
    <>
      <Layout>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <div className="container px-4 mx-auto py-12">

        </div>
      </Layout>
    </>
  )
}

