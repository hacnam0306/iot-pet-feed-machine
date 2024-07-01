import { Typography } from 'antd'

interface IChatHeaderProps {}

const ChatHeader = (props: IChatHeaderProps) => {
  return (
    <div className="chat-header mb-5">
      <div className="chat-header-info flex items-center justify-between">
        <div className="chat-header-info-name">
          <Typography.Title level={3}>Chat</Typography.Title>
        </div>
        <div className="chat-header-info-new">
          {/* <Button type="primary" onClick={handleNewChat}>
            New Chat
          </Button> */}
        </div>
      </div>
    </div>
  )
}

export default ChatHeader
