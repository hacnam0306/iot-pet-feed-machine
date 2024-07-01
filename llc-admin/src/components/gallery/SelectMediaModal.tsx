import { EMediaCategory, EMediaType, IMediaItem } from 'src/interfaces/gallery'
import { AppModal } from '../AppModal'
import { XCloseIcon } from '../Icon'
import Gallery from './Gallery'

type Props = {
  isOpen: boolean
  onClose: () => void
  mediaType?: EMediaType
  onSelectMedia: (data: IMediaItem) => void
  category?: EMediaCategory
}

const SelectMediaModal = ({
  isOpen,
  onClose,
  mediaType,
  onSelectMedia,
  category,
}: Props) => {
  return (
    <AppModal open={isOpen} onClose={onClose} backgroundColor="#fff">
      <div className="wrapper-select-media-modal w-[1000px]">
        <div className="close-icon flex items-center justify-between">
          <div>
            <h1 className="m-0 text-[20px]"></h1>
          </div>
          <div className="hover:opacity-75 cursor-pointer">
            <XCloseIcon width={16} height={16} onClick={onClose} />
          </div>
        </div>

        <Gallery
          isModal={true}
          mediaType={mediaType}
          onSelectMedia={onSelectMedia}
          category={category}
          onCloseSelectMediaModal={onClose}
        />
      </div>
    </AppModal>
  )
}

export default SelectMediaModal
