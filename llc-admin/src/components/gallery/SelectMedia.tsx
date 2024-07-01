import React from 'react'

type Props = {
  onClickSelectMedia: () => void
  isNotGrid?: boolean
  buttonClassName?: string
}

const SelectMedia = ({
  onClickSelectMedia,
  isNotGrid,
  buttonClassName,
}: Props) => {
  return (
    <div className="grid grid-cols-7 w-full  mt-3">
      {!isNotGrid ? (
        <div className="placeholder-grid col-span-2">&nbsp;</div>
      ) : (
        <></>
      )}
      <div
        onClick={onClickSelectMedia}
        className={`select-media-gallery ${
          !isNotGrid ? 'col-span-5' : 'col-span-7 text-right'
        } underline cursor-pointer ${buttonClassName ?? ''}`}
      >
        Or select media from gallery
      </div>
    </div>
  )
}

export default SelectMedia
