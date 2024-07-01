/* eslint-disable react-hooks/exhaustive-deps */
import {
  CLIENT_IN_HEADER_AXIOS,
  EUploadFileType,
  LLC_ACCESS_TOKEN,
  MEDIA_PATH_ACTION,
} from '@configs'
import { Upload, UploadProps, message } from 'antd'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { IUploadMediaResponse } from 'src/interfaces/media'
import { SimpleImage } from '../image/SimpleImage'
import { Text } from '../typography'
import ReactPlayer from 'react-player/lazy'
import { LoadingOutlined } from '@ant-design/icons'

const { Dragger } = Upload

export const AppDragger = (
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
    containerClassName,
    required,
    label,
    onLoadEnd,
    initResource,
    errors,
    reset,
    changeLoading,
    allowFileTypes = ['image/png', 'image/jpeg', 'image/jpg'],
    limitFileSize,
    uploadType = EUploadFileType.IMAGE,
    ...restProps
  } = props
  const [uploadingStatus, setUploadingStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [resource, setResource] = useState(initResource)
  let inputContainerClass = 'grid grid-cols-7 gap-3'
  let labelClass = 'text-right mb-0 '

  useEffect(() => {
    setResource(initResource)
  }, [reset, initResource])

  return (
    <>
      <div
        className={`Input w-full ${inputContainerClass} ${
          containerClassName || ''
        }`}
      >
        {label && (
          <label
            htmlFor={label}
            className={`Input__label ${labelClass} inline-flex mr-[1.25rem]  text-dark col-span-2 `}
          >
            {label}
            {required && (
              <span className="required text-[#B91C1C] font-bold"> *</span>
            )}
          </label>
        )}
        <div
          className={`Input__field-container w-full relative ${
            label ? 'col-span-5' : 'col-span-7'
          }`}
        >
          <Dragger
            style={{
              border: errors ? '1px solid #B91C1C' : '',
              borderRadius: errors ? '0.375rem' : '',
            }}
            className="col-span-5 inline-flex items-center"
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
            onChange={(info) => {
              const { status, name, response } = info.file
              if (status === 'uploading') {
                changeLoading && changeLoading(true)
                setLoading(true)
                setUploadingStatus(status)
              } else if (status === 'done') {
                message.success(`Media uploaded success`)
                if (onLoadEnd) onLoadEnd(response?.data)
                setResource(response?.data?.url)
                changeLoading && changeLoading(false)
                setUploadingStatus(status)
                setLoading(false)
              } else if (status === 'error') {
                message.success(`Media uploaded failed.`)
                changeLoading && changeLoading(false)
                setUploadingStatus(status)
                setLoading(false)
              } else if (status === 'removed') {
                changeLoading && changeLoading(false)
                setUploadingStatus(status)
                setLoading(false)
                message.success(`Media uploaded removed.`)
              }
            }}
            beforeUpload={(file) => {
              const isJpgOrPng = allowFileTypes?.includes(file.type)
              const isLimit = file.size / 1024 / 1024 < (limitFileSize || 15)
              if (!isJpgOrPng && uploadType === EUploadFileType.IMAGE) {
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
              return isJpgOrPng && isLimit
            }}
            disabled={uploadingStatus === 'uploading'}
            showUploadList={false}
            {...restProps}
          >
            {/* {resource && uploadingStatus !== EStatusUploadFile.UPLOADING ? (
              uploadType === EUploadFileType.IMAGE ? (
                <SimpleImage source={resource} />
              ) : (
                <ReactPlayer url={resource} />
              )
            ) : uploadingStatus === EStatusUploadFile.UPLOADING ? (
              <LoadingOutlined size={32} color={'blue'} spin />
            ) : (
              <Text>Click or drag file to this area to upload</Text>
            )} */}
            {loading ? (
              <LoadingOutlined size={32} color={'blue'} spin />
            ) : resource ? (
              uploadType === EUploadFileType.IMAGE ? (
                <SimpleImage source={resource} />
              ) : (
                <ReactPlayer url={resource} />
              )
            ) : (
              <Text>Click or drag file to this area to upload</Text>
            )}
          </Dragger>
        </div>
      </div>
      {errors && (
        <div
          className="grid grid-cols-7 w-full "
          style={{
            color: 'rgb(var(--color-danger)',
          }}
        >
          <div className={labelClass + ' col-span-2 min-w-[1px]'}></div>
          <div className="Input__text-error mt-2 text-sm col-span-7 sm:col-span-5">
            {errors}
          </div>
        </div>
      )}
    </>
  )
}
