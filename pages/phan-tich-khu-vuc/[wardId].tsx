import Head from 'next/head'
import Layout, { siteTitle } from '../../components/Layout/layout'
import { useState } from 'react';
import base from '../../components/Airtable';
import _ from 'lodash';
import Breadcrumb from '../../components/Head/Breadcrumb';
import Link from 'next/link';
import { GoogleMap, Marker, InfoWindow, LoadScript } from '@react-google-maps/api';
import PageTitle from '../../components/Head/PageTitle';
import WardTable from '../../components/Ward/WardTable';
import Image from 'next/image'
import WardSlider from "../../components/Ward/WardSlider";

const containerStyle = {
  width: '100%',
  height: '400px'
};

const infoWindowStyle = {
  background: `white`,
  border: `1px solid ##CCC`,
  padding: 5,
}

export default function WardId({ward, wardList}) {
  if(_.isEmpty(ward)){
    return(
      <p>Not found</p>
    )
  }

  console.log(ward)

  const {region_name, area_name, ward_name, region_geo, region_id, area_geo, area_id,
        dat, dat_arr, dat_mat_duong, dat_mat_duong_arr, dat_ngo_hem, dat_ngo_hem_arr,
        nha_o, nha_o_arr, nha_o_mat_duong, nha_o_mat_duong_arr, nha_o_ngo_hem, nha_o_ngo_hem_arr,
        can_ho,
        van_phong, image} = ward;
  
  const center = {
    lat: JSON.parse("[" + area_geo + "]")[0],
    lng: JSON.parse("[" + area_geo + "]")[1]
  };

  const breadList = [
    {name: 'Trang chủ', link: '/'},
    {name: region_name, link: `/region/${region_id}`},
    {name: area_name, link: `/area/${area_id}`},
    {name: ward_name, link: ''},
  ]

  const [popupDangTin, setPopupDangTin] = useState(false);
  const openPopup = ()=>{
    setPopupDangTin(!popupDangTin)
    console.log(popupDangTin)
  }

  const featureImgUrl = _.isEmpty(image) ? '' : image[0].url;



  return (
    <Layout callPopup={popupDangTin}>
      <Head>
        <title>{ward_name.trim()}, {area_name.trim()}, {region_name} - {siteTitle}</title>
      </Head>

      <div className="container px-4 mx-auto py-12">
        <Breadcrumb List={breadList} />
        <PageTitle title={`Giá bất động sản ${ward_name}`} subtitle={`${ward_name.trim()}, ${area_name.trim()}, ${region_name}`}  />

        <div className="flex space-x-5">
          <div className="w-1/2">
            <p className="text-sm">{ward_name.trim()} là 1 trong {wardList.length} xã (phường/ thị trấn) thuộc {area_name.trim()} bao gồm: </p>
            <ul className="list-disc list-inside my-2 grid grid-cols-2">
              {wardList.map((item, index) => (
                <li className="text-sm text-indigo-500 hover:text-indigo-400 transition py-1" key={item.id}>
                  <Link href={`/phan-tich-khu-vuc/${item.ward_id}`}>
                    {item.ward_name} 
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-1/2">
            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLEMAP}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={13}
              >
                <InfoWindow position={center}>
                  <div style={infoWindowStyle}>
                    <h1>{area_name.trim()}, {region_name.trim()}</h1>
                  </div>
                </InfoWindow>
                <Marker position={center} />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
        


        <WardTable ward={ward} />


        {/* Additional Info */}
        <section>
          <div className="flex justify-between">
            <div className="mt-2">
              <ul className="text-gray-600 italic text-xs list-disc list-inside my-1 space-y-1 space-y-1">
                <li>Các con số thống kê và phân tích dựa vào hàng triệu tin đăng của người dùng.</li>
                <li>Đa số giá đất được khảo sát dựa vào giá đất thổ cư/ có giao dịch trên thị trường.</li>
                <li>“Giá Nhà” có độ ưu tiên sau “Giá Đất” và nên được sử dụng khi thiêủ thông tin. </li>
                <li>Con số đã được ThamdinhgiaAV xác minh sẽ được kèm dấu “*”</li>
                <li>Độ tin cậy giảm dần theo màu số Màu đen &gt; Màu Cam &gt; Màu đỏ</li>
              </ul>
            </div>
            <div>
              <p className="mt-3 text-gray-600 italic text-xs">Giá tiền/m2. Updated 07/2021 By ThamDinhGiaAV.com</p>
              <a target="_blank" rel="noopener noreferrer" href={`https://maps.google.com/?q=${center.lat},${center.lng}`} className="cursor-pointer text-sm p-3 text-indigo-500 hover:text-indigo-400 transition">
                Chỉ đường đến đây
              </a>
              <a onClick={()=>openPopup()} className="cursor-pointer text-sm p-3 text-indigo-500 hover:text-indigo-400 transition">Tôi có tài sản tốt hơn!</a>
            </div>
          </div>
        </section>
        {/* End Additional Info */}

        <div className="flex space-x-5 mt-5">
          <div className="w-1/2">
            <div className="img relative rounded-lg overflow-hidden">
              {featureImgUrl && (
                  <Image className="object-center object-cover" src={featureImgUrl} width="400" height='400' layout='responsive' />
              )}
            </div>
          </div>
          <div className="w-1/2">
            <WardSlider averagePrice={parseInt(dat)}/>
          </div>
        </div>

      </div>
    </Layout>
  )
}


export const getServerSideProps = async (context) => {
  const {params} = context;
  const wardId = params.wardId;
  let ward:any,
      wardList: any;
  
  //Ward Select
  const wards = await base('main_data')
    .select({
      maxRecords: 1,
      view: "Grid view",
      filterByFormula: `{ward_id} = "${wardId}"`
    })
    .firstPage()
    .catch(err => console.log(err));

  if(!_.isEmpty(wards)){
    ward = wards[0].fields
  }
  //Ward Select

  // Ward List
  wardList = await base('ward')
    .select({
      filterByFormula: `{area_id} = "${ward.area_id}"`,
      sort: [{field: "ward_id", direction: "asc"}]
    })
    .all()
    .catch(err => console.log(err));
  if(!_.isEmpty(wardList)){
    wardList = wardList.map(item => item.fields);
  }
  // End Ward List

  return{
    props: {
      ward,
      wardList
    }
  }
}