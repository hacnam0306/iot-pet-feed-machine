import { CHAT_FILE_LIMIT_SIZE_MB, EMessageType, ESocketMessage } from '@configs'
import { RootState, useAppDispatch, useAppSelector } from '@redux'
import { useState } from 'react'
import { uploadFile } from 'src/redux/actions/chat'
import { getSocketInstance } from 'src/utils/getSocketInstance'
import SendFileModal from '../SendFileModal'
import { message } from 'antd'

interface IFileGroupProps {
  chatId: string | number
}

const FileGroup = ({ chatId }: IFileGroupProps) => {
  const [showModal, setShowModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imgData, setImgData] = useState<string | ArrayBuffer | null>(null)

  const dispatch = useAppDispatch()
  const socket = getSocketInstance()

  const receiverId = useAppSelector(
    (state: RootState) => state.chat.listMessages
  )[0]?.user?.id

  const onClose = () => {
    setShowModal(false)
    setSelectedFile(null)
    setImgData(null)
  }

  const handlePickFile = (e: any) => {
    const file = e?.target?.files[0]
    if (file) {
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
        'text/plain',
        'audio/mpeg',
        'video/mp4',
        'image/gif',
      ]
      const maxSize = 20 * 1024 * 1024 // 20MB

      if (!allowedTypes.includes(file.type)) {
        message.error({
          content: `Unsupported file type!`,
        })
      } else if (file.size > maxSize) {
        message.error({
          content: `File size must be less than ${CHAT_FILE_LIMIT_SIZE_MB}MB`,
        })
      } else {
        setSelectedFile(e.target.files[0])
        const reader = new FileReader()
        reader.addEventListener('load', () => {
          setImgData(reader.result)
        })
        reader.readAsDataURL(e.target.files[0])
        setShowModal(true)
      }
    }
  }

  const handleSendFile = async () => {
    const responseUploadFile = await dispatch(
      uploadFile(selectedFile as File)
    ).unwrap()

    if (responseUploadFile?.url) {
      socket?.emit(ESocketMessage.SEND_MESSAGE, {
        receiverId: +receiverId,
        type: EMessageType.FILE,
        // content: message,
        roomId: +chatId,
        mediaId: responseUploadFile?.dataValues?.id,
      })
    } else {
      message.error({
        content: `Send file failed!`,
      })
    }
    onClose()
  }

  return (
    <div className="relative mr-3 h-4 w-4 text-slate-500 sm:mr-5 sm:h-5 sm:w-5 cursor-pointer">
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
        icon-name="paperclip"
        data-lucide="paperclip"
        className="lucide lucide-paperclip stroke-1.5 h-full w-full"
      >
        <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
      </svg>

      <input
        type="file"
        size={20 * 1024 * 1024}
        onChange={(e) => handlePickFile(e)}
        className="disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&amp;[readonly]]:bg-slate-100 [&amp;[readonly]]:cursor-not-allowed [&amp;[readonly]]:dark:bg-darkmode-800/50 [&amp;[readonly]]:dark:border-transparent transition duration-200 ease-in-out text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
      />

      <SendFileModal
        open={showModal}
        onClose={onClose}
        onDelete={() => {}}
        onSave={handleSendFile}
        file={selectedFile as any}
        imgData={imgData as any}
      />
    </div>
  )
}

export default FileGroup
