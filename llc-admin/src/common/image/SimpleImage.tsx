/* eslint-disable jsx-a11y/alt-text */
import React from 'react'

export const SimpleImage = ({ source }: { source?: string }) => {
  return (
    <div
      style={{
        height: 150,
        alignSelf: 'center',
        display: 'inline-block',
      }}
    >
      <img
        src={source}
        style={{
          height: 150,
          objectFit: 'contain',
        }}
      />
    </div>
  )
}
