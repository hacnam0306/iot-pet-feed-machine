import { UploadOutlined } from '@ant-design/icons'
import { EUploadFileType, VIDEO_FILTER, POST_MEDIA_FILTER } from '@configs'
import { UploadProps, message } from 'antd'
import React, { useState } from 'react'
import { galleryAPI } from 'src/api/gallery'
import { EMediaCategory } from 'src/interfaces/gallery'
import { IUploadMediaResponse } from 'src/interfaces/media'

type Props = {}

const CustomUploadButton = (
  props: UploadProps & {
    containerClassName?: string
    label?: string
    onLoadEnd?: (data: IUploadMediaResponse) => void
    errors?: string
    initResource?: string
    reset?: boolean
    changeLoading?: (loading: boolean) => void
    allowFileTypes?: string[]
    limitFileSize?: number
    uploadType?: EUploadFileType
    uploadCategory?: EMediaCategory
  }
) => {
  const {
    uploadType = EUploadFileType.IMAGE,
    allowFileTypes = [
      'video/mp4',
      'video/webm',
      'video/m4v',
      'video/mov',
      'video/qt',
    ],
    limitFileSize = 500,
    reset,
    changeLoading,
    initResource,
    onLoadEnd,
    errors,
    label,
    uploadCategory,
    name = 'btn-upload',
    id = 'btn-upload',
    ...rest
  } = props

  const [loading, setLoading] = useState(false)
  const [resource, setResource] = useState(initResource)

  const handleChangeMedia = async (e: any) => {
    setLoading(true)
    changeLoading?.(true)
    if (!e.target.files || e.target.files.length === 0) {
      setLoading(false)
      changeLoading?.(false)
      return
    }

    const file = e.target.files[0]
    const isMatchMediaType =
      uploadType === EUploadFileType.IMAGE
        ? POST_MEDIA_FILTER.test(file.type)
        : VIDEO_FILTER.test(file.type)

    const allowedInputType = allowFileTypes
      ?.map((item, index) => item.split('/')[1])
      ?.join('/')
      ?.toUpperCase()

    if (!isMatchMediaType) {
      message.error(`You can only upload ${allowedInputType}file!`)
      return
    }

    const isMatchMediaSize = Number(file.size) / 1024 / 1024 < limitFileSize
    if (!isMatchMediaSize) {
      message.error(`Media file must smaller than ${limitFileSize}MB!`)
      return
    }

    try {
      if (uploadType === EUploadFileType.IMAGE) {
        const response = await galleryAPI.uploadImage(file, uploadCategory)

        if (response.success) {
          message.success(response?.message ?? 'Upload image successfully!')
          setResource(response?.data?.original)
          if (onLoadEnd) {
            onLoadEnd(response?.data)
          }
          setLoading(false)
          changeLoading?.(false)
        }
      } else {
        const response = await galleryAPI.uploadVideo(file, uploadCategory)

        if (response.success) {
          message.success(response?.message ?? 'Upload video successfully!')

          setResource(response?.data?.url)
          if (onLoadEnd) {
            onLoadEnd(response?.data)
          }
          setLoading(false)
          changeLoading?.(false)
        }
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        marginTop: 24,
      }}
    >
      <div
        style={{
          flex: 1,
        }}
      />
      {/* <UploadButton
          allowFileTypes={['video/mp4', 'video/webm', 'video/m4v', 'video/qt']}
          limitFileSize={500}
          changeLoading={setLoading}
          uploadType={EUploadFileType.VIDEO}
          onLoadEnd={(data) => {
            setRource(data?.url ?? '')
            mediaId.current = data?.dataValues?.id
            setIsChange(true)
          }}
          multiple={false}
          label={'Upload'}
        /> */}
      <label
        className="upload-media-btn flex items-center justify-center px-3 py-2 border shadow rounded-lg font-bold cursor-pointer"
        htmlFor={id || name}
      >
        <div className="upload-icon flex items-center justify-center">
          <UploadOutlined />
        </div>
        <div className="upload-text text-center ml-2">Upload</div>
      </label>
      <input
        type="file"
        id={id}
        name={name}
        className="hidden"
        accept={allowFileTypes.join(',')}
        onChange={handleChangeMedia}
      />
    </div>
  )
}

export default CustomUploadButton
