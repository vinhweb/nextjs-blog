import Head from 'next/head'
import Layout, { siteTitle } from '../../components/Layout/layout'
import { useEffect, useState } from 'react';
import base from '../../components/Airtable';
import _ from 'lodash';
import Breadcrumb from '../../components/Head/Breadcrumb';
import Link from 'next/dist/client/link';
import { GoogleMap, Marker, InfoWindow, LoadScript } from '@react-google-maps/api';
import { Bar } from 'react-chartjs-2';
import PageTitle from '../../components/Head/PageTitle';
import AreaTable from '../../components/Area/AreaTable';

const containerStyle = {
  width: '100%',
  height: '400px'
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

const infoWindowStyle = {
  background: `white`,
  border: `1px solid ##CCC`,
  padding: 5,
}

export default function DetailPage({wardList}) {
  if(_.isEmpty(wardList)){
    return(
      <p>Not found</p>
    )
  }
  console.log(wardList)
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
        label: `Đất phổ biến ${area_name.trim()}, tỉnh ${region_name.trim()} | Giá/m2`,
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
  
  const breadList = [
    {name: 'Trang chủ', link: '/'},
    {name: region_name, link: `/region/${region_id}`},
    {name: area_name, link: ''},
  ]

  const [popupDangTin, setPopupDangTin] = useState(false);
  const openPopup = ()=>{
    setPopupDangTin(!popupDangTin)
    console.log(popupDangTin)
  }

  return (
    <Layout callPopup={popupDangTin}>
      <Head>
        <title>{area_name.trim()}, {region_name.trim()} - {siteTitle}</title>
      </Head>

      <div className="container px-4 mx-auto py-12">
        {/* Header */}
        <Breadcrumb List={breadList} />
        <PageTitle title={`Giá bất động sản ${area_name.trim()}`} 
                    subtitle={`${area_name.trim()}, ${region_name.trim()}`}  />
        {/* End Header */}
        
        {/* Main */}
        <main>
          {/* Section 1 */}
          <section className="flex space-x-5">
            <div className="w-1/2">
              <p className="text-sm">{area_name.trim()} thuộc tỉnh {region_name.trim()} bao gồm: </p>
              <ul className="list-disc list-inside my-2 grid grid-cols-2">
                {wardList.map((item, index) => (
                  <li className="text-sm text-indigo-500 hover:text-indigo-400 transition py-1" key={index}>
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
          </section>
          {/* End Section 1 */}
      
          <section className="mt-8">
            <Bar type data={data} options={options} />
          </section>

          {/* Price Table */}
          <AreaTable wardList={wardList} />
          {/* End Price Table */}
        
          {/* Additional Info */}
          <section>
            <div className="flex justify-between">
              <div>
                <p className="mt-3 text-gray-600 italic text-xs">Bấm vào Xã/ Phường/ Thị Trấn để có giá xác thục hơn!</p>
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

        </main>
        {/* Main */}
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