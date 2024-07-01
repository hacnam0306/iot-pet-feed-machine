import { enumTableTitleSelectMediaTab } from '@configs'
import { useAppDispatch, useAppSelector } from '@redux'
import {
  Checkbox,
  Divider,
  Empty,
  PaginationProps,
  Skeleton,
  message,
} from 'antd'
import { Fragment, SetStateAction, useEffect, useMemo, useState } from 'react'
import { Button, SharedTable } from 'src/common'
import { EMediaCategory, EMediaType, IMediaItem } from 'src/interfaces/gallery'
import {
  getImageMediaAction,
  getVideoMediaAction,
} from 'src/redux/actions/gallery'
import { StyledPagination } from '../pagination/StyledPagination'
import ImagePlaceholder from './ImagePlaceholder'
import PreviewMediaModal from './PreviewMediaModal'
import VideoPlaceholder from './VideoPlaceholder'

type Props = {
  activeTab: EMediaCategory
  isModal?: boolean
  mediaType?: EMediaType
  onSelectMedia?: (data: IMediaItem) => void
  onCloseSelectMediaModal?: () => void
}

const GalleryTabItem = ({
  activeTab,
  isModal,
  mediaType = EMediaType.ALL,
  onSelectMedia,
  onCloseSelectMediaModal,
}: Props) => {
  const [isOpenPreviewMediaModal, setIsOpenPreviewMediaModal] = useState(false)
  const [typeMediaSelected, setTypeMediaSelected] = useState<EMediaType>(
    EMediaType.VIDEO
  )
  const [mediaSelected, setMediaSelected] = useState<IMediaItem>({
    id: 222,
    userId: 343,
    bucket: 'filyou-dev',
    path: '1689321978534-2023-07-14 11.02.02 AM_sprint_review.jpg',
    name: '3c2d2d33a7ce5b9b6f2ce27510f7bbb6-2023-09-13-sLd.png',
    type: 'image/jpeg',
    category: 'HOME_PAGE',
    createdAt: '2023-07-14T08:06:19.880Z',
    updatedAt: '2023-07-14T08:06:19.880Z',
    baseUrl:
      'https://s3.amazonaws.com//filyou-dev/1689321978534-2023-07-14 11.02.02 AM_sprint_review.jpg',
    signedUrl:
      'https://s3.amazonaws.com/filyou-dev/1689321978534-2023-07-14%2011.02.02%20AM_sprint_review.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2GOFYKOUFNGPXVP2%2F20230830%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230830T034547Z&X-Amz-Expires=900&X-Amz-Signature=b91571537de0813e55d8558a36689af56ace7666f6320cd1184c0a14e922ba17&X-Amz-SignedHeaders=host',
  })

  const [videosPage, setVideosPage] = useState(1)
  const [imagesPage, setImagesPage] = useState(1)

  const [selectedMedia, setSelectedMedia] = useState<IMediaItem>(
    {} as IMediaItem
  )
  // const [searchValue, setSearchValue] = useState<string | null>(null)
  // const [isSearching, setIsSearching] = useState(false)
  // const debouncedValue = useDebounce<string | null>(searchValue, 800)

  const dispatch = useAppDispatch()

  const getVideosActionLoading = useAppSelector(
    (state) => state.gallery?.loadings?.GET_VIDEO_MEDIA_ACTION_LOADING
  )

  const getImagesActionLoading = useAppSelector(
    (state) => state.gallery?.loadings?.GET_IMAGE_MEDIA_ACTION_LOADING
  )

  const videos = useAppSelector((state) => state.gallery?.videos)
  const totalVideos = useAppSelector((state) => state.gallery?.totalVideos)

  // ------
  const images = useAppSelector((state) => state.gallery?.images)
  const totalImages = useAppSelector((state) => state.gallery?.totalImages)

  const onClosePreviewMediaModal = () => {
    setIsOpenPreviewMediaModal(false)
  }

  const onOpenPreviewMediaModal = () => {
    setIsOpenPreviewMediaModal(true)
  }

  const onChangeVideoPage: PaginationProps['onChange'] = (page) => {
    setVideosPage(page)
  }

  const onChangeImagePage: PaginationProps['onChange'] = (page) => {
    setImagesPage(page)
  }

  const getMoreVideo = async () => {
    try {
      const response = await dispatch(
        getVideoMediaAction({
          params: {
            category: activeTab,
            page: videosPage,
            limit: 10,
            // search:
            //   debouncedValue !== null && debouncedValue.trim()
            //     ? debouncedValue.trim()
            //     : undefined,
          },
          category: activeTab,
        })
      ).unwrap()
    } catch (error: any) {
      console.log(error)
    }
  }

  const getMoreImage = async () => {
    try {
      const response = await dispatch(
        getImageMediaAction({
          params: {
            category: activeTab,
            page: imagesPage,
            limit: 10,
          },
          category: activeTab,
        })
      ).unwrap()
    } catch (error: any) {
      console.log(error)
    }
  }

  // END OF LOGIN AND FUNCTION FOR GALLERY CONTENT <111>

  // ------------<>------------

  // START LOGIN AND FUNCTION FOR TABLE SELECT MEDIA

  const columns = [
    {
      width: '85%',
      title: enumTableTitleSelectMediaTab.NAME,
      dataIndex: 'name',
      key: 'id',
      render: (_: any, record: any) => (
        <div className="flex space-x-4 justify-start items-center">
          <div className="rowThumbnail">
            {mediaType === EMediaType.IMAGE ? (
              <div className="w-[70px] h-[70px] flex items-center justify-center shadow overflow-hidden">
                <img
                  src={record?.baseUrl}
                  alt={record?.path}
                  className="max-h-full object-contain"
                />
              </div>
            ) : (
              <div className="w-[70px] h-[70px] flex items-center justify-center shadow overflow-hidden">
                <video
                  src={record?.baseUrl}
                  autoPlay={false}
                  muted
                  loop
                  controls={false}
                  className="object-contain"
                />
              </div>
            )}
          </div>
          <div className="rowName">{record?.name ?? record?.path}</div>
        </div>
      ),
      ellipsis: true,
      align: 'center',
    },
    {
      width: '15%',
      title: enumTableTitleSelectMediaTab.PLACE_HOLDER,
      dataIndex: 'id',
      key: 'id',
      ellipsis: true,
      align: 'center',
      render: (id: number, record: any) => {
        return (
          <div className="flex items-center justify-center ">
            <Checkbox
              onChange={(e) => {
                id === selectedMedia?.id
                  ? setSelectedMedia({} as IMediaItem)
                  : setSelectedMedia(record)
              }}
              checked={id === selectedMedia?.id}
            ></Checkbox>
          </div>
        )
      },
    },
  ]

  const sourceTable = useMemo(() => {
    if (mediaType === EMediaType.VIDEO) {
      return videos
    } else if (mediaType === EMediaType.IMAGE) {
      return images
    }
  }, [images, mediaType, videos])

  const isLoadingTable = useMemo(() => {
    if (mediaType === EMediaType.VIDEO) {
      return getVideosActionLoading
    } else if (mediaType === EMediaType.IMAGE) {
      return getImagesActionLoading
    }
  }, [getImagesActionLoading, getVideosActionLoading, mediaType])

  const totalData = useMemo(() => {
    if (mediaType === EMediaType.VIDEO) {
      return totalVideos
    } else if (mediaType === EMediaType.IMAGE) {
      return totalImages
    }
  }, [mediaType, totalImages, totalVideos])

  const currentPage = useMemo(() => {
    if (mediaType === EMediaType.VIDEO) {
      return videosPage
    } else if (mediaType === EMediaType.IMAGE) {
      return imagesPage
    }
  }, [imagesPage, mediaType, videosPage])

  const onClickCancel = () => {
    setSelectedMedia((pre) => ({} as IMediaItem))
    onCloseSelectMediaModal && onCloseSelectMediaModal()
  }

  // END LOGIN AND FUNCTION FOR TABLE SELECT MEDIA

  // useEffect of <111>
  useEffect(() => {
    try {
      if (
        (mediaType === EMediaType.VIDEO || mediaType === EMediaType.ALL) &&
        activeTab === EMediaCategory.HOME_PAGE
      ) {
        getMoreVideo()
      }
    } catch (error) {
      console.log('error', error)
    }
  }, [videosPage])

  // useEffect of <111>
  useEffect(() => {
    try {
      if (mediaType === EMediaType.IMAGE || mediaType === EMediaType.ALL) {
        getMoreImage()
      }
    } catch (error) {
      console.log('error', error)
    }
  }, [imagesPage])

  return (
    <Fragment>
      {!isModal ? (
        <>
          <div
            className={`gallery-screen-item pt-5 p-2 bg-[white] overflow-auto `}
          >
            {(mediaType === EMediaType.VIDEO || mediaType === EMediaType.ALL) &&
            activeTab === EMediaCategory.HOME_PAGE ? (
              <>
                <div className="gallery-video w-full">
                  <div className="gallery-video-label font-bold mb-2 ml-5">
                    Video
                  </div>
                  {getVideosActionLoading ? (
                    <>
                      <Skeleton
                        paragraph={{ rows: 15 }}
                        style={{
                          width: '100%',
                        }}
                      />
                    </>
                  ) : (
                    <>
                      {videos && videos?.length > 0 ? (
                        <>
                          <div className="gallery-video-container flex flex-wrap items-center justify-start">
                            {videos &&
                              videos?.map((video, index) => {
                                return (
                                  <VideoPlaceholder
                                    key={video?.id}
                                    item={video}
                                    onClick={onOpenPreviewMediaModal}
                                    setMediaSelected={setMediaSelected}
                                    setTypeMediaSelected={setTypeMediaSelected}
                                  />
                                )
                              })}
                          </div>
                        </>
                      ) : (
                        <>
                          <Empty description="no data" />
                        </>
                      )}
                    </>
                  )}
                  {/* Pagination for videos */}
                  <div className="flex justify-end mt-5">
                    <StyledPagination
                      current={videosPage}
                      onChange={onChangeVideoPage}
                      total={totalVideos}
                      showSizeChanger={false}
                    />
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}

            {/* <------------- Divider -------------> */}
            {!(videos && videos?.length > 0) ||
              (mediaType === EMediaType.ALL &&
                activeTab === EMediaCategory.HOME_PAGE && <Divider />)}
            {/* <------------- Divider -------------> */}

            {mediaType === EMediaType.IMAGE || mediaType === EMediaType.ALL ? (
              <>
                <div className="gallery-image w-full">
                  <div className="gallery-image-label font-bold mb-2 ml-5">
                    Photo
                  </div>
                  {getImagesActionLoading ? (
                    <>
                      <Skeleton
                        paragraph={{ rows: 15 }}
                        style={{
                          width: '100%',
                        }}
                      />
                    </>
                  ) : (
                    <>
                      {images && images?.length > 0 ? (
                        <>
                          <div className="gallery-image-container flex flex-wrap items-center justify-start">
                            {images &&
                              images?.map((image, index) => {
                                return (
                                  <ImagePlaceholder
                                    key={image?.id}
                                    item={image}
                                    onClick={onOpenPreviewMediaModal}
                                    setMediaSelected={setMediaSelected}
                                    setTypeMediaSelected={setTypeMediaSelected}
                                  />
                                )
                              })}
                          </div>
                        </>
                      ) : (
                        <>
                          <Empty description="no data" />
                        </>
                      )}
                    </>
                  )}
                  {/* Pagination for images */}
                  <div className="flex justify-end mt-5">
                    <StyledPagination
                      current={imagesPage}
                      onChange={onChangeImagePage}
                      total={totalImages}
                      showSizeChanger={false}
                    />
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}

            {isOpenPreviewMediaModal ? (
              <>
                <PreviewMediaModal
                  isOpen={isOpenPreviewMediaModal}
                  onClose={onClosePreviewMediaModal}
                  type={typeMediaSelected}
                  onSelectMedia={onSelectMedia}
                  isShowActionButton={isModal}
                  item={mediaSelected}
                />
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="select-media-table">
            <div className="wrapper-table">
              {isLoadingTable ? (
                <Skeleton paragraph={{ rows: 16 }} />
              ) : (
                <Fragment>
                  <SharedTable
                    columns={columns as any}
                    rowKey="id"
                    dataSource={sourceTable}
                    // paginationProps={{
                    //   total: totalData,
                    //   pageSize: 10,
                    //   current: currentPage,
                    //   showSizeChanger: false,
                    //   onChange(page) {
                    //     if (mediaType === EMediaType.VIDEO) {
                    //       setVideosPage(page)
                    //     } else if (mediaType === EMediaType.IMAGE) {
                    //       setImagesPage(page)
                    //     }
                    //     setSelectedMedia((pre) => ({} as IMediaItem))
                    //   },
                    // }}
                    sticky
                    // onRowClick={(record) => {
                    //   if (record?.id === selectedMedia?.id) {
                    //     setSelectedMedia((pre) => ({} as IMediaItem))
                    //     return
                    //   }
                    //   setSelectedMedia((pre) => record)
                    // }}
                  />

                  {/* Action button */}
                  {/* <div
                    style={{
                      display: 'flex',
                      marginTop: 12,
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                      }}
                    />
                    <Button
                      htmlType="submit"
                      size="middle"
                      className="submit__btn loginselected-btn"
                      style={{
                        alignSelf: 'flex-end',
                        marginRight: 24,
                      }}
                      onClick={onClickCancel}
                    >
                      {'Cancel'}
                    </Button>
                    <Button
                      htmlType="submit"
                      type="primary"
                      size="middle"
                      className="submit__btn loginselected-btn"
                      style={{
                        alignSelf: 'flex-end',
                      }}
                      // disabled={!selectedMedia?.id}
                      onClick={() => {
                        if (!selectedMedia?.id) {
                          message.warning(
                            'Please select a media from the list before saving'
                          )
                          return
                        }
                        onSelectMedia && onSelectMedia(selectedMedia)
                        onClickCancel()
                      }}
                    >
                      {'Save'}
                    </Button>
                  </div> */}
                </Fragment>
              )}
            </div>
            {/* Pagination for table media */}
            <div className="pagination flex justify-end mt-5">
              <StyledPagination
                current={currentPage}
                // onChange={onChangeVideoPage}
                onChange={(page: SetStateAction<number>) => {
                  if (mediaType === EMediaType.VIDEO) {
                    setVideosPage(page)
                  } else if (mediaType === EMediaType.IMAGE) {
                    setImagesPage(page)
                  }
                  // setSelectedMedia((pre) => ({} as IMediaItem))
                }}
                total={totalData}
                showSizeChanger={false}
              />
            </div>
            <div
              style={{
                display: 'flex',
                marginTop: 12,
              }}
              className="cancel-reset-save-btn"
            >
              <div
                style={{
                  flex: 1,
                }}
              />
              <Button
                htmlType="submit"
                size="middle"
                className="submit__btn loginselected-btn"
                style={{
                  alignSelf: 'flex-end',
                  marginRight: 24,
                }}
                onClick={onClickCancel}
              >
                {'Cancel'}
              </Button>
              <Button
                htmlType="submit"
                type="primary"
                size="middle"
                className="submit__btn loginselected-btn"
                style={{
                  alignSelf: 'flex-end',
                }}
                disabled={!selectedMedia?.id}
                onClick={() => {
                  if (!selectedMedia?.id) {
                    message.warning(
                      'Please select a media from the list before saving'
                    )
                    return
                  }
                  onSelectMedia && onSelectMedia(selectedMedia)
                  onClickCancel()
                }}
              >
                {'Save'}
              </Button>
            </div>
          </div>
        </>
      )}
    </Fragment>
  )
}

export default GalleryTabItem
