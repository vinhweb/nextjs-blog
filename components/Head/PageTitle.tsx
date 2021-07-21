import React, { Fragment } from 'react'

const PageTitle = ({title = "Page title", subtitle = ""}) => {
  return (
    <Fragment>
      <h1 className="mt-6 text-3xl mb-4 font-semibold">
        {title}
      </h1>
      {subtitle && (
        <div className="description">
          <h3 className="mb-1">
            {subtitle}
          </h3>
        </div>
      )}
    </Fragment>
  )
}

export default PageTitle
