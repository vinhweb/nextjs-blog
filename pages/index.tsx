import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { SearchIcon } from '@heroicons/react/solid'
import { useState } from 'react'

export default function Home(props) {
  const [searchTerm, setSearchTerm] = useState('');

  function searchArea(event){
    event.preventDefault();
    window.location.href="/phan-tich-khu-vuc/"+searchTerm
  }
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <div className="container px-4 mx-auto py-12">
        <div className="flex flex-wrap items-center -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-6 md:mb-0">
            <h2 className="mt-8 mb-6 lg:mb-12 text-4xl lg:text-5xl font-semibold">Xem giá <br /> Bất động sản</h2>
            <div className="max-w-lg mb-6 lg:mb-12">
              <p className="text-xl text-gray-500">Xem giá bất động sản với hệ thống dữ liệu bản đồ linh hoạt, chính xác và đầy đủ nhất Việt Nam bằng ứng dụng công nghệ 4.0</p>
            </div>
            <div>
              <form className="" onSubmit={searchArea}>
                <div className="p-4 bg-white flex items-center rounded  shadow-lg">
                  <input className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none" 
                        required
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        id="search" type="text" placeholder="Nhập nơi bạn muốn xem giá..."/>
                  <button type="submit" className="whitespace-nowrap cursor-pointer block px-6 py-4 text-sm font-medium leading-normal bg-orange-400 hover:bg-orange-300 text-white rounded transition duration-200" >Tìm kiếm</button>
                </div>
              </form>
            </div>
          </div>
          <div className="relative w-full md:w-1/2 px-4">
            <img className="hidden lg:block lg:absolute top-0 right-0 z-10 lg:mt-28" src="zeus-assets/icons/dots/yellow-dot-right-shield.svg" alt=""/>
            <img className="relative" src="zeus-assets/images/z-picture.png" alt=""/>
            <img className="hidden lg:block lg:absolute bottom-0 lg:left-0 lg:ml-6 lg:mb-20" src="zeus-assets/icons/dots/blue-dot-left-bars.svg" alt=""/>
          </div>
        </div>
      </div>
    </Layout>
  )
}
