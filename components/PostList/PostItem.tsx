import Image from 'next/image'
import React from 'react'
import numberWithCommas from '../../utils/numberWithCommas'
import Date from '../date'

const PostItem = ({data}) => {
  console.log(data)
  const {title, chi_tiet, hinh_anh, gia_ban, loai_bds, phap_ly, phone, email, dien_tich_dat, tong_dien_tich} = data.fields
  const time = data.createdTime;
  const featureImgUrl = hinh_anh[0].url;

  return (
    <div className="flex space-x-4">
      <div className="img h-48 w-1/3 relative rounded-lg overflow-hidden">
        <Image className="object-center object-cover" src={featureImgUrl} width="400" height='400' layout='responsive' />
      </div>
      <div className="w-2/3 flex flex-wrap justify-between h-48 content-between">
        <div className="w-full">
          <h3 className="font-semibold mb-3">{title} </h3>

          <div className="text-sm w-full">
            <p className="">{chi_tiet} </p>
            <div className="flex space-x-4 mt-3">
              <div>{loai_bds} </div>
              <div>{phap_ly} </div>
              <div>{numberWithCommas(gia_ban)}<span className="text-xs">đ/m2</span></div>
              <div>{tong_dien_tich}<span className="text-xs">m2</span></div>
            </div>
          </div>
        </div>

        <div className="text-sm w-full mt-3 text-gray-600" style={{height: 'fit-content'}}>
          <Date dateString={time} />
        </div>
      </div>
    </div>
  )
}

export default PostItem
