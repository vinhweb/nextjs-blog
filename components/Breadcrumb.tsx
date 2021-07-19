import React from 'react'

const Breadcrumb = (props) => {
  return (
    <ul className="flex text-indigo-500 text-sm ">
      {props.children}
    </ul>
  )
}

export default Breadcrumb
