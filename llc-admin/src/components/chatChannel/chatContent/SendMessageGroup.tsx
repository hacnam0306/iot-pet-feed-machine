import React from 'react'

interface ISendMessageProps {
  message?: string
  isFromChatText?: boolean
  onSendMessage: () => void
}

const SendMessageGroup = ({
  message,
  isFromChatText,
  onSendMessage,
}: ISendMessageProps) => {
  // const onSendMessage = () => {
  //   console.log('onSendMessage')
  // }
  return (
    <div
      className={`send-message-btn ${
        isFromChatText
          ? !!message?.trim()
            ? 'opacity-100 pointer-events: auto'
            : 'opacity-50 pointer-events-none'
          : ''
      }`}
      onClick={onSendMessage}
    >
      <a
        className="mr-5 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primary text-white sm:h-10 sm:w-10"
        href="#"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          icon-name="send"
          data-lucide="send"
          className="lucide lucide-send stroke-1.5 h-4 w-4"
        >
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </a>
    </div>
  )
}

export default SendMessageGroup
