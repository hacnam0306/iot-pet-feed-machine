import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { Button } from 'antd'
import React, { useState } from 'react'

interface EditorProps {
  currentTabName: string
  defaultValue: string
}

const ModeEdit: React.FC<EditorProps> = ({ currentTabName, defaultValue }) => {
  const [editorData, setEditorData] = useState('')
  return (
    <div>
      <div>
        <CKEditor
          editor={ClassicEditor}
          data={editorData}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            // console.log('Editor is ready to use!', editor)
          }}
          onChange={(event, editor) => {
            const data = editor.getData()
            // console.log({ event, editor, data })
            setEditorData(data)
          }}
          onBlur={(event, editor) => {
            // console.log('Blur.', editor)
          }}
          onFocus={(event, editor) => {
            // console.log('Focus.', editor)
          }}
        />
      </div>
      <div
        className="completeMode"
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '0.5rem',
          marginTop: '1rem',
          justifyContent: 'flex-end',
        }}
      >
        <Button type="ghost" size="small">
          Cancel
        </Button>
        <Button type="ghost" size="small">
          Save
        </Button>
      </div>
    </div>
  )
}

export default ModeEdit
