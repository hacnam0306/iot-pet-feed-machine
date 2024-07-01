import { useAppSelector } from '@redux'
import { Spin } from 'antd'
import { AppModal } from '../AppModal'
import { XCloseIcon } from '../Icon'

interface IPreviewPhotoModalProps {
  open: boolean
  onDelete: () => void
  onSave: () => void
  onClose: () => void
  url?: string
}

const PreviewPhotoModal = ({
  open,
  onClose,
  onSave,
  onDelete,
  url,
}: IPreviewPhotoModalProps) => {
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
              <h1 className="m-0 text-[20px]">Photo preview</h1>
            </div>
            <div className="hover:opacity-75">
              <XCloseIcon width={16} height={16} onClick={onClose} />
            </div>
          </div>
          <div className="mt-6">
            <div className="preview-chat-photo w-full h-full object-contain">
              <img src={url} alt="preview chat content" />
            </div>
          </div>
        </div>
      )}
    </AppModal>
  )
}

export default PreviewPhotoModal
