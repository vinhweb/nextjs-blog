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

const containerStyle = {
  width: '100%',
  height: '400px'
};

export default function DetailPage({wardList}) {
  if(_.isEmpty(wardList)){
    return(
      <p>Not found</p>
    )
  }

  const {region_name, area_name, ward_name, region_geo, region_id, area_geo, area_id,
        dat, dat_arr, dat_mat_duong, dat_mat_duong_arr, dat_ngo_hem, dat_ngo_hem_arr,
        nha_o, nha_o_arr, nha_o_mat_duong, nha_o_mat_duong_arr, nha_o_ngo_hem, nha_o_ngo_hem_arr,
        can_ho,
        van_phong} = wardList[0];
  
  const center = {
    lat: JSON.parse("[" + area_geo + "]")[0],
    lng: JSON.parse("[" + area_geo + "]")[1]
  };
        
  const data:any = {
    labels: wardList.map(item=> item.ward_name),
    datasets: [
      {
        label: `Đất tổng ${area_name.trim()}, tỉnh ${region_name.trim()} | Giá/m2`,
        data: wardList.map(item => item.dat == "empty" ? 0 : item.dat),
        backgroundColor: [
          'rgba(218, 247, 166, 0.8)',
          'rgba(255, 195, 0, 0.8)',
          'rgba(255, 87, 51, 0.8)',
          'rgba(199, 0, 57, 0.8)',
          'rgba(144, 12, 63, 0.8)',
          'rgba(88, 24, 69, 0.8)',
          'rgba(33, 97, 140, 0.8)',
          'rgba(40, 116, 166, 0.8)',
          'rgba(46, 134, 193, 0.8)',
          'rgba(52, 152, 219, 0.8)',
          'rgba(93, 173, 226, 0.8)',
          'rgba(133, 193, 233, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 0,
      },
    ],
  };
  
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <Layout home>
      <Head>
        <title>{area_name.trim()}, {region_name.trim()} - {siteTitle}</title>
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
            <Link href={`/region/${region_id}`}>{region_name.trim()}</Link>
            <svg className="h-4 w-auto text-gray-200" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </li>
          <li className="inline-flex items-center">
            <a className="text-teal-400">{area_name}</a>
          </li>
        </Breadcrumb>
        <h1 className="mt-6 text-3xl mb-4 font-semibold">Giá bất động sản {area_name.trim()}</h1>
        <div className="description">
          <h3 className="mb-1">
            {area_name.trim()}, {region_name.trim()}
          </h3>
        </div>
        <div className="flex space-x-5">
          <div className="w-1/2">
            <p className="text-sm">{area_name.trim()} thuộc tỉnh {region_name.trim()} bao gồm: </p>
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
                <></>
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
    
        <div className="mt-8">
          <Bar type data={data} options={options} />
        </div>

        <div className="flex space-x-5 ">
          <div className="w-full mt-10 overflow-hidden border border-gray-200 rounded">
            <table className="table-fixed w-full text-sm divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="text-left p-3 w-3/12">Giá đất</th>
                  <th className="p-3" style={{width: '14%'}}>Đất tổng</th>
                  <th className="p-3" style={{width: '14%'}}>Đất mặt tiền</th>
                  <th className="p-3" style={{width: '14%'}}>Đất ngõ hẻm</th>
                  <th className="p-3" style={{width: '14%'}}>Nhà tổng</th>
                  <th className="p-3" style={{width: '14%'}}>Nhà mặt tiền</th>
                  <th className="p-3" style={{width: '14%'}}>Nhà ngõ hẻm</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-20">
                {wardList.map(item => (
                  <tr key={item.id}>
                    <td className="p-3 text-indigo-500 hover:text-indigo-400 transition">
                      <Link href={`/phan-tich-khu-vuc/${item.ward_id}`}>{item.ward_name}</Link>
                    </td>
                    <td className="p-3 text-center">{item.dat == "empty" ? "-" : numberWithCommas(item.dat)}</td>
                    <td className="p-3 text-center">{item.dat_mat_duong == "empty" ? "-" : numberWithCommas(item.dat_mat_duong)}</td>
                    <td className="p-3 text-center">{item.dat_ngo_hem == "empty" ? "-" : numberWithCommas(item.dat_ngo_hem)}</td>
                    <td className="p-3 text-center">{item.nha_o == "empty" ? "-" : numberWithCommas(item.nha_o)}</td>
                    <td className="p-3 text-center">{item.nha_o_mat_duong == "empty" ? "-" : numberWithCommas(item.nha_o_mat_duong)}</td>
                    <td className="p-3 text-center">{item.nha_o_ngo_hem == "empty" ? "-" : numberWithCommas(item.nha_o_ngo_hem)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <p className="mt-3 text-gray-600 italic text-xs">Giá tiền/m2. Updated 07/2021 By ThamDinhGiaAV.com</p>
          <ul className="mt-5 text-gray-600 italic text-sm list-disc list-inside my-1 space-y-1">
            <li>Các con số thống kê và phân tích dựa vào hàng triệu tin đăng của người dùng.</li>
            <li>Đa số giá đất được khảo sát dựa vào giá đất thổ cư/ có giao dịch trên thị trường.</li>
            <li>“Giá Nhà” có độ ưu tiên sau “Giá Đất” và nên được sử dụng khi thiêủ thông tin. </li>
            <li>Con số đã được ThamdinhgiaAV xác minh sẽ được kèm dấu “*”</li>
            <li>Độ tin cậy giảm dần theo màu số Màu đen &gt; Màu Cam &gt; Màu đỏ</li>
          </ul>
        </div>



      </div>
    </Layout>
  )
}


export const getServerSideProps = async (context) => {
  const {params} = context;
  const areaId = params.areaId;
  let wardList: any;
  
  // Ward List
  wardList = await base('main_data')
    .select({
      filterByFormula: `{area_id} = "${areaId}"`,
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
      wardList
    }
  }
}