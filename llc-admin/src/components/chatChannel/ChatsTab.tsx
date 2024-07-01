import { SearchOutlined } from '@ant-design/icons'
import { EMessageType, ESocketMessage } from '@configs'
import {
  RootState,
  chatActions,
  selectChatLoading,
  useAppDispatch,
  useAppSelector,
} from '@redux'
import { Empty, Spin, message } from 'antd'
import { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Input, Loading } from 'src/common'
import { useDebounce } from 'src/hooks/useDebounce'
import { IItemInListChatRoom } from 'src/interfaces/chat'
import { getChatRoom, getUserChat } from 'src/redux/actions/chat'
import { getSocketInstance } from 'src/utils/getSocketInstance'
import { ConversationItem } from './ConversationItem'
import ItemSearchInChat from './ItemSearchInChat'

interface IChatsTabProps {}

export default function ChatsTab({}: IChatsTabProps) {
  const [searchValue, setSearchValue] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const dispatch = useAppDispatch()
  const socket = getSocketInstance()
  const currentUser = useSelector((state: RootState) => state.auth.accountInfo)
  const userId = currentUser?.id

  const listUserChat = useAppSelector((state) => state.chat.listUserChat)

  const getUserChatListLoading = useSelector(
    (state: RootState) => state.chat.loadings?.getListUserChatActionLoading
  )
  const getChatRoomActionLoading = useSelector(
    (state: RootState) => state.chat.loadings?.getListChatRoomActionLoading
  )

  const listChatRoom = useAppSelector(
    (state) => state.chat.listChatRoom
  ).filter((item, index) => {
    return item?.lastMessage !== null
  })

  const getUserList = async () => {
    try {
      const response = await dispatch(
        getUserChat({
          search: searchValue?.trim() as string,
        })
      ).unwrap()
    } catch (error: any) {
      console.log(error?.message)
    }
  }

  const getChatRoomList = async () => {
    try {
      const response = await dispatch(getChatRoom()).unwrap()
    } catch (error: any) {
      console.log(error)
      error &&
        error?.message &&
        message.error({
          content: error?.message,
        })
    }
  }

  useEffect(() => {
    if (searchValue) {
      setIsSearching(true)
    } else {
      setIsSearching(false)
    }
  }, [searchValue])

  useEffect(() => {
    getChatRoomList()
  }, [])

  useEffect(() => {
    getUserList()
  }, [searchValue])

  useEffect(() => {
    socket?.on(
      ESocketMessage.RECEIVE_CHAT_ROOM,
      (data: IItemInListChatRoom) => {
        if (data) {
          dispatch(chatActions.updateRoom(data))
        }
      }
    )

    return () => {
      socket?.off(ESocketMessage.RECEIVE_CHAT_ROOM, () => {
        console.log('off Receive message')
      })
    }
  }, [dispatch, socket])

  useEffect(() => {
    socket?.on(
      ESocketMessage.RECEIVE_DELETE_MESSAGE,
      (data: IItemInListChatRoom) => {
        if (data) {
          dispatch(chatActions.receiveDeleteMessage(data))
        }
      }
    )

    return () => {
      socket?.off(ESocketMessage.RECEIVE_DELETE_MESSAGE, () => {
        console.log('off Receive delete message')
      })
    }
  }, [socket])

  return (
    <div className="p-5 h-full">
      <div className="chat-sidebar chat-sidebar-search-group mb-5">
        <Input
          prefix={<SearchOutlined className="pl-2" />}
          placeholder="Enter a name to start chatting"
          value={searchValue === null ? '' : searchValue}
          onChange={(e) => setSearchValue((pre) => e.target.value)}
          suffix={
            getUserChatListLoading && isSearching ? <Loading /> : undefined
          }
        />
      </div>
      <div className="chat-sidebar chat-sidebar-list-conversation flex gap-4 flex-col overflow-y-auto no-scrollbar h-[calc(100%-60px)] pt-2">
        {isSearching ? (
          <Fragment>
            {getUserChatListLoading ? (
              <Fragment>
                <div className="loading-wrapper flex items-center justify-center">
                  <Spin size="large" />
                </div>
              </Fragment>
            ) : (
              <Fragment>
                {listUserChat.length !== 0 ? (
                  <Fragment>
                    {listUserChat
                      .filter((item, index) => {
                        return item?.id !== userId
                      })
                      .map((item, index) => (
                        <ItemSearchInChat
                          key={item?.id}
                          id={item?.id}
                          name={item?.name}
                          avatar={item?.url}
                          setIsSearching={setIsSearching}
                          setSearchValue={setSearchValue}
                        />
                      ))}
                  </Fragment>
                ) : (
                  <Fragment>
                    <div className="text-center text-gray-500">
                      No results found
                    </div>
                  </Fragment>
                )}
              </Fragment>
            )}
          </Fragment>
        ) : (
          <Fragment>
            {getChatRoomActionLoading ? (
              <Fragment>
                <div className="loading-wrapper flex items-center justify-center">
                  <Spin size="large" />
                </div>
              </Fragment>
            ) : (
              <Fragment>
                {listChatRoom.length !== 0 ? (
                  <Fragment>
                    {listChatRoom
                      // .filter((item, index) => {
                      //   return item !== null
                      // })
                      .map((item, index) => (
                        <ConversationItem key={item?.id} chatItem={item} />
                      ))}
                  </Fragment>
                ) : (
                  <Fragment>
                    <Empty description="no data" />
                  </Fragment>
                )}
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    </div>
  )
}
