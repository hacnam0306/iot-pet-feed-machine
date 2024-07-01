import { EGalleyTabs } from '@configs'
import { Tabs } from 'antd'
import { useEffect, useState } from 'react'
import { Text } from 'src/common'
import { EMediaCategory, EMediaType, IMediaItem } from 'src/interfaces/gallery'
import styled from 'styled-components'
import GalleryTabItem from './GalleryTabItem'

interface IGalleryProps {
  isModal?: boolean
  mediaType?: EMediaType
  category?: EMediaCategory
  onSelectMedia?: (data: IMediaItem) => void
  onCloseSelectMediaModal?: () => void
}

const Gallery = ({
  isModal,
  mediaType,
  onSelectMedia,
  category,
  onCloseSelectMediaModal,
}: IGalleryProps) => {
  const [activeTab, setActiveTab] = useState<EMediaCategory>(
    category ?? EMediaCategory.HOME_PAGE
  )

  let tabItems = [
    {
      label: <Text>{EGalleyTabs.HOMEPAGE}</Text>,
      key: EMediaCategory.HOME_PAGE,
      children: (
        <GalleryTabItem
          activeTab={activeTab}
          isModal={isModal}
          mediaType={mediaType}
          onSelectMedia={onSelectMedia}
          onCloseSelectMediaModal={onCloseSelectMediaModal}
        />
      ),
    },
    {
      label: <Text>{EGalleyTabs.ABOUT_US}</Text>,
      key: EMediaCategory.ABOUT_US,
      children: (
        <GalleryTabItem
          activeTab={activeTab}
          isModal={isModal}
          mediaType={mediaType}
          onSelectMedia={onSelectMedia}
          onCloseSelectMediaModal={onCloseSelectMediaModal}
        />
      ),
    },
    {
      label: <Text>{EGalleyTabs.BLOG}</Text>,
      key: EMediaCategory.BLOG,
      children: (
        <GalleryTabItem
          activeTab={activeTab}
          isModal={isModal}
          mediaType={mediaType}
          onSelectMedia={onSelectMedia}
          onCloseSelectMediaModal={onCloseSelectMediaModal}
        />
      ),
    },
    {
      label: <Text>{EGalleyTabs.PACKAGE}</Text>,
      key: EMediaCategory.PACKAGE,
      children: (
        <GalleryTabItem
          activeTab={activeTab}
          isModal={isModal}
          mediaType={mediaType}
          onSelectMedia={onSelectMedia}
          onCloseSelectMediaModal={onCloseSelectMediaModal}
        />
      ),
    },
  ]

  if (mediaType === EMediaType.VIDEO) {
    tabItems = tabItems.filter((item) => item.key === EMediaCategory.HOME_PAGE)
  }

  useEffect(() => {
    if (category) {
      setActiveTab(category)
    }
  }, [category])

  return (
    <GalleryStyled
      className={`wrapper-gallery`}
      style={{
        borderTopLeftRadius: !isModal ? '1.25rem !important' : '0',
        borderTopRightRadius: !isModal ? '1.25rem !important' : '0',
        overflow: 'hidden',
      }}
      $isModal={isModal}
    >
      <Tabs
        destroyInactiveTabPane={true}
        defaultActiveKey={EMediaCategory.HOME_PAGE}
        type="card"
        size={'small'}
        items={tabItems}
        defaultChecked={true}
        activeKey={activeTab}
        onChange={(e) => {
          setActiveTab(e as EMediaCategory)
        }}
      />
    </GalleryStyled>
  )
}

export default Gallery

const GalleryStyled = styled('div')<{ $isModal?: boolean }>(({ $isModal }) => {
  return {
    '.ant-tabs-nav': {
      marginBottom: 0,
      // paddingLeft: !$isModal ? '1.25rem' : '0',
      marginLeft: '1.25rem',

      '& .ant-tabs-tab': {
        borderRadius: '0.75rem 0.75rem 0 0 !important',

        '&.ant-tabs-tab-active': {
          span: {
            color: '#009BB7',
            fontWeight: '500',
          },
        },
      },
    },
  }
})
