import { ReactionBarSelector } from '@charkour/react-reactions'
import { Tooltip } from 'antd'
import { ReactNode } from 'react'
import styled from 'styled-components'

import { EReactionType } from 'src/configs'
import { IMAGES } from '../../assets'
import './index.css'

type Props = {
  children: ReactNode
  onSelect?: (key: string) => void
  key?: string
}

export const ReactionItems: any[] = [
  {
    key: EReactionType.LOVE,
    node: <img src={IMAGES.icon_love} />,
    label: 'Love',
    color: '#FF4E2A',
  },
  {
    key: EReactionType.LIKE,
    node: <img src={IMAGES.icon_like} />,
    label: 'Like',
    color: '#009BB7',
  },
  {
    key: EReactionType.LOL,
    node: <img src={IMAGES.icon_lol} />,
    label: 'Haha',
    color: '#f9c503',
  },
  {
    key: EReactionType.SAD,
    node: <img src={IMAGES.icon_sad} />,
    label: 'Sad',
    color: '#f9c503',
  },
  {
    key: EReactionType.ANGRY,
    node: <img src={IMAGES.icon_angry} />,
    label: 'Angry',
    color: '#E22932',
  },
  {
    key: EReactionType.THUMSP_DOWN,
    node: <img src={IMAGES.icon_thumb_down} />,
    label: 'Dislike',
    color: '#E22932',
  },
]

const ReactionsButton = (props: Props) => {
  const renderTooltip = () => {
    return (
      <ReactionBarSelector
        onSelect={(key: string) => {
          props.onSelect?.(key)
        }}
        reactions={ReactionItems.map((item) => ({
          key: item.key,
          node: item.node,
          label: item.label,
        }))}
        key={props.key}
      />
    )
  }
  return (
    <StyledTooltip
      mouseEnterDelay={0.5}
      title={renderTooltip()}
      overlayStyle={{
        background: 'transparent',
        boxShadow: 'none',
      }}
      color={'transparent'}
    >
      {props?.children}
    </StyledTooltip>
  )
}

const StyledTooltip = styled(Tooltip)(() => {
  return {
    '& .ant-tooltip-arrow': {
      display: 'none',
    },
  }
})

export default ReactionsButton
