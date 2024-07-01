import { UploadOutlined } from '@ant-design/icons'
import {
  CLIENT_IN_HEADER_AXIOS,
  EUploadFileType,
  LLC_ACCESS_TOKEN,
  MEDIA_PATH_ACTION,
} from '@configs'
import { message, Upload, UploadProps } from 'antd'
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { IUploadMediaResponse } from 'src/interfaces/media'
import { Button } from '../button'

export const UploadButton = (
  props: UploadProps & {
    containerClassName?: string
    label?: string
    required?: boolean
    onLoadEnd?: (data: IUploadMediaResponse) => void
    errors?: string
    initResource?: string
    reset?: boolean
    changeLoading?: (loading: boolean) => void
    allowFileTypes?: string[]
    limitFileSize?: number
    uploadType?: EUploadFileType
  }
) => {
  const {
    uploadType,
    allowFileTypes,
    limitFileSize,
    reset,
    changeLoading,
    initResource,
    onLoadEnd,
    errors,
    label,
    ...rest
  } = props

  const [uploadingStatus, setUploadingStatus] = useState('')
  const [resource, setResource] = useState(initResource)

  return (
    <Upload
      name="file"
      action={
        uploadType === EUploadFileType.IMAGE
          ? MEDIA_PATH_ACTION.UPLOAD_IMAGE
          : MEDIA_PATH_ACTION.UPLOADVIDEO
      }
      headers={{
        Authorization: `Bearer ${Cookies.get(LLC_ACCESS_TOKEN)}`,
        Client: CLIENT_IN_HEADER_AXIOS,
      }}
      multiple={false}
      onChange={(info) => {
        const { status, name, response } = info.file
        if (status === 'uploading') {
          changeLoading && changeLoading(true)
          setUploadingStatus(status)
        } else if (status === 'done') {
          message.success(`Media uploaded success`)
          if (onLoadEnd) onLoadEnd(response?.data)
          setResource(response?.data?.url)
          changeLoading && changeLoading(false)
          setUploadingStatus(status)
        } else if (status === 'error') {
          message.error(`Media uploaded failed.`)
          changeLoading && changeLoading(false)
          setUploadingStatus(status)
        } else if (status === 'removed') {
          changeLoading && changeLoading(false)
          setUploadingStatus(status)
          message.error(`Media uploaded removed.`)
        }
      }}
      beforeUpload={(file) => {
        const isContainFileType = allowFileTypes
          ? allowFileTypes?.includes(file.type)
          : true
        const isLimit = file.size / 1024 / 1024 < (limitFileSize || 15)
        if (!isContainFileType) {
          const listFileType = allowFileTypes
            ?.map((item) => item.split('/')[1].toUpperCase())
            .join('/')
          message.error(`You can only upload ${listFileType} file!`)
        } else if (!isLimit) {
          message.error(
            `${
              uploadType === EUploadFileType.IMAGE ? 'Image' : 'Video'
            } must smaller than ${limitFileSize}MB!`
          )
        }
        return isContainFileType && isLimit
      }}
      disabled={uploadingStatus === 'uploading'}
      showUploadList={false}
      {...rest}
    >
      <Button icon={<UploadOutlined />}>{label}</Button>
    </Upload>
  )
}
