import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

interface IIconGroupProps {
  addEmoji: (e: any) => void
}

const IconGroup = ({ addEmoji }: IIconGroupProps) => {
  const [showEmojis, setShowEmojis] = useState(false)
  const wrapperRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as HTMLElement)
      ) {
        setShowEmojis(false)
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [wrapperRef])

  return (
    <div
      data-tw-placement="top-end"
      className="icon-group dropdown-icon relative mr-3 sm:mr-5 h-6"
    >
      <StyledButton
        className="button"
        onClick={() => setShowEmojis(!showEmojis)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </StyledButton>
      {showEmojis && (
        <div
          className="wrapper-icon-group absolute mr-3 sm:mr-5 bottom-3 right-0"
          ref={wrapperRef as any}
        >
          <Picker
            data={data}
            onEmojiSelect={(e: any) => {
              addEmoji(e)
              //   setShowEmojis(false)
            }}
          />
        </div>
      )}
    </div>
  )
}

export default IconGroup

const StyledButton = styled.button`
  .icon {
    height: 24px;
    width: 24px;
  }

  .button {
    background: transparent;
    outline: none;
    border: none;
  }
`
