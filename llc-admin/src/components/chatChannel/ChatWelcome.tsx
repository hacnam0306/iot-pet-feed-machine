import { PLACEHOLDER_IMAGE_AVATAR } from '@configs'
import { RootState } from '@redux'
import React from 'react'
import { useSelector } from 'react-redux'

type Props = {}

const ChatWelcome = (props: Props) => {
  const accountInfor = useSelector((state: RootState) => state.auth.accountInfo)
  return (
    <div className="flex h-full items-center">
      <div className="mx-auto text-center">
        <div className="image-fit mx-auto h-16 w-16 flex-none overflow-hidden rounded-full">
          <img
            src={accountInfor?.profilePhoto?.url ?? PLACEHOLDER_IMAGE_AVATAR}
            alt="Avatar"
            className="w-full h-full rounded-full"
          />
        </div>
        <div className="mt-3">
          <div className="font-medium">Hey, {accountInfor?.name}!</div>
          <div className="mt-1 text-slate-500">
            Please select a chat to start messaging.
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatWelcome
