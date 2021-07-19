import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import base from './../components/Airtable';

export default function Home(props: {regionList, areaList, wardList}) {
  const [searchTerm, setSearchTerm] = useState({
    region: 0,
    area:   0,
    ward:   0
  });

  const [regionList, setRegionList] = useState(props.regionList);
  const [areaList, setAreaList] = useState(props.areaList);
  const [wardList, setWardList] = useState(props.wardList);

  const handleChange = (event) => {
    setSearchTerm({ 
      ...searchTerm, 
      [event.target.name]: event.target.value 
    });

    if(event.target.name === 'region'){
      getAreas(event.target.value);
      setSearchTerm({
        ...searchTerm, 
        [event.target.name]: event.target.value ,
        area: 0,
        ward: 0
      })
    }
    if(event.target.name === 'area'){
      getWards(event.target.value);
      setSearchTerm({
        ...searchTerm, 
        [event.target.name]: event.target.value ,
        ward: 0
      })
    }
  }

  const getRegions = async () => {
    let records: any = await base('region')
      .select({
        sort: [{field: "region_id", direction: "asc"}]
      })
      .all()
      .catch(err => console.log(err));

    if(!_.isEmpty(records)){
      records = records.map(item => item.fields);
      setRegionList(records)

      // init get firstItem
      // getAreas(records[0].region_id)
    }
  }

  const getAreas = async (regionId) => {
    let records: any = await base('area')
      .select({
        filterByFormula: `{region_id} = "${regionId}"`,
        sort: [{field: "area_id", direction: "asc"}]
      })
      .all()
      .catch(err => console.log(err));

    if(!_.isEmpty(records)){
      records = records.map(item => item.fields);
      setAreaList(records)
      
      // init get firstItem
      // getWards(records[0].area_id)
    }
  }

  const getWards = async (areaId) => {
    let records: any = await base('ward')
      .select({
        filterByFormula: `{area_id} = "${areaId}"`,
        sort: [{field: "ward_id", direction: "asc"}]
      })
      .all()
      .catch(err => console.log(err));

    if(!_.isEmpty(records)){
      records = records.map(item => item.fields);
      setWardList(records)
    }
  }

  function searchArea(event){
    event.preventDefault();
    console.log(searchTerm)
    
    if(searchTerm.ward === 0){
      if(searchTerm.area === 0){
        window.location.href="/region/"+searchTerm.region
        return;
      }
      window.location.href="/area/"+searchTerm.area
      return;
    }
    window.location.href="/phan-tich-khu-vuc/"+searchTerm.ward
    return;
  }

  useEffect(() => {
    // getRegions()
  }, [])

  useEffect(()=>{
    // if(!_.isEmpty(wardList)){
    //   setSearchTerm({
    //     ...searchTerm,
    //     ward: wardList[0].ward_id
    //   })
    // } 
  }, [wardList, setWardList])

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <div className="container px-4 mx-auto py-12">
        <div className="flex flex-wrap items-center -mx-4">
          <div className="w-full md:w-2/3 px-4 mb-6 md:mb-0">
            <h2 className="mt-8 mb-6 lg:mb-12 text-4xl lg:text-5xl font-semibold">Định giá nhanh <br /> Bất động sản toàn quốc</h2>
            <div className="max-w-2xl mb-6 lg:mb-12">
              <p className="text-xl text-gray-500">Kiểm tra giá nhà đất trên khắp Việt Nam với công nghệ Bigdata và đội ngũ Thẩm Định Viên được cấp phép bởi Bộ Tài Chính</p>
            </div>
            <div>
            <form onSubmit={searchArea}>
              <div className="flex space-x-4">
                <select className="px-6 py-4 text-sm font-medium leading-normal rounded appearance-none bg-gray-50" name="region" value={searchTerm.region} onChange={handleChange}>
                  <option>--- Chọn Tỉnh ---</option>
                  {regionList.map(region => (
                    <option key={region.region_id} value={region.region_id}>{region.region_name}</option>
                  ))}
                </select>

                {searchTerm.region !=0 && (
                  <select className="px-6 py-4 text-sm font-medium leading-normal rounded appearance-none bg-gray-50" name="area" value={searchTerm.area} onChange={handleChange}>
                    <option value="0">--- Chọn Huyện ---</option>
                    {areaList.map(area => (
                      <option key={area.area_id} value={area.area_id}>{area.area_name}</option>
                    ))}
                  </select>
                )}

                {searchTerm.area != 0 &&  (
                  <select className="px-6 py-4 text-sm font-medium leading-normal rounded appearance-none bg-gray-50" name="ward" value={searchTerm.ward} onChange={handleChange}>
                    <option value="0">--- Chọn Xã ---</option>
                    {wardList.map(ward => (
                      <option key={ward.ward_id} value={ward.ward_id}>{ward.ward_name}</option>
                    ))}
                  </select>
                )}

                <button type="submit" className="whitespace-nowrap cursor-pointer block px-6 py-4 text-sm font-medium leading-normal bg-orange-400 hover:bg-orange-300 text-white rounded transition duration-200" >Tìm kiếm</button>
              </div>
            </form>

              {/* <form className="" onSubmit={searchArea}>
                <div className="p-4 bg-white flex items-center rounded  shadow-lg">
                  <input className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none" 
                        required
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        id="search" type="text" placeholder="Nhập nơi bạn muốn xem giá..."/>
                  <button type="submit" className="whitespace-nowrap cursor-pointer block px-6 py-4 text-sm font-medium leading-normal bg-orange-400 hover:bg-orange-300 text-white rounded transition duration-200" >Tìm kiếm</button>
                </div>
              </form> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}


export async function getStaticProps(context) {
  let regionList: any,
      areaList: any,
      wardList: any;
  
  // Region List
  regionList = await base('region')
    .select({
      sort: [{field: "region_id", direction: "asc"}]
    })
    .all()
    .catch(err => console.log(err));
  if(!_.isEmpty(regionList)){
    regionList = regionList.map(item => item.fields);
  }
  // End Region List

  // Area List
  areaList = await base('area')
    .select({
      filterByFormula: `{region_id} = "${regionList.region_id}"`,
      sort: [{field: "area_id", direction: "asc"}]
    })
    .all()
    .catch(err => console.log(err));
  if(!_.isEmpty(areaList)){
    areaList = areaList.map(item => item.fields);
  }
  // End Area List

  
  // Ward List
  wardList = await base('ward')
    .select({
      filterByFormula: `{area_id} = "${areaList.area_id}"`,
      sort: [{field: "ward_id", direction: "asc"}]
    })
    .all()
    .catch(err => console.log(err));
  if(!_.isEmpty(wardList)){
    wardList = wardList.map(item => item.fields);
  }
  // End Ward List

  return {
    props: {
      regionList,
      areaList,
      wardList
    },
  }
}