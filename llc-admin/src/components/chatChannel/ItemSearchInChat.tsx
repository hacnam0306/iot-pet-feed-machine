import { PATH_CHAT_CHANNEL, PLACEHOLDER_IMAGE_AVATAR } from '@configs'
import { useAppDispatch } from '@redux'
import { set } from 'lodash'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { createChatRoom } from 'src/redux/actions/chat'

interface IItemSearchInChatProps {
  id: number | string
  name: string
  avatar?: string
  setIsSearching?: React.Dispatch<React.SetStateAction<boolean>>
  setSearchValue?: React.Dispatch<React.SetStateAction<string | null>>
}

const ItemSearchInChat = ({
  id,
  name,
  avatar,
  setIsSearching,
  setSearchValue,
}: IItemSearchInChatProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleClickItemInChat = async () => {
    const responseCreateChatRoom = await dispatch(
      createChatRoom({
        receiverId: id as number,
      })
    ).unwrap()

    navigate(`${PATH_CHAT_CHANNEL}/${responseCreateChatRoom.id}`)
    setIsSearching && setIsSearching(false)
    setSearchValue && setSearchValue('')
  }

  return (
    <div
      className="intro-x cursor-pointer box relative flex items-center p-5 bg-[#f1f5f9] rounded-md"
      onClick={handleClickItemInChat}
    >
      <div className="image-fit mr-1 h-12 w-12 flex-none">
        <img
          className="rounded-full w-full h-full object-cover"
          src={avatar ?? PLACEHOLDER_IMAGE_AVATAR}
          alt="Midone Tailwind HTML Admin Template"
        />
      </div>
      <div className="ml-2 overflow-hidden">
        <div className="flex items-center">
          <a className="font-medium" href="#">
            {name}
          </a>
        </div>
      </div>
    </div>
  )
}

export default ItemSearchInChat
