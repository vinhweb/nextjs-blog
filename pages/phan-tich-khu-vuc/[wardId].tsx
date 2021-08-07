import Head from 'next/head'
import Layout, { siteTitle } from '../../components/Layout/layout'
import { useRouter, withRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import base from '../../components/Airtable';
import _ from 'lodash';
import Breadcrumb from '../../components/Head/Breadcrumb';
import Link from 'next/link';
import numberWithCommas from '../../utils/numberWithCommas'
import { GoogleMap, Marker, InfoWindow, LoadScript } from '@react-google-maps/api';
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

export default function DetailPage({ward, wardList}) {
  if(_.isEmpty(ward)){
    return(
      <p>Not found</p>
    )
  }

  const {region_name, area_name, ward_name, region_geo, region_id, area_geo, area_id,
        dat, dat_arr, dat_mat_duong, dat_mat_duong_arr, dat_ngo_hem, dat_ngo_hem_arr,
        nha_o, nha_o_arr, nha_o_mat_duong, nha_o_mat_duong_arr, nha_o_ngo_hem, nha_o_ngo_hem_arr,
        can_ho,
        van_phong} = ward;
  
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
              {wardList.map(item => (
                <li className="text-sm text-indigo-500 hover:text-indigo-400 transition py-1" key={item.id}>
                  <Link href={`/phan-tich-khu-vuc/${item.ward_id}`}>
                    {item.ward_name} 
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
        
        <div className="flex space-x-5 ">
          <div className="w-1/2 mt-10 overflow-hidden border border-gray-200 rounded">
            <table className="table-fixed w-full text-sm divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="text-left p-3 w-3/12">Giá đất</th>
                  <th className="p-3 w-3/12">Giá thấp nhất</th>
                  <th className="p-3 w-3/12">Giá cao nhất</th>
                  <th className="p-3 w-3/12">Giá trung bình</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-20">
                <tr>
                  <td className="p-3">Giá đất tổng</td>
                  <td className="p-3 text-center">{!_.isEmpty(JSON.parse(dat_arr)) ? numberWithCommas(Math.min(...JSON.parse(dat_arr))) : "-"}</td>
                  <td className="p-3 text-center">{!_.isEmpty(JSON.parse(dat_arr)) ? numberWithCommas(Math.max(...JSON.parse(dat_arr))) : "-"}</td>
                  <td className="p-3 text-center">{dat == "empty" ? "-" : numberWithCommas(dat)}</td>
                </tr>
                <tr>
                  <td className="p-3">Giá đất mặt tiền</td>
                  <td className="p-3 text-center">{!_.isEmpty(JSON.parse(dat_mat_duong_arr)) ? numberWithCommas(Math.min(...JSON.parse(dat_mat_duong_arr))) : "-"}</td>
                  <td className="p-3 text-center">{!_.isEmpty(JSON.parse(dat_mat_duong_arr)) ? numberWithCommas(Math.max(...JSON.parse(dat_mat_duong_arr))) : "-"}</td>
                  <td className="p-3 text-center">{dat_mat_duong == "empty" ? "-" : numberWithCommas(dat_mat_duong)}</td>
                </tr>
                <tr>
                  <td className="p-3">Giá đất hẻm/ngõ</td>
                  <td className="p-3 text-center">{!_.isEmpty(JSON.parse(dat_ngo_hem_arr)) ? numberWithCommas(Math.min(...JSON.parse(dat_ngo_hem_arr))) : "-"}</td>
                  <td className="p-3 text-center">{!_.isEmpty(JSON.parse(dat_ngo_hem_arr)) ? numberWithCommas(Math.max(...JSON.parse(dat_ngo_hem_arr))) : "-"}</td>
                  <td className="p-3 text-center">{dat_ngo_hem == "empty" ? "-" : numberWithCommas(dat_ngo_hem)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="w-1/2 mt-10 overflow-hidden border border-gray-200 rounded">
            <table className="table-fixed w-full text-sm divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="text-left p-3 w-3/12">Giá nhà</th>
                  <th className="p-3 w-3/12">Giá thấp nhất</th>
                  <th className="p-3 w-3/12">Giá cao nhất</th>
                  <th className="p-3 w-3/12">Giá trung bình</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-20">
                <tr>
                  <td className="p-3">Giá nhà tổng</td>
                  
                  <td className="p-3 text-center">{!_.isEmpty(JSON.parse(nha_o_arr)) ? numberWithCommas(Math.min(...JSON.parse(nha_o_arr))) : "-"}</td>
                  <td className="p-3 text-center">{!_.isEmpty(JSON.parse(nha_o_arr)) ? numberWithCommas(Math.max(...JSON.parse(nha_o_arr))) : "-"}</td>
                  <td className="p-3 text-center">{nha_o == "empty" ? "-" : numberWithCommas(nha_o)}</td>
                </tr>
                <tr>
                  <td className="p-3">Giá nhà mặt tiền</td>
                  <td className="p-3 text-center">{!_.isEmpty(JSON.parse(nha_o_mat_duong_arr)) ? numberWithCommas(Math.min(...JSON.parse(nha_o_mat_duong_arr))) : "-"}</td>
                  <td className="p-3 text-center">{!_.isEmpty(JSON.parse(nha_o_mat_duong_arr)) ? numberWithCommas(Math.max(...JSON.parse(nha_o_mat_duong_arr))) : "-"}</td>
                  <td className="p-3 text-center">{nha_o_mat_duong == "empty" ? "-" : numberWithCommas(nha_o_mat_duong)}</td>
                </tr>
                <tr>
                  <td className="p-3">Giá nhà hẻm/ngõ</td>
                  <td className="p-3 text-center">{!_.isEmpty(JSON.parse(nha_o_ngo_hem_arr)) ? numberWithCommas(Math.min(...JSON.parse(nha_o_ngo_hem_arr))) : "-"}</td>
                  <td className="p-3 text-center">{!_.isEmpty(JSON.parse(nha_o_ngo_hem_arr)) ? numberWithCommas(Math.max(...JSON.parse(nha_o_ngo_hem_arr))) : "-"}</td>
                  <td className="p-3 text-center">{nha_o_ngo_hem == "empty" ? "-" : numberWithCommas(nha_o_ngo_hem)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

          {/* Additional Info */}
          <section>
            <div className="flex justify-between">
              <div>
                <ul className="mt-5 text-gray-600 italic text-sm list-disc list-inside my-1 space-y-1">
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
                  Chỉ đường đếm đây
                </a>
                <a onClick={()=>openPopup()} className="cursor-pointer text-sm p-3 text-indigo-500 hover:text-indigo-400 transition">Tôi có tài sản tốt hơn!</a>
              </div>
            </div>
          </section>
          {/* End Additional Info */}

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