import _ from 'lodash';
import React from 'react'
import { useState } from 'react';
import numberWithCommas from '../../utils/numberWithCommas'

function checkErrorType(typeArray= [], typeErr){
  if (_.isEmpty(typeArray)) {
    return '';
  }

  if (typeErr != 0) {
    if (typeArray.length <=2){
      return 'text-red-600';
    } else if (typeArray.length > 2 && typeArray.length < 5) {
      return 'text-orange-600'
    }
  } else {
    return 'approved';
  }
}

const WardTable = ({ward}) => {
  const {region_name, area_name, ward_name, region_geo, region_id, area_geo, area_id,
    dat, dat_arr, dat_err,
    dat_mat_duong, dat_mat_duong_arr, dat_mat_duong_err,
    dat_ngo_hem, dat_ngo_hem_arr, dat_ngo_hem_err,
    nha_o, nha_o_arr, nha_o_err,
    nha_o_mat_duong, nha_o_mat_duong_arr, nha_o_mat_duong_err,
    nha_o_ngo_hem, nha_o_ngo_hem_arr, nha_o_ngo_hem_err,
    can_ho, can_ho_arr, can_ho_err,
    van_phong, van_phong_arr, van_phong_err,
    approved} = ward;

  const [priceList, setPriceList] = useState({
    dat_arr: JSON.parse(dat_arr),
    dat_mat_duong_arr: JSON.parse(dat_mat_duong_arr),
    dat_ngo_hem_arr: JSON.parse(dat_ngo_hem_arr),
    nha_o_arr: JSON.parse(nha_o_arr),
    nha_o_mat_duong_arr: JSON.parse(nha_o_mat_duong_arr),
    nha_o_ngo_hem_arr: JSON.parse(nha_o_ngo_hem_arr),
  })

  let priceListClass = {
    dat: checkErrorType(priceList.dat_arr, dat_err),
    dat_mat_duong: checkErrorType(priceList.dat_mat_duong_arr, dat_mat_duong_err),
    dat_ngo_hem: checkErrorType(priceList.dat_ngo_hem_arr, dat_ngo_hem_err),
    nha_o: checkErrorType(priceList.nha_o_arr, nha_o_err),
    nha_o_mat_duong: checkErrorType(priceList.nha_o_mat_duong_arr, nha_o_mat_duong_err),
    nha_o_ngo_hem: checkErrorType(priceList.nha_o_ngo_hem_arr, nha_o_ngo_hem_err),
  }


  // if(approved){
  //   for (const property in priceListClass) {
  //     if (priceListClass.hasOwnProperty(property)) {
  //       priceListClass[property] = 'approved';
  //     }
  //   }
  // }

  return (
    <section className="flex space-x-5 ">
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
              <td className="p-3">Giá đất phổ biến</td>
              <td className={`p-3 text-center ${priceListClass.dat}`}>
                {!_.isEmpty(priceList.dat_arr) ? numberWithCommas(Math.min(...priceList.dat_arr)) : "-"}
              </td>
              <td className={`p-3 text-center ${priceListClass.dat}`}>
                {!_.isEmpty(priceList.dat_arr) ? numberWithCommas(Math.max(...priceList.dat_arr)) : "-"}
              </td>
              <td className={`p-3 text-center ${priceListClass.dat}`}>
                {dat == "empty" ? "-" : numberWithCommas(dat)}
              </td>
            </tr>
            <tr>
              <td className="p-3">Giá đất mặt tiền
              </td>
              <td className={`p-3 text-center ${priceListClass.dat_mat_duong}`}>
                {!_.isEmpty(priceList.dat_mat_duong_arr) ? numberWithCommas(Math.min(...priceList.dat_mat_duong_arr)) : "-"}
              </td>
              <td className={`p-3 text-center ${priceListClass.dat_mat_duong}`}>
                {!_.isEmpty(priceList.dat_mat_duong_arr) ? numberWithCommas(Math.max(...priceList.dat_mat_duong_arr)) : "-"}
              </td>
              <td className={`p-3 text-center ${priceListClass.dat_mat_duong}`}>
                {dat_mat_duong == "empty" ? "-" : numberWithCommas(dat_mat_duong)}
              </td>
            </tr>
            <tr>
              <td className="p-3">Giá đất hẻm/ngõ
              </td>
              <td className={`p-3 text-center ${priceListClass.dat_ngo_hem}`}>
                {!_.isEmpty(priceList.dat_ngo_hem_arr) ? numberWithCommas(Math.min(...priceList.dat_ngo_hem_arr)) : "-"}
              </td>
              <td className={`p-3 text-center ${priceListClass.dat_ngo_hem}`}>
                {!_.isEmpty(priceList.dat_ngo_hem_arr) ? numberWithCommas(Math.max(...priceList.dat_ngo_hem_arr)) : "-"}
              </td>
              <td className={`p-3 text-center ${priceListClass.dat_ngo_hem}`}>
                {dat_ngo_hem == "empty" ? "-" : numberWithCommas(dat_ngo_hem)}
              </td>
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
              <td className="p-3">Giá nhà phổ biến</td>
              
              <td className={`p-3 text-center ${priceListClass.nha_o}`}>
                {!_.isEmpty(priceList.nha_o_arr) ? numberWithCommas(Math.min(...priceList.nha_o_arr)) : "-"}
              </td>
              <td className={`p-3 text-center ${priceListClass.nha_o}`}>
                {!_.isEmpty(priceList.nha_o_arr) ? numberWithCommas(Math.max(...priceList.nha_o_arr)) : "-"}
              </td>
              <td className={`p-3 text-center ${priceListClass.nha_o}`}>
                {nha_o == "empty" ? "-" : numberWithCommas(nha_o)}
              </td>
            </tr>
            <tr>
              <td className="p-3">Giá nhà mặt tiền</td>
              <td className={`p-3 text-center ${priceListClass.nha_o_mat_duong}`}>
                {!_.isEmpty(priceList.nha_o_mat_duong_arr) ? numberWithCommas(Math.min(...priceList.nha_o_mat_duong_arr)) : "-"}
              </td>
              <td className={`p-3 text-center ${priceListClass.nha_o_mat_duong}`}>
                {!_.isEmpty(priceList.nha_o_mat_duong_arr) ? numberWithCommas(Math.max(...priceList.nha_o_mat_duong_arr)) : "-"}
              </td>
              <td className={`p-3 text-center ${priceListClass.nha_o_mat_duong}`}>
                {nha_o_mat_duong == "empty" ? "-" : numberWithCommas(nha_o_mat_duong)}
              </td>
            </tr>
            <tr>
              <td className="p-3">Giá nhà hẻm/ngõ</td>
              <td className={`p-3 text-center ${priceListClass.nha_o_ngo_hem}`}>
                {!_.isEmpty(priceList.nha_o_ngo_hem_arr) ? numberWithCommas(Math.min(...priceList.nha_o_ngo_hem_arr)) : "-"}
              </td>
              <td className={`p-3 text-center ${priceListClass.nha_o_ngo_hem}`}>
                {!_.isEmpty(priceList.nha_o_ngo_hem_arr) ? numberWithCommas(Math.max(...priceList.nha_o_ngo_hem_arr)) : "-"}
              </td>
              <td className={`p-3 text-center ${priceListClass.nha_o_ngo_hem}`}>
                {nha_o_ngo_hem == "empty" ? "-" : numberWithCommas(nha_o_ngo_hem)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default WardTable;