import Head from 'next/head'
import Layout, { siteTitle } from '../../components/layout'
import { useRouter, withRouter } from 'next/router';
import { useEffect, useState } from 'react';
import base from './../../components/Airtable';
import _ from 'lodash';

export default function DetailPage({fields}) {
  console.log(fields)
  const {region_name, area_name, ward_name, 
        dat, dat_mat_duong, dat_ngo_hem, 
        nha_o, nha_o_mat_duong, nha_o_ngo_hem,
        can_ho,
        van_phong} = fields

  if(_.isEmpty(fields)){
    return(
      <p>Not found</p>
    )
  }

  const getRegions = async () => {
    const records = await base('region')
      .select({})
      .firstPage()
      .catch(err => console.log(err));

    console.log(records);
  }

  useEffect(() => {
    getRegions()
  }, [])

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <div className="container px-4 mx-auto py-12">
        {region_name}
      </div>
    </Layout>
  )
}


export const getServerSideProps = async (context) => {
  const {params} = context;
  const wardId = params.wardId;
  let fields = {};

  const res = await base('main_data')
    .select({
      maxRecords: 1,
      view: "Grid view",
      filterByFormula: `{ward_id} = "${wardId}"`
    })
    .firstPage()
    .catch(err => console.log(err));

  if(Array.isArray(res) && res.length){
    fields = res[0].fields
  }

  return{
    props: {
      fields
    }
  }
}