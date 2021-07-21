import Link from 'next/link';
import React from 'react'
import { stringify } from 'remark'

const Breadcrumb = ({List}) => {
  const Breads: {name: string, link: string}[] = List;
  return (
    <ul className="flex text-indigo-500 text-sm ">
      {Breads.map((item, index) => (
        <li key={index} className="inline-flex items-center">
          {item.link ? (
            <>
            <Link href={item.link}>{item.name}</Link>
            <svg className="h-4 w-auto text-gray-200" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            </>
          ) : (
            <a className="text-teal-400">{item.name}</a>
          )}
        </li>
      )
      )}
    </ul>
  )
}

export default Breadcrumb
