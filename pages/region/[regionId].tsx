import Head from 'next/head'
import Layout, { siteTitle } from '../../components/Layout/layout'
import { useRouter, withRouter } from 'next/router';
import { useEffect, useState } from 'react';
import base from '../../components/Airtable';
import _ from 'lodash';
import Breadcrumb from '../../components/Head/Breadcrumb';
import Link from 'next/dist/client/link';
import numberWithCommas from '../../utils/numberWithCommas'
import { GoogleMap, Marker, InfoWindow, LoadScript } from '@react-google-maps/api';
import { Bar } from 'react-chartjs-2';
import { AnyNaptrRecord } from 'node:dns';
import PageTitle from '../../components/Head/PageTitle';

const containerStyle = {
  width: '100%',
  height: '400px'
};
const infoWindowStyle = {
  background: `white`,
  border: `1px solid ##CCC`,
  padding: 5,
}

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
        
  const breadList = [
    {name: 'Trang chủ', link: '/'},
    {name: region_name, link: ''},
  ]
  
  return (
    <Layout>
      <Head>
        <title>{area_name.trim()}, {region_name} - {siteTitle}</title>
      </Head>

      <div className="container px-4 mx-auto py-12">
        <Breadcrumb List={breadList}/>
        <PageTitle title={`Giá bất động sản ${region_name}`}   />
        
        <div className="flex space-x-5">
          <div className="w-1/2">
            <p className="text-sm">Tỉnh {region_name} bao gồm: </p>
            <ul className="list-disc list-inside my-2 grid grid-cols-2">
              {areaListUnique.map((item: any, index) => (
                <li className="text-sm text-indigo-500 hover:text-indigo-400 transition py-1" key={index}>
                  <Link href={`/area/${item.area_id}`}>
                    {item.area_name} 
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-1/2">
            <LoadScript googleMapsApiKey="AIzaSyAQik_lAMYYlVdnkDnZRiMvEEXHCuyQZcw">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={11}
              >
                <InfoWindow position={center}>
                  <div style={infoWindowStyle}>
                    <h1>Tỉnh {region_name}</h1>
                  </div>
                </InfoWindow>
                <Marker position={center} />
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