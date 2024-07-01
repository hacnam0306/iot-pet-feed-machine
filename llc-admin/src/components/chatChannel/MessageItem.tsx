import { DeleteOutlined, MoreOutlined } from '@ant-design/icons'
import {
  EMessageType,
  ESocketMessage,
  PLACEHOLDER_IMAGE_AVATAR,
} from '@configs'
import { RootState, chatActions, useAppDispatch } from '@redux'
import { Dropdown, MenuProps, Typography } from 'antd'
import moment from 'moment'
import { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axiosClient from 'src/api/axiosClient'
import { ICMessageItem } from 'src/interfaces/chat'
import { getSocketInstance } from 'src/utils/getSocketInstance'

interface IMessageItemProps {
  message: ICMessageItem
  chatId: string | number
  setUrl: (url: string) => void
  setShowModal?: (showModal: boolean) => void
}

const MessageItem = ({
  message,
  chatId,
  setUrl,
  setShowModal,
}: IMessageItemProps) => {
  const dispatch = useAppDispatch()
  const socket = getSocketInstance()

  const currentUser = useSelector((state: RootState) => state.auth.accountInfo)
  const allChatRooms = useSelector(
    (state: RootState) => state.chat.listChatRoom
  )
  const currentChatRoom = allChatRooms.find(
    (chatRoom) => chatRoom?.id === +chatId ?? 0
  )

  const currentPartner = useSelector(
    (state: RootState) => state.chat.currentPartner
  )

  const targetPartner = useSelector(
    (state: RootState) => state.chat.listUserChat
  )?.find((user) => user?.id === currentPartner?.id)

  const userId = useSelector((state: RootState) => state?.auth?.accountInfo?.id)
  const isMe = message.user?.id === userId

  const receiverId = useSelector(
    (state: RootState) => state.chat.currentPartner?.id
  )

  const downloadFile = async (
    url: string | undefined,
    fileName: string | undefined
  ) => {
    try {
      const response = await axiosClient.get(url as string, {
        responseType: 'blob',
      })
      const blob = new Blob([response.data])
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = fileName as string
      link.click()
      link?.parentNode?.removeChild(link)
    } catch (error) {
      console.error('Error downloading file:', error)
    }
  }

  const handleDeleteMessage = () => {
    // dispatch(chatActions.deleteMessage({ id: message.id }))
    socket?.emit(ESocketMessage.DELETE_MESSAGE, {
      roomId: currentChatRoom?.id,
      messageId: message.id,
      receiverId: receiverId,
    })
  }

  const items: MenuProps['items'] = [
    {
      label: (
        <div
          className="message-item action-delete flex items-center justify-center gap-2"
          onClick={handleDeleteMessage}
        >
          <div className="action-delete-wrapper mr-y-auto flex items-center justify-center">
            <DeleteOutlined />
          </div>
          <Typography.Text>Delete</Typography.Text>
        </div>
      ),
      key: '1',
    },
  ]

  useEffect(() => {
    if (
      message.type === EMessageType.FILE &&
      message?.media?.type.startsWith('image') &&
      message.media?.url
    ) {
      setUrl(message?.media?.url)
    }
  }, [message.media?.type, message.media?.url, message.type, setUrl])

  return (
    <>
      {isMe ? (
        <>
          <div className="clear-both"></div>
          <div className="float-right mb-4 flex max-w-[90%] items-end  relative">
            <div className="more-content absolute left-[-24px] top-1/2 transform translate-y-[-50%] flex items-center justify-center">
              <Dropdown
                menu={{ items }}
                trigger={['click']}
                placement="bottomRight"
                arrow
              >
                <div className="more-content-icon cursor-pointer pl-[-12px] pr-[12px]">
                  <MoreOutlined size={5} />
                </div>
              </Dropdown>
            </div>
            <div className="rounded-l-md rounded-t-md bg-primary opacity-90 px-4 py-3 text-white max-w-[90%]">
              {message.type === EMessageType.TEXT ? (
                <p
                  className="font-semibold mb-0 whitespace-pre-wrap"
                  style={{
                    whiteSpace: 'pre-wrap',
                    overflowWrap: 'break-word',
                    textAlign: 'left',
                    wordBreak: 'break-word',
                  }}
                >
                  {message.content}
                </p>
              ) : (
                // message.content
                <Fragment>
                  {message?.media?.type.startsWith('image') ? (
                    <img
                      className="rounded-sm w-[16vh] h-[12vh] object-cover"
                      src={message?.media?.url ?? PLACEHOLDER_IMAGE_AVATAR}
                      alt="Alt text"
                      onClick={() => {
                        setUrl(message?.media?.url as string)
                        setShowModal && setShowModal(true)
                      }}
                    />
                  ) : (
                    <Fragment>
                      <div className="file-wrapper">
                        <a
                          href={message?.media?.url}
                          download={message?.media?.path}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <button>{message?.media?.path}</button>
                        </a>
                        {/* <div
                          className="download-file"
                          onClick={() =>
                            downloadFile(
                              message?.media?.url,
                              message?.media?.path
                            )
                          }
                        >
                          <button className="chat-file flex items-center justify-end gap-6 w-full">
                            <Typography.Title
                              level={5}
                              className="chat-file-name"
                              style={{ marginBottom: '-8px', color: '#fff' }}
                            >
                              {message?.media?.path?.substring(
                                message?.media?.path?.indexOf('-') + 1
                              )}
                            </Typography.Title>
                            <div className="chat-file-download">
                              <DownloadOutlined size={1} />
                            </div>
                          </button>
                        </div> */}
                      </div>
                    </Fragment>
                  )}
                </Fragment>
              )}
              <div className="mt-1 text-xs text-slate-300">
                {moment(message.createdAt ?? new Date()).fromNow()}
              </div>
            </div>
            <div className="image-fit relative ml-5 hidden h-10 w-10 flex-none sm:block">
              <img
                className="rounded-full w-full h-full object-cover"
                src={targetPartner?.url ?? PLACEHOLDER_IMAGE_AVATAR}
                alt="Alt text"
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="clear-both"></div>
          <div className="float-left mb-4 flex max-w-[90%] items-end  relative">
            <div className="image-fit relative mr-5 hidden h-10 w-10 flex-none sm:block">
              <img
                className="rounded-full w-full h-full object-cover"
                src={targetPartner?.url ?? PLACEHOLDER_IMAGE_AVATAR}
                alt="Alt text"
              />
            </div>
            <div className="rounded-r-md rounded-t-md bg-slate-100 px-4 py-3 text-slate-500 dark:bg-darkmode-400 max-w-[90%]">
              {message.type === EMessageType.TEXT ? (
                <p
                  className="font-semibold mb-0"
                  style={{
                    whiteSpace: 'pre-wrap',
                    overflowWrap: 'break-word',
                    textAlign: 'left',
                    wordBreak: 'break-word',
                  }}
                >
                  {message.content}
                </p>
              ) : (
                <Fragment>
                  {message?.media?.type.startsWith('image') ? (
                    <img
                      className="rounded-sm w-[16vh] h-[12vh] object-cover"
                      src={message?.media?.url ?? PLACEHOLDER_IMAGE_AVATAR}
                      alt="Alt text"
                      onClick={() => {
                        setUrl(message?.media?.url as string)
                        setShowModal && setShowModal(true)
                      }}
                    />
                  ) : (
                    <Fragment>
                      <div className="file-wrapper">
                        <a
                          href={message?.media?.url}
                          download={message?.media?.path}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <button>{message?.media?.path}</button>
                        </a>
                        {/* <div
                          className="download-file"
                          onClick={() =>
                            downloadFile(
                              message?.media?.url,
                              message?.media?.path
                            )
                          }
                        >
                          <button className="chat-file flex items-center justify-start gap-6 w-full">
                            <Typography.Title
                              level={5}
                              className="chat-file-name"
                              style={{ marginBottom: '-8px' }}
                            >
                              {message?.media?.path?.substring(
                                message?.media?.path?.indexOf('-') + 1
                              )}
                            </Typography.Title>
                            <div className="chat-file-download">
                              <DownloadOutlined size={1} />
                            </div>
                          </button>
                        </div> */}
                      </div>
                    </Fragment>
                  )}
                </Fragment>
              )}
              <div className="mt-1 text-xs text-slate-500">
                {moment(message.createdAt ?? new Date()).fromNow()}
              </div>
            </div>
            {/* <div className="more-content absolute right-[-24px] top-1/2 transform translate-y-[-50%] flex items-center justify-center">
              <Dropdown menu={{ items }} trigger={['click']}>
                <div className="more-content-icon cursor-pointer">
                  <MoreOutlined size={5} />
                </div>
              </Dropdown>
            </div> */}
          </div>
        </>
      )}
    </>
  )
}

export default MessageItem
