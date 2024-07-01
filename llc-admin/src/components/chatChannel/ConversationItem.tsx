import { MoreOutlined } from '@ant-design/icons'
import { PATH_CHAT_CHANNEL, PLACEHOLDER_IMAGE_AVATAR } from '@configs'
import { RouterParams } from '@interfaces'
import { RootState, chatActions, useAppDispatch } from '@redux'
import { Dropdown, MenuProps, Typography } from 'antd'
import { format, isThisWeek, isToday } from 'date-fns'
import moment from 'moment'
import { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { IItemInListChatRoom } from 'src/interfaces/chat'
import { toggleReadStatus } from 'src/redux/actions/chat'

interface IConversationItemProps {
  chatItem: IItemInListChatRoom
}

export const ConversationItem = ({ chatItem }: IConversationItemProps) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const {
    id,
    createdAt,
    image,
    isRead,
    lastMessage,
    name,
    participants,
    unReadNumbers,
    updatedAt,
  } = chatItem

  const [isReadState, setIsReadState] = useState(isRead)

  const { chatId } = useParams<RouterParams['ChatDetail']>()

  const currentUser = useSelector((state: RootState) => state.auth.accountInfo)

  const isCurrentChatRoom = chatId === id?.toString()

  const handleClickChatItem = async () => {
    navigate(`${PATH_CHAT_CHANNEL}/${id}`)
    dispatch(chatActions.setChatRoom(chatItem))
    dispatch(chatActions.setPartner(participants))
    dispatch(chatActions.clearMessages())

    try {
      const response = await dispatch(
        toggleReadStatus({ roomId: id as number, isRead: true })
      ).unwrap()
    } catch (error: any) {
      console.log('Error', error)
    }
  }

  const getTimeString = (time: Date | string) => {
    const date = moment(time).toDate()

    if (isToday(date)) {
      return moment(time).format('h:mm A')
    } else if (isThisWeek(date)) {
      return format(date, 'EEE')
    } else {
      return moment(time).format('DD/MM/YYYY')
    }
  }

  const displayTime = getTimeString(lastMessage?.createdAt)

  const toggleReadState = async (event: React.MouseEvent<HTMLElement>) => {
    // event.stopPropagation()
    setIsReadState((pre) => !isReadState)
    try {
      const response = await dispatch(
        toggleReadStatus({
          roomId: id as number,
          isRead: !isReadState,
        })
      ).unwrap()
      // getChatRoomList()
    } catch (error: any) {
      console.log(error)
    }
  }

  const items: MenuProps['items'] = [
    {
      label: (
        <div
          className="message-item action-delete flex items-center justify-center gap-2"
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            toggleReadState(event)
          }}
        >
          <Typography.Text>
            {`Mark as ${isReadState ? 'unread' : 'read'}`}
          </Typography.Text>
        </div>
      ),
      key: '1',
    },
  ]

  return (
    <div
      className={`intro-x cursor-pointer box relative flex items-center p-5 
      bg-[${isCurrentChatRoom ? '#e2e8f0' : '#f1f5f9'}] 
      rounded-md`}
      onClick={handleClickChatItem}
      style={{
        backgroundColor: isCurrentChatRoom ? '#e2e8f0' : '#f1f5f5',
      }}
    >
      <div className="image-fit mr-1 h-12 w-12 flex-none">
        <img
          className="rounded-full w-full h-full object-cover"
          src={image ?? PLACEHOLDER_IMAGE_AVATAR}
          alt="Avatar"
        />
        {/* <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-success dark:border-darkmode-600"></div> */}
      </div>
      <div className="ml-2 overflow-hidden w-full">
        <div className="flex items-center">
          <div className="font-medium max-w-[65%] truncate #009BB7 ">
            {name}
          </div>
          <div className="ml-auto text-xs text-slate-400">{displayTime}</div>
        </div>
        <div className="mt-0.5 w-[85%] truncate text-slate-500">
          {!!lastMessage.content
            ? lastMessage?.content
            : `${
                lastMessage.user.id === currentUser?.id
                  ? 'You'
                  : participants?.name?.split(' ')[0]
              } just sent a file`}
        </div>
      </div>
      {!isRead ? (
        <Fragment>
          {!!unReadNumbers ? (
            <Fragment>
              <div className="absolute top-0 right-1 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-white">
                {unReadNumbers}
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className="absolute top-0 right-1 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-white">
                &nbsp;
              </div>
            </Fragment>
          )}
        </Fragment>
      ) : (
        <Fragment></Fragment>
      )}

      <div
        className={`more-content-conversation absolute right-[20px] top-[63%] transform translate-y-[-50%] flex items-center justify-center w-5 h-5 rounded-full hover:bg-[${
          !isCurrentChatRoom ? '#e2e8f0' : '#f1f5f9'
        }]`}
        onClick={(event: React.MouseEvent<HTMLElement>) =>
          event.stopPropagation()
        }
        style={{
          backgroundColor: isCurrentChatRoom ? '#e2e8f0' : '#f1f5f5',
        }}
      >
        <Dropdown menu={{ items }} trigger={['click']}>
          <div className="more-content-icon cursor-pointer flex items-center justify-center">
            <MoreOutlined size={5} />
          </div>
        </Dropdown>
      </div>
    </div>
  )
}
