import { useAppSelector } from '@redux'
import React from 'react'
import { AppModal } from '../AppModal'
import { Spin } from 'antd'
import { XCloseIcon } from '../Icon'
import { Button } from 'src/common'

interface IAddNewBlogProps {
  open: boolean
  content: string
  onSave: () => void
  onClose: () => void
}

const AddNewBlogModal = ({
  open,
  onClose,
  content,
  onSave,
}: IAddNewBlogProps) => {
  const addNewBlogActionLoading = useAppSelector(
    (state) => state.blog?.loadings?.addNewBlogActionLoading
  )
  return (
    <AppModal open={open} onClose={onClose}>
      {addNewBlogActionLoading ? (
        <div className="loading-wrapper flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        <div className="wrapper-sendfile w-[400px] h-auto">
          <div className="flex items-center justify-between ">
            <div>{/* <h1 className="m-0 text-[20px]">Save</h1> */}</div>
            <div className="hover:opacity-75">
              <XCloseIcon width={16} height={16} onClick={onClose} />
            </div>
          </div>

          <div className="mt-6">
            <div>
              <p>{content}</p>
            </div>
            <div className="flex items-center mt-5 justify-end">
              <Button
                type="ghost"
                size="large"
                className="submit__btn login-btn mr-2"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                size="large"
                className="submit__btn login-btn"
                onClick={onSave}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </AppModal>
  )
}

export default AddNewBlogModal
