import React from 'react'
import { useEffect, useState } from 'react'
import Popup from './Popup'
import base from '../Airtable';
import axios from "axios";
import ListboxCustom from '../ListboxCustom'
import StoreNotifications from '../Notifications/StoreNotifications';

const GuestAddPost = ({visible = false, setVisible}) => {
  const PhapLyList = [
    { name: 'Sổ hồng' },
    { name: 'Sổ hồng chung' },
    { name: 'Giấy tay' },
    { name: 'Đất quy hoạch' },
  ]
  const [selectedPhapLy, setSelectedPhapLy] = useState(PhapLyList[0])

  const LoaiBDSList = [
    { name: 'Đất' },
    { name: 'Nhà' },
    { name: 'Văn phòng' },
    { name: 'Căn hộ' },
  ]
  const [selectedLoaiBDS, setSelectedLoaiBDS] = useState(LoaiBDSList[0])

  const [selectedFile, setselectedFile] = useState(null)

  const onFileChange = (event) => {
    setselectedFile(event.target.files[0]);
  };
  
  const onSubmit = (e)=>{
    e.preventDefault();
    const formData = {
      phone: `${e.target.phone.value}`,
      phap_ly: `${selectedPhapLy.name}`,
      loai_bds: `${selectedLoaiBDS.name}`,
      dien_tich_dat: `${e.target.dien_tich_dat.value}`,
      tong_dien_tich: `${e.target.tong_dien_tich.value}`,
      gia_ban: `${e.target.gia_ban.value}`,
      email: `${e.target.email.value}`,
      chi_tiet: `${e.target.chi_tiet.value}`,
    }

    base('guest').create([
      {
        "fields": formData
      },
    ], function(err, records) {
      if (err) {
        StoreNotifications({title: 'Lỗi', message: 'Đã có lỗi xảy ra', type: 'danger'})
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        console.log(record.getId());
      });
    });

    StoreNotifications({title: 'Thành công', message: 'Cảm ơn anh/chị đã cung cấp thông tin BĐS, ThamDinhGiaAV sẽ xem xét và duyệt sớm nhất có thể', type: 'success'})

    setTimeout(function(){ 
      setVisible(!visible)
    }, 500);
  }

  return (
    <div>
      {visible && (

      <Popup size={"max-w-3xl"} visible={visible} setVisible={setVisible}>
        <form onSubmit={onSubmit} className="align-bottom rounded-lg text-left overflow-hidden transform transition-all shadow-xl" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="mb-5 text-2xl font-semibold">Đăng tin</h3>
            <div className="grid grid-cols-4 gap-4 gap-y-5">
              <div className="col-span-2">
                <label className="block text-gray-700 text-sm mb-2" htmlFor="phaply">
                  Pháp lý
                </label>
                <ListboxCustom list={PhapLyList} setSelected={setSelectedPhapLy} selected={selectedPhapLy} />
              </div>
              <div className="col-span-2">
                <label className="block text-gray-700 text-sm mb-2" htmlFor="loaibds">
                  Loại BĐS
                </label>
                <ListboxCustom list={LoaiBDSList} setSelected={setSelectedLoaiBDS} selected={selectedLoaiBDS} />
              </div>
              <div className="col-span-2">
                <label className="block text-gray-700 text-sm mb-2" htmlFor="dien_tich_dat">
                  Diện tích đất/ sử dụng riêng (m2)
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:shadow-outline" name="dien_tich_dat" id="dien_tich_dat" type="number" placeholder=""/>
              </div>
              <div className="col-span-2">
                <label className="block text-gray-700 text-sm mb-2" htmlFor="tong_dien_tich">
                  Tổng Diện tích sử dụng (m2)
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:shadow-outline" name="tong_dien_tich" id="tong_dien_tich" type="number" placeholder=""/>
              </div>
              <div className="col-span-2">
                <label className="block text-gray-700 text-sm mb-2" htmlFor="gia_ban">
                  Giá bán
                </label>
                <input required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:shadow-outline" name="gia_ban" id="gia_ban" type="number" placeholder=""/>
              </div>
              <div className="col-span-2"></div>
              <div className="col-span-2">
                <label className="block text-gray-700 text-sm mb-2" htmlFor="phone">
                  SĐT
                </label>
                <input required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:shadow-outline" name="phone" id="phone" type="number" placeholder=""/>
              </div>
              <div className="col-span-2">
                <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
                  Email
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:shadow-outline" name="email" id="email" type="email" placeholder=""/>
              </div>
              <div className="col-span-4">
                <label className="block text-gray-700 text-sm mb-2" htmlFor="chi_tiet">
                  Chi tiết BĐS
                </label>
                <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:shadow-outline" name="chi_tiet" id="chi_tiet" rows="3" placeholder=""></textarea>
              </div>


              {/* <div className="mb-4">
                <input type="file" onChange={onFileChange} />
              </div> */}
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 sm:ml-3 sm:w-auto sm:text-sm">
              Đăng tin
            </button>
            <button onClick={()=>setVisible(!visible)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white  text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Hủy
            </button>
          </div>
        </form>
      </Popup>
    
      )}
    </div>
  )
}

export default GuestAddPost
