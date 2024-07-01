import { PLACEHOLDER_IMAGE_AVATAR } from '@configs'
import { RootState } from '@redux'
import React from 'react'
import { useSelector } from 'react-redux'

interface IContentTopProps {
  chatId: string
}

export const ContentTop = ({ chatId }: IContentTopProps) => {
  const currentChatRoom = useSelector(
    (state: RootState) => state.chat.currentChatRoom
  )

  const currentPartner = useSelector(
    (state: RootState) => state.chat.currentPartner
  )

  return (
    <div className="flex flex-col border-b border-slate-200/60 px-5 py-4 dark:border-darkmode-400 sm:flex-row">
      <div className="content-left flex items-center">
        <div className="chat-box chat-image-wrapper image-fit relative h-10 w-10 flex-none sm:h-12 sm:w-12">
          <img
            className="rounded-full w-full h-full object-cover"
            src={
              currentChatRoom?.image ??
              currentPartner?.url ??
              PLACEHOLDER_IMAGE_AVATAR
            }
            alt="Alt text"
          />
        </div>
        <div className="ml-3 mr-auto">
          <div className="font-medium text-base">{currentChatRoom?.name}</div>
        </div>
      </div>
      <div className="content-right -mx-5 mt-5 flex items-center border-t border-slate-200/60 px-5 pt-3 sm:mx-0 sm:ml-auto sm:mt-0 sm:border-0 sm:px-0 sm:pt-0"></div>
    </div>
  )
}
