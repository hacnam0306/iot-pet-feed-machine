import { ESocketMessage } from '@configs'
import { Spin, message } from 'antd'
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ICMessageItem } from 'src/interfaces/chat'
import { RootState, chatActions } from 'src/redux/Slices'
import { getMessages } from 'src/redux/actions/chat'
import { getSocketInstance } from 'src/utils/getSocketInstance'
import MessageItem from '../MessageItem'
import PreviewPhotoModal from '../PreviewPhotoModal'

import styled from 'styled-components'
interface IMainContentProps {
  chatId: string | number
}

const MainContent = ({ chatId }: IMainContentProps) => {
  const [showModal, setShowModal] = useState(false)
  const [isGetMoreMessage, setIsGetMoreMessage] = useState(false)
  const [url, setUrl] = useState('')
  const [currentPageMessage, setCurrentPageMessage] = React.useState(1)
  // const messagesEndRef = useRef<HTMLDivElement>(null)
  const messageListRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()
  const socket = getSocketInstance()

  const listMessages = useSelector(
    (state: RootState) => state.chat.listMessages
  )

  const getListMessageLoading = useSelector(
    (state: RootState) => state.chat.loadings?.getMessageByRoomIdActionLoading
  )

  const totalMessages = useSelector(
    (state: RootState) => state.chat.totalMessages
  )

  const limitMessages = useSelector(
    (state: RootState) => state.chat.limitMessages
  )

  const onClose = () => {
    setShowModal(false)
    setUrl('')
  }

  const detectEndOfList = useCallback(() => {
    return (
      currentPageMessage * Number(limitMessages) >=
        totalMessages + Number(limitMessages) && totalMessages !== 0
    )
  }, [currentPageMessage, limitMessages, totalMessages])

  const isEndOfList = detectEndOfList()

  useEffect(() => {
    try {
      if (isEndOfList) {
        setIsGetMoreMessage(false)
        return
      }
      dispatch(
        getMessages({ roomId: +chatId, page: currentPageMessage, limit: 10 })
      )
    } catch (error: any) {
      console.log(error)
      error &&
        error?.message &&
        message.error({
          content: error?.message,
        })
    }
  }, [chatId, currentPageMessage])

  useEffect(() => {
    const handleIncomingMessage = (data: ICMessageItem) => {
      if (data && data.roomId === +chatId) {
        dispatch(chatActions.addMessage(data))
      }
    }

    socket?.on(ESocketMessage.RECEIVE_MESSAGE, handleIncomingMessage)
    return () => {
      socket?.off(ESocketMessage.RECEIVE_MESSAGE, () => {
        console.log('off Receive message')
      })
    }
  }, [chatId, socket])

  useEffect(() => {
    // scroll to bottom after message changed

    if (!isGetMoreMessage) {
      if (messageListRef?.current) {
        messageListRef.current.scrollTop =
          messageListRef.current.scrollHeight + 50
      }
    }
  }, [listMessages])

  useEffect(() => {
    setCurrentPageMessage((pre) => 1)
    setIsGetMoreMessage(false)

    return () => {
      setCurrentPageMessage((pre) => 1)
      setIsGetMoreMessage(false)
    }
  }, [chatId])

  return (
    <div className="scrollbar-hidden flex-1 overflow-y-scroll px-5 pt-5 h-full no-scrollbar">
      {getListMessageLoading && !isGetMoreMessage ? (
        <Fragment>
          <div className="loading-wrapper flex items-center justify-center h-full">
            <Spin size="large" />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <MessageListStyled
            ref={messageListRef}
            onScroll={() => {
              if (messageListRef.current?.scrollTop === 0) {
                setCurrentPageMessage((pre) => currentPageMessage + 1)
                setIsGetMoreMessage(true)
              } else {
                setIsGetMoreMessage(false)
              }
            }}
          >
            {' '}
            {getListMessageLoading && isGetMoreMessage && !isEndOfList && (
              <div className="loading-wrapper flex items-center justify-center h-full">
                <Spin size="large" />
              </div>
            )}
            {listMessages &&
              listMessages.map((item, index) => {
                return (
                  <MessageItem
                    key={item.id}
                    message={item}
                    chatId={chatId}
                    setUrl={setUrl}
                    setShowModal={setShowModal}
                  />
                )
              })}
          </MessageListStyled>
        </Fragment>
      )}
      <PreviewPhotoModal
        open={showModal}
        onDelete={() => {}}
        onSave={() => {}}
        onClose={onClose}
        url={url}
      />
    </div>
  )
}

export default MainContent

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`
