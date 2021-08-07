import _ from 'lodash';
import React from 'react'
import { useState } from 'react';
import numberWithCommas from '../../utils/numberWithCommas'
import Link from 'next/dist/client/link';

const AreaTable = ({wardList}) => {


  return (
    <section className="flex space-x-5 ">
      <div className="w-full mt-10 overflow-hidden border border-gray-200 rounded">
        <table className="table-fixed w-full text-sm divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="text-left p-3 w-3/12">Giá đất</th>
              <th className="p-3" style={{width: '14%'}}>Đất phổ biến</th>
              <th className="p-3" style={{width: '14%'}}>Đất mặt tiền</th>
              <th className="p-3" style={{width: '14%'}}>Đất ngõ hẻm</th>
              <th className="p-3" style={{width: '14%'}}>Nhà phổ biến</th>
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
                <td className={`p-3 text-center ${item.dat_arr.length <= 2 ? "text-red-600" : (item.dat_arr.length > 2 && item.dat_arr.length <= 4 && "text-orange-400")}`}>
                  {item.dat == "empty" ? "-" : numberWithCommas(item.dat)}</td>

                <td className={`p-3 text-center ${item.dat_mat_duong_arr.length <= 2 ? "text-red-600" : (item.dat_mat_duong_arr.length > 2 && item.dat_mat_duong_arr.length <= 4 && "text-orange-400")}`}>
                  {item.dat_mat_duong == "empty" ? "-" : numberWithCommas(item.dat_mat_duong)}</td>

                <td className={`p-3 text-center ${item.dat_ngo_hem_arr.length <= 2 ? "text-red-600" : (item.dat_ngo_hem_arr.length > 2 && item.dat_ngo_hem_arr.length <= 4 && "text-orange-400")}`}>
                  {item.dat_ngo_hem == "empty" ? "-" : numberWithCommas(item.dat_ngo_hem)}</td>

                <td className={`p-3 text-center ${item.nha_o_arr.length <= 2 ? "text-red-600" : (item.nha_o_arr.length > 2 && item.nha_o_arr.length <= 4 && "text-orange-400")}`}>
                  {item.nha_o == "empty" ? "-" : numberWithCommas(item.nha_o)}</td>

                <td className={`p-3 text-center ${item.nha_o_mat_duong_arr.length <= 2 ? "text-red-600" : (item.nha_o_mat_duong_arr.length > 2 && item.nha_o_mat_duong_arr.length <= 4 && "text-orange-400")}`}>

                  {item.nha_o_mat_duong == "empty" ? "-" : numberWithCommas(item.nha_o_mat_duong)}</td>
                <td className={`p-3 text-center ${item.nha_o_ngo_hem_arr.length <= 2 ? "text-red-600" : (item.nha_o_ngo_hem_arr.length > 2 && item.nha_o_ngo_hem_arr.length <= 4 && "text-orange-400")}`}>
                  {item.nha_o_ngo_hem == "empty" ? "-" : numberWithCommas(item.nha_o_ngo_hem)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default AreaTable;