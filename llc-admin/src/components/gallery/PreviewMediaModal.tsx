import { Button } from 'src/common'
import { EMediaType, IMediaItem } from 'src/interfaces/gallery'
import { AppModal } from '../AppModal'
import { XCloseIcon } from '../Icon'

type Props = {
  isOpen: boolean
  onClose: () => void
  type: EMediaType
  item: IMediaItem
  onSelectMedia?: (data: IMediaItem) => void
  isShowActionButton?: boolean
}

const PreviewMediaModal = ({
  isOpen,
  onClose,
  type,
  item,
  onSelectMedia,
  isShowActionButton,
}: Props) => {
  const onClickSave = () => {
    console.log('save')
    onSelectMedia && onSelectMedia(item)
    onClose()
  }
  return (
    <div className="preview-media-modal w-full">
      <AppModal open={isOpen} onClose={onClose} backgroundColor="#fff">
        <div className="modal-preview-media max-h-[75vh] max-w-full">
          <div className="flex items-center justify-between ">
            <div>
              <h1 className="m-0 text-[20px]">&nbsp;</h1>
            </div>
            <div className="hover:opacity-75 cursor-pointer">
              <XCloseIcon width={16} height={16} onClick={onClose} />
            </div>
          </div>

          <div className="">
            {type === EMediaType.IMAGE ? (
              <div className="w-[800px] h-[600px] flex items-center justify-center">
                <img
                  src={item?.baseUrl}
                  alt={item?.path}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="w-[800px] h-[600px] flex items-center justify-center">
                <video
                  src={item?.baseUrl}
                  autoPlay={true}
                  muted
                  loop
                  controls
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </div>

          {onSelectMedia && isShowActionButton ? (
            <>
              <div className="mt-6">
                <div className="flex items-center mt-5 justify-end">
                  <Button
                    type="ghost"
                    size="middle"
                    className="submit__btn login-btn mr-6"
                    onClick={onClose}
                  >
                    {'Cancel'}
                  </Button>
                  <Button
                    htmlType="submit"
                    type="primary"
                    size="middle"
                    className="submit__btn login-btn"
                    loading={false}
                    onClick={onClickSave}
                  >
                    {'Save'}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </AppModal>
    </div>
  )
}

export default PreviewMediaModal
