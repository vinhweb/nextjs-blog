import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout/layout';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import base from './../components/Airtable';

const LoginPage = () => {
  return (
    <div>
      <Layout>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <div className="container px-4 w-96 mx-auto py-52">
          <form className="grid gap-4 gap-y-5">
            <div className="">
              <label className="block text-gray-700 text-sm mb-2" htmlFor="username">
                Tài khoản
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:shadow-outline" name="username" id="username" type="text" placeholder=""/>
            </div>
            <div className="">
              <label className="block text-gray-700 text-sm mb-2" htmlFor="password">
                Mật khẩu
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:shadow-outline" name="password" id="password" type="password" placeholder=""/>
            </div>
            <button type="submit" className="mt-4 whitespace-nowrap cursor-pointer block px-6 py-4 text-sm font-medium leading-normal bg-orange-400 hover:bg-orange-300 text-white rounded transition duration-200">
              Đăng nhập</button>
          </form>
        </div>
      </Layout>
    </div>
  )
}

export default LoginPage
