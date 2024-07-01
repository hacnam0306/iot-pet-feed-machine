import React from 'react'

const Preview = ({ html }: { html: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: html }}></div>
}

export default Preview
