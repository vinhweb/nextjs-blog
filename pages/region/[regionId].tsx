import Head from 'next/head'
import Layout, { siteTitle } from '../../components/layout'
import { useRouter, withRouter } from 'next/router';
import { useEffect, useState } from 'react';
import base from '../../components/Airtable';
import _ from 'lodash';
import Breadcrumb from '../../components/Breadcrumb';
import Link from 'next/dist/client/link';
import numberWithCommas from '../../utils/numberWithCommas'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Bar } from 'react-chartjs-2';
import { AnyNaptrRecord } from 'node:dns';

const containerStyle = {
  width: '100%',
  height: '400px'
};

export default function DetailPage({areaList}) {
  if(_.isEmpty(areaList)){
    return(
      <p>Not found</p>
    )
  }

  let areaListUnique = _.uniqBy(areaList, 'area_id')

  const {region_name, area_name, area_geo, region_id, area_id} = areaList[0];
  console.log(region_name)
  const center = {
    lat: JSON.parse("[" + area_geo + "]")[0],
    lng: JSON.parse("[" + area_geo + "]")[1]
  };
        

  return (
    <Layout home>
      <Head>
        <title>{area_name.trim()}, {region_name} - {siteTitle}</title>
      </Head>

      <div className="container px-4 mx-auto py-12">
      <Breadcrumb>
          <li className="inline-flex items-center">
            <Link href="/">Trang chủ</Link>
            <svg className="h-4 w-auto text-gray-200" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </li>
          <li className="inline-flex items-center">
            <a className="text-teal-400">{region_name}</a>
          </li>
        </Breadcrumb>
        <h1 className="mt-6 text-3xl mb-4 font-semibold">Giá bất động sản {region_name}</h1>
        <div className="flex space-x-5">
          <div className="w-1/2">
            <p className="text-sm">Tỉnh {region_name} bao gồm: </p>
            <ul className="list-disc list-inside my-2 grid grid-cols-2">
              {areaListUnique.map(item => (
                <li className="text-sm text-indigo-500 hover:text-indigo-400 transition py-1" key={item.id}>
                  <Link href={`/area/${item.area_id}`}>
                    {item.area_name} 
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-1/2">
            <LoadScript googleMapsApiKey="AIzaSyAJI6_202nasUHYbQSVV-JGA4E9VScpIpE">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={11}
              >
                <></>
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
    
      </div>
    </Layout>
  )
}


export const getServerSideProps = async (context) => {
  const {params} = context;
  const regionId = params.regionId;
  let areaList: any;
  

  // Area List
  areaList = await base('area')
    .select({
      filterByFormula: `{region_id} = "${regionId}"`,
      sort: [{field: "area_id", direction: "asc"}]
    })
    .all()
    .catch(err => console.log(err));
  if(!_.isEmpty(areaList)){
    areaList = areaList.map(item => item.fields);
  }

  return{
    props: {
      areaList
    }
  }
}