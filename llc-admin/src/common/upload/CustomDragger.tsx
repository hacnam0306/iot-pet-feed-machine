import { LoadingOutlined } from '@ant-design/icons'
import { EUploadFileType } from '@configs'
import { UploadProps, message, Upload, UploadFile } from 'antd'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { IUploadMediaResponse } from 'src/interfaces/media'
import { SimpleImage } from '../image/SimpleImage'
import { Text } from '../typography'
import { galleryAPI } from 'src/api/gallery'
import { EMediaCategory } from 'src/interfaces/gallery'
import { useMediaQuery } from '@utils'
import ReactAudioPlayer from 'react-audio-player'
import { lessonAPI } from '@api'
import { AxiosRequestConfig } from 'axios'
import { RcFile } from 'antd/es/upload'

export const CustomDragger = (
  props: UploadProps & {
    containerClassName?: string
    label?: string
    placeholder?: string
    required?: boolean
    onLoadEnd?: (data: IUploadMediaResponse) => void
    onSetDuration?: (duration: number) => void
    errors?: string
    initResource?: string
    reset?: boolean
    changeLoading?: (loading: boolean) => void
    allowFileTypes?: string[]
    limitFileSize?: number
    uploadType?: EUploadFileType
    uploadCategory?: EMediaCategory
    labelClassName?: string
    alignment?: 'row' | 'col'
    note?: string
  }
) => {
  const {
    containerClassName,
    required,
    label,
    placeholder = 'Click to upload media file',
    onLoadEnd,
    initResource,
    errors,
    reset,
    changeLoading,
    allowFileTypes = ['image/png', 'image/jpeg', 'image/jpg'],
    limitFileSize = 20,
    uploadType = EUploadFileType.IMAGE,
    uploadCategory,
    name = 'avatar',
    id = 'avatar',
    labelClassName,
    alignment = 'row',
    disabled,
    note,
    onSetDuration,
    ...restProps
  } = props
  const [loading, setLoading] = useState(false)
  const [resource, setResource] = useState(initResource)
  const isSMScreen = useMediaQuery(`(max-width:640px)`)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [duration, setDuration] = useState(null)
  const videoRef = React.createRef<any>()
  const audioRef = React.createRef<any>()

  const handleLoadedMetadata = () => {
    setDuration(videoRef?.current?.duration || 0)
    onSetDuration && onSetDuration(videoRef?.current?.duration || 0)
  }
  const handleLoadedMetadataAudio = () => {
    setDuration(audioRef?.current?.duration || 0)
    onSetDuration && onSetDuration(audioRef?.current?.duration || 0)
  }
  let inputContainerClass = 'grid grid-cols-7 gap-3'
  let labelClass = 'text-right mb-0 '
  let localAlignment = isSMScreen ? 'col' : alignment

  if (localAlignment === 'col') {
    inputContainerClass = 'flex items-start flex-col '
    labelClass = 'text-left mb-2 '
  }
  const handleChangeMedia = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    changeLoading?.(true)
    if (!e.target.files || e.target.files.length === 0) {
      setLoading(false)
      changeLoading?.(false)
      return
    }

    const file = e.target.files[0]

    const isMatchMediaType = allowFileTypes.includes(file.type)

    const allowedInputType = allowFileTypes
      ?.map((item, index) => item.split('/')[1])
      ?.join('/')
      ?.toUpperCase()

    if (!isMatchMediaType) {
      message.error(`You can only upload ${allowedInputType}file!`)
      setLoading(false)
      changeLoading?.(false)
      return
    }

    const isMatchMediaSize = Number(file.size) / 1024 / 1024 < limitFileSize
    if (!isMatchMediaSize) {
      message.error(`Media file must smaller than ${limitFileSize}MB!`)
      setLoading(false)
      changeLoading?.(false)
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
          message.success(response?.message ?? 'Upload image successfully!')

          setResource(response?.data?.url)
          if (onLoadEnd) {
            onLoadEnd(response?.data)
          }
          setLoading(false)
          changeLoading?.(false)
        }
      }
    } catch (error: any) {
      setLoading(false)

      console.log(error)
      message.error(error?.message ?? 'Upload file failed!')
    }
  }

  const customRequest: UploadProps['customRequest'] = async (options) => {
    const { onSuccess, onProgress } = options
    setLoading(true)

    const file = options.file as RcFile

    const config: AxiosRequestConfig<any> = {
      headers: { 'content-type': 'multipart/form-data' },
    }

    try {
      const res = await lessonAPI.uploadMedia(file, config)
      if (onSuccess) {
        onSuccess(res.data)
      }
      if (onLoadEnd) {
        onLoadEnd(res?.data?.dataValues as any)
      }
      setResource(res.data?.url || '')
      message.success(res.data?.message)
    } catch (err) {
      console.error('server error: ', err)
    } finally {
      setLoading(false)
    }
  }
  const handleChange: UploadProps['onChange'] = (info) => {
    let newFileList = [...info.fileList]
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url
      }
      return file
    })

    setFileList(newFileList)
  }
  useEffect(() => {
    setResource(initResource)
  }, [reset, initResource, uploadType])
  return (
    <div key={id}>
      <div
        className={`Input w-full ${inputContainerClass} ${
          containerClassName || ''
        }`}
      >
        {label && (
          <label
            htmlFor={label}
            className={`Input__label ${labelClass} inline-flex mr-[1.25rem] capitalize  text-dark col-span-2 `}
          >
            {label}
            {required && (
              <span className="required text-[#B91C1C] font-bold"> *</span>
            )}
          </label>
        )}

        <div
          className={`Input__field-container ${labelClassName} relative ${
            label ? 'col-span-5' : 'col-span-7'
          }`}
        >
          <label
            className={`icon-change-avatar cursor-pointer border-[1.5px] border-dashed h-[200px] w-full p-5 col-span-5 inline-flex items-center justify-center rounded-lg ${
              disabled ? '' : 'hover:border-primary'
            } `}
            htmlFor={name}
            style={{
              border: errors ? '1px solid #B91C1C' : '',
              borderRadius: errors ? '0.375rem' : '',
            }}
          >
            {uploadType !== EUploadFileType.AUDIO ? (
              loading ? (
                <LoadingOutlined size={32} color={'blue'} spin />
              ) : resource ? (
                uploadType === EUploadFileType.IMAGE ? (
                  <SimpleImage source={resource} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <video
                      src={resource}
                      loop
                      ref={videoRef}
                      onLoadedMetadata={handleLoadedMetadata}
                      controls={!!resource}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                      }}
                    />
                  </div>
                )
              ) : (
                <Text>Click to upload file!</Text>
              )
            ) : (
              <></>
            )}
            {uploadType === EUploadFileType.AUDIO && (
              <Upload
                accept=".mp3"
                onChange={handleChange}
                id={id}
                name={name}
                showUploadList={false}
                customRequest={customRequest}
              >
                {loading ? (
                  <LoadingOutlined size={32} color={'blue'} spin />
                ) : resource ? (
                  <audio
                    controls
                    src={resource}
                    ref={audioRef}
                    onLoadedMetadata={handleLoadedMetadataAudio}
                  />
                ) : (
                  <Text>Click to upload file!</Text>
                )}
              </Upload>
            )}
          </label>

          {uploadType !== EUploadFileType.AUDIO && (
            <input
              type="file"
              id={id}
              name={name}
              className="hidden w-3/4"
              accept={allowFileTypes.join(',')}
              onChange={handleChangeMedia}
              disabled={disabled}
            />
          )}
        </div>
      </div>
      {errors && (
        <div className="grid grid-cols-7 w-full ">
          {label && localAlignment === 'row' && (
            <div className={labelClass + ' col-span-2 min-w-[1px]'}></div>
          )}
          <div
            style={{
              color: 'rgb(var(--color-danger)',
            }}
            className={`Input__text-error mt-2 text-sm col-span-7 ${
              alignment === 'col' ? 'sm:col-span-7 text-left' : 'sm:col-span-5'
            }`}
          >
            {errors}
          </div>
        </div>
      )}
    </div>
  )
}
