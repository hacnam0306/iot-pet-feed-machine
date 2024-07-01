import React, { useState } from 'react'
import { EMediaType, IMediaItem } from 'src/interfaces/gallery'
type IVideoPlaceholderProps = {
  item: IMediaItem
  onClick: () => void
  setMediaSelected: React.Dispatch<React.SetStateAction<IMediaItem>>
  setTypeMediaSelected: React.Dispatch<React.SetStateAction<EMediaType>>
}

const VideoPlaceholder = ({
  item,
  onClick,
  setMediaSelected,
  setTypeMediaSelected,
}: IVideoPlaceholderProps) => {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleOnClick = () => {
    setMediaSelected(item)
    setTypeMediaSelected(EMediaType.VIDEO)
    onClick()
  }

  return (
    <div
      className="video-item-container m-2 shadow flex items-center justify-center overflow-hidden"
      style={{ width: 'calc(19.99% - 16px)', height: '250px' }}
      onClick={handleOnClick}
    >
      <video
        onLoadedData={handleLoad}
        autoPlay={true}
        muted
        loop
        className="h-auto max-w-full object-cover"
      >
        <source
          src={item?.baseUrl}
          type="video/mp4"
          className="h-auto max-w-full object-cover"
        />
      </video>
    </div>
  )
}

export default VideoPlaceholder
