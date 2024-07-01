import React from 'react'
import { CloseCircleOutlined } from '@ant-design/icons'
import { message } from 'antd'
import { VIDEO_FILTER, POST_MEDIA_FILTER } from 'src/configs'

interface MultipleImageUploaderProps {
  images: any[]
  setImages: React.Dispatch<React.SetStateAction<any[]>>
  onRemoveImage: (index: number) => void
  uploadId: string
}

const MultipleUpload: React.FC<MultipleImageUploaderProps> = ({
  images,
  setImages,
  onRemoveImage,
  uploadId,
}) => {
  const handleChangeMultipleMedia = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) return
    let localImages: any = []

    if (e.target.files.length + images.length > 6) {
      message.error(`You can only upload 6 files`)
      return
    }
    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i]
      const isMatchMediaSize = Number(file.size) / 1024 / 1024 < 10
      const isMatchMediaType = POST_MEDIA_FILTER.test(file.type)

      const allowedInputType = ['mp4', 'mpeg', 'jpg', 'jpeg', 'png', 'gif']
        .join('/')
        .toUpperCase()

      if (!isMatchMediaType) {
        message.error(`You can only upload ${allowedInputType}file!`)
        break
      }

      if (!isMatchMediaSize) {
        message.error(`Media file must smaller than ${10}MB!`)
        break
      }
      localImages.push({ file, src: URL.createObjectURL(file) })
    }

    setImages((prev: any) => [...prev, ...localImages])
  }

  return (
    <div className="mt-[16px]">
      {!!images?.length && (
        <div className="flex items-center justify-start gap-[16px] flex-wrap mb-[12px]">
          {images?.map((image, index) => (
            <div className="border rounded-[8px] relative" key={index}>
              <div
                className="flex items-center justify-center absolute right-[-10px] top-[-10px] cursor-pointer z-10 bg-white rounded-full"
                onClick={() => {
                  onRemoveImage(index)
                }}
              >
                <CloseCircleOutlined className="text-[20px]" />
              </div>
              <img
                src={image.src}
                alt="image"
                className="w-[200px] h-[200px] object-contain rounded-[8px]"
              />
            </div>
          ))}
        </div>
      )}
      <label
        className={`bg-main border-main text-white rounded-[6px] text-[14px] font-medium py-[8px] px-[12px] min-w-[96px] inline-block h-fit cursor-pointer hover:opacity-80 transition-all duration-300 text-center ${
          images.length === 6 ? 'opacity-80' : 'opacity-100'
        }`}
        htmlFor={uploadId}
      >
        Upload
      </label>
      <input
        type="file"
        className="hidden"
        id={uploadId}
        multiple={true}
        disabled={images.length === 6}
        onChange={handleChangeMultipleMedia}
      />
    </div>
  )
}

export default MultipleUpload
