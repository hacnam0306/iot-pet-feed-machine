import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/Slices'
import { getSocketInstance } from 'src/utils/getSocketInstance'
import FileGroup from './FileGroup'
import IconGroup from './IconGroup'
import SendMessageGroup from './SendMessageGroup'
import { EKeyBoardCode, EMessageType, ESocketMessage } from '@configs'
import { set } from 'lodash'

interface IContentBottomProps {
  chatId: string | number
}

const ContentBottom = ({ chatId }: IContentBottomProps) => {
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const dispatch = useDispatch()
  const socket = getSocketInstance()

  const receiverId = useSelector(
    (state: RootState) => state.chat.currentPartner?.id
  )

  const addEmoji = (e: any) => {
    let sym = e.unified.split('-')
    let codesArray: any[] = []
    sym.forEach((el: any) => codesArray.push('0x' + el))
    let emoji = String.fromCodePoint(...codesArray)
    setMessage((pre) => message + emoji)
  }

  const onContentChange = (e: any) => {
    if (e.target.value.trim() === '') {
      setIsTyping(false)
      setMessage((pre) => '')
      return
    }
    setMessage(e.target.value)
    setIsTyping(true)
  }

  const onSendMessage = () => {
    setIsTyping(false)
    if (message) {
      socket?.emit(ESocketMessage.SEND_MESSAGE, {
        receiverId: receiverId,
        type: EMessageType.TEXT,
        content: message.trim(),
        roomId: +chatId,
      })
      setMessage((pre) => '')
    }
  }

  return (
    <div className="flex items-center border-t border-slate-200/60 pt-4 pb-10 dark:border-darkmode-400 sm:py-4">
      <textarea
        value={message}
        rows={1}
        onChange={onContentChange}
        onKeyDown={async (e) => {
          if (e.key === `${EKeyBoardCode.ENTER}` && !!message) {
            await onSendMessage()
          }
        }}
        onKeyUp={(e) => {
          if (e.key === `${EKeyBoardCode.ENTER}` && !!message) {
            setMessage('')
          }
        }}
        placeholder="Type your message..."
        id="input-message-chat-channel"
        className="disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&amp;[readonly]]:bg-slate-100 [&amp;[readonly]]:cursor-not-allowed [&amp;[readonly]]:dark:bg-darkmode-800/50 [&amp;[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm rounded-md placeholder:text-slate-400/90 focus:ring-primary focus:ring-opacity-20 focus:border-opacity-40 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 h-[46px] resize-none border-transparent px-5 py-3 shadow-none focus:border-transparent focus:ring-0 dark:bg-darkmode-600 outline-none"
      ></textarea>
      <div className="relative bottom-0 left-0 mb-5 ml-5 flex sm:static sm:ml-0 sm:mb-0 items-center justify-center">
        <IconGroup addEmoji={addEmoji} />
        <FileGroup chatId={chatId} />
        <SendMessageGroup
          message={message}
          isFromChatText={true}
          onSendMessage={onSendMessage}
        />
      </div>
    </div>
  )
}

export default ContentBottom
