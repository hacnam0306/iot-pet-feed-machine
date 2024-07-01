import { useAppSelector } from '@redux'
import { AppModal } from '../AppModal'
import { XCloseIcon } from '../Icon'
import SendMessageGroup from './chatContent/SendMessageGroup'
import { Spin } from 'antd'

interface ISendFileProps {
  open: boolean
  onDelete: () => void
  onSave: () => void
  onClose: () => void
  file?: File
  imgData?: string
}

const SendFileModal = ({
  open,
  onClose,
  onSave,
  onDelete,
  file,
  imgData,
}: ISendFileProps) => {
  const uploadFileActionLoading = useAppSelector(
    (state) => state.chat.loadings.uploadFileActionLoading
  )

  return (
    <AppModal open={open} onClose={onClose}>
      {uploadFileActionLoading ? (
        <div className="loading-wrapper flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        <div className="wrapper-sendfile w-[400px] h-auto">
          <div className="flex items-center justify-between ">
            <div>
              <h1 className="m-0 text-[20px]">File preview</h1>
            </div>
            <div className="hover:opacity-75">
              <XCloseIcon width={16} height={16} onClick={onClose} />
            </div>
          </div>
          <div className="mt-6">
            {file?.type.startsWith('image') && (
              <div className="file-preview w-f h-60 flex items-center justify-center">
                <img
                  src={imgData}
                  alt=""
                  className="h-full w-full object-contain"
                />
              </div>
            )}
            <div className="flex items-center justify-between mt-5">
              <div className="file-info">
                <div className="file-name">{file?.name ?? ' '}</div>
                <div className="file-size">
                  {file?.size && Math.ceil(file?.size / 1024)} KB
                </div>
              </div>
              <div className="send-file mr-[-20px]">
                <SendMessageGroup onSendMessage={onSave} />
              </div>
            </div>
          </div>
        </div>
      )}
    </AppModal>
  )
}

export default SendFileModal
