import React, { useState } from 'react'
import { EMediaType, IMediaItem } from 'src/interfaces/gallery'

type IImagePlaceholderProps = {
  item: IMediaItem
  onClick: () => void
  alt?: string
  setMediaSelected: React.Dispatch<React.SetStateAction<IMediaItem>>
  setTypeMediaSelected: React.Dispatch<React.SetStateAction<EMediaType>>
}

const ImagePlaceholder = ({
  item,
  onClick,
  setMediaSelected,
  setTypeMediaSelected,
}: IImagePlaceholderProps) => {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleOnClick = () => {
    setMediaSelected(item)
    setTypeMediaSelected(EMediaType.IMAGE)
    onClick()
  }

  return (
    <div
      className="image-item-container m-2 shadow flex items-center justify-center  overflow-hidden"
      style={{ width: 'calc(19.99% - 16px)', height: '250px' }}
      onClick={handleOnClick}
    >
      <img
        src={item?.baseUrl}
        alt={item?.path}
        onLoad={handleLoad}
        className="h-auto max-w-full object-cover"
      />
    </div>
  )
}

export default ImagePlaceholder
