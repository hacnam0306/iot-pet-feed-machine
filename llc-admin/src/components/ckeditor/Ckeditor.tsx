import { enumCkeditorMode } from '@configs'
import React, { useState } from 'react'
import { Button } from 'src/common'

import ModeEdit from './ModeEdit'
import ModePreview from './ModePreview'

interface Props {
  currentTabName: string
}

const Ckeditor = ({ currentTabName }: Props) => {
  const [mode, setMode] = useState(enumCkeditorMode.PREVIEW)
  const [defaultValue, setDefautValue] = useState(
    '<p>Xin chào mọi người!<br><br>Mình là một Adamor!</p>'
  )
  const handleChangeMode = (newMode: enumCkeditorMode) => {
    if (mode !== newMode) {
      setMode(newMode)
    }
  }

  return (
    <div>
      <div
        className="controlMode"
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '0.5rem',
          marginTop: '1rem',
        }}
      >
        <Button
          type="ghost"
          size="small"
          onClick={() => handleChangeMode(enumCkeditorMode.EDIT)}
          //   className=" ckeditor-mode-btn max-[600px]:!w-full"
          style={{
            backgroundColor:
              mode === enumCkeditorMode.EDIT ? '#69c4ea' : 'white',
            color: 'black',
          }}
        >
          {enumCkeditorMode.EDIT}
        </Button>
        <Button
          type="ghost"
          size="small"
          onClick={() => handleChangeMode(enumCkeditorMode.PREVIEW)}
          //   className=" ckeditor-mode-btn max-[600px]:!w-full"
          style={{
            backgroundColor:
              mode === enumCkeditorMode.PREVIEW ? '#69c4ea' : 'white',
            color: 'black',
          }}
        >
          {enumCkeditorMode.PREVIEW}
        </Button>
      </div>
      <div
        className="ckeditor"
        style={{
          marginTop: '1rem',
        }}
      >
        {mode === enumCkeditorMode.PREVIEW ? (
          <ModePreview data={defaultValue} />
        ) : (
          <ModeEdit
            currentTabName={currentTabName}
            defaultValue={defaultValue}
          />
        )}
      </div>
    </div>
  )
}

export default Ckeditor
