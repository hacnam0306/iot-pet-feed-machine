import { DeleteOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import {
  CLIENT_IN_HEADER_AXIOS,
  EStatusUploadFile,
  LLC_ACCESS_TOKEN,
  MEDIA_PATH_ACTION,
} from '@configs'
import { message, Modal, UploadProps } from 'antd'
import { UploadFile } from 'antd/es/upload'
import Upload, { RcFile, UploadChangeParam } from 'antd/lib/upload'
import Cookies from 'js-cookie'
import React, { useEffect, useRef, useState } from 'react'
import { IUploadMediaResponse } from 'src/interfaces/media'
import { Button } from '../button'

export const UploadListImage = (
  props: UploadProps & {
    containerClassName?: string
    label?: string
    required?: boolean
    onLoadEnd?: (data: IUploadMediaResponse) => void
    errors?: string
    initResource?: string[]
    reset?: boolean
    changeLoading?: (loading: boolean) => void
    allowFileTypes?: string[]
    limitFileSize?: number
    onRemoveItem?: (index: number) => void
  }
) => {
  const {
    allowFileTypes = ['image/png', 'image/jpeg', 'image/jpg'],
    limitFileSize,
    reset,
    changeLoading,
    initResource,
    onLoadEnd,
    errors,
    label,
    onRemoveItem,
    ...rest
  } = props

  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [listResource, setListResource] = useState<string[]>([])
  const [uploadingStatus, setUploadingStatus] = useState('')
  const listUploadDone = useRef<Record<string, number>>({})

  const getStatusLoading = (id: string) => {
    const listStatus = Object.values(listUploadDone.current)
    const isExistLoading = listStatus.findIndex((i) => i === 1) > -1
    return isExistLoading ? EStatusUploadFile.UPLOADING : EStatusUploadFile.DONE
  }

  useEffect(() => {
    setListResource(initResource ?? [])
  }, [reset, initResource])

  useEffect(() => {}, [listResource])

  const updateList = (newItem: string) => {
    let newList1 = [...listResource]
    const newList = [...newList1, newItem ?? '']
    setListResource(newList)
  }

  const onChange = (info: UploadFile<any>) => {
    const { status, response, uid } = info
    if (status === 'uploading') {
      changeLoading && changeLoading(true)
      listUploadDone.current[uid] = 1
      setUploadingStatus(status)
    } else if (status === 'done') {
      message.success(`Media uploaded success`)
      if (onLoadEnd) onLoadEnd(response?.data)

      updateList(response?.data?.original)

      listUploadDone.current[uid] = 2
      changeLoading &&
        changeLoading(getStatusLoading(uid) === EStatusUploadFile.UPLOADING)
      setUploadingStatus(getStatusLoading(uid))
    } else if (status === 'error') {
      message.error(`Media uploaded failed.`)
      listUploadDone.current[uid] = 0
      changeLoading &&
        changeLoading(getStatusLoading(uid) === EStatusUploadFile.UPLOADING)
      setUploadingStatus(getStatusLoading(uid))
    } else if (status === 'removed') {
      listUploadDone.current[uid] = 0
      changeLoading &&
        changeLoading(getStatusLoading(uid) === EStatusUploadFile.UPLOADING)
      setUploadingStatus(getStatusLoading(uid))
      message.error(`Media uploaded removed.`)
    }
  }

  const handleChange: UploadProps['onChange'] = ({
    fileList: newFileList,
    file,
  }) => {
    setFileList(newFileList)
    newFileList.forEach((i) => {
      listUploadDone.current[i.uid] !== 2 && onChange(i)
    })
  }

  const onClickItem = (index: number) => {
    const prevList = [...listResource]
    prevList.splice(index, 1)
    setFileList((prev) => {
      prev.splice(index, 1)
      return [...prev]
    })
    setListResource([...prevList])
    onRemoveItem && onRemoveItem(index)
  }

  return (
    <>
      <Upload
        action={MEDIA_PATH_ACTION.UPLOAD_IMAGE}
        headers={{
          Authorization: `Bearer ${Cookies.get(LLC_ACCESS_TOKEN)}`,
          Client: CLIENT_IN_HEADER_AXIOS,
        }}
        style={{
          width: 40,
          height: 40,
          backgroundColor: 'GrayText',
        }}
        multiple={true}
        listType="picture"
        showUploadList={false}
        fileList={fileList}
        onChange={handleChange}
        onRemove={(e) => {
          const index = fileList.findIndex((i) => i.uid === e.uid)
          setFileList((prev) => {
            prev.splice(index, 1)
            return [...prev]
          })
        }}
        beforeUpload={(file, fileList) => {
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
            message.error(`Image must smaller than ${limitFileSize}MB!`)
          }
          return isContainFileType && isLimit
        }}
        {...rest}
      >
        <Button
          disabled={uploadingStatus === EStatusUploadFile.UPLOADING}
          loading={uploadingStatus === EStatusUploadFile.UPLOADING}
          icon={<UploadOutlined />}
        >
          {'Upload'}
        </Button>
      </Upload>
      <div className="flex flex-row gap-3 mt-4 w-full">
        {listResource.map((src, index) => (
          <div
            key={src}
            className="w-[40px] h-[40px] items-center flex justify-center relative rounded border-[1px] border-slate-200"
          >
            <img
              src={src}
              className="w-[40px] h-[40px] object-contain"
              alt="src"
            />
            <button
              onClick={(e) => {
                onClickItem(index)
                e.preventDefault()
              }}
              className="absolute top-0 left-0 w-[40px] flex items-center justify-center h-[40px] opacity-0 hover:opacity-10  bg-black z-10 "
            >
              <DeleteOutlined color="white" />
            </button>
          </div>
        ))}
      </div>
      {errors && (
        <div
          className="grid grid-cols-7 w-full "
          style={{
            color: 'rgb(var(--color-danger)',
          }}
        >
          <div className="Input__text-error mt-2 text-sm col-span-7 sm:col-span-5">
            {errors}
          </div>
        </div>
      )}
    </>
  )
}
