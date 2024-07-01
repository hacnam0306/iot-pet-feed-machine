import { chatActions, useAppDispatch } from '@redux'
import React, { useEffect } from 'react'
import ChatHeader from 'src/components/chatChannel/ChatHeader'
import { getSocketInstance } from 'src/utils/getSocketInstance'

interface IChatLayoutProps {
  children: React.ReactNode
}

const ChatLayout = ({ children }: IChatLayoutProps) => {
  const dispatch = useAppDispatch()
  const socket = getSocketInstance()
  useEffect(() => {
    socket?.connect()

    return () => {
      socket?.disconnect()
    }
  }, [])

  useEffect(() => {
    return () => {
      // console.log('unmount')
      dispatch(chatActions.clearMessages())
    }
  }, [])
  return (
    <div>
      <ChatHeader />
      <div className="chat-layout intro-y mt-5 grid grid-cols-12 gap-5 h-[65vh]">
        <div className="intro-y col-span-12 lg:col-span-8 2xl:col-span-9 bg-white rounded-lg ">
          {children}
        </div>
      </div>
    </div>
  )
}

export default ChatLayout
