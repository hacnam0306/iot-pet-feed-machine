import {
  createEmailContentAction,
  duplicateEmailContentAction,
  getDetailEmailContentAction,
  resendEmailContentAction,
  updateEmailContentAction,
} from './../actions/email-content-management'
import { thunkActionLoading } from '@configs'
import { createSlice } from '@reduxjs/toolkit'
import { IEmailContentItem } from 'src/interfaces/email-content-management'
import {
  deleteEmailContentAction,
  getEmailContentsAction,
} from '../actions/email-content-management'

interface IEmailContentSlice {
  emailContent: {
    emailContents: IEmailContentItem[] | undefined
    limit: number
    page: number
    total: number
  }
  detailEmailContent: IEmailContentItem | undefined
  loadings: Record<string, boolean | undefined>
}

const initialState: IEmailContentSlice = {
  emailContent: {
    emailContents: undefined,
    limit: 0,
    page: 0,
    total: 0,
  },
  detailEmailContent: undefined,
  loadings: {},
}

const emailContentSlice = createSlice({
  name: 'emailContent',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get email contents
    builder.addCase(getEmailContentsAction.pending, (state) => {
      state.loadings[thunkActionLoading.GET_EMAIL_CONTENTS_LOADING] = true
    })
    builder.addCase(getEmailContentsAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_EMAIL_CONTENTS_LOADING] = false
      state.emailContent.emailContents = action.payload?.data?.items
      state.emailContent.limit = action.payload?.data?.limit
      state.emailContent.page = action.payload?.data?.page
      state.emailContent.total = action.payload?.data?.total
    })
    builder.addCase(getEmailContentsAction.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_EMAIL_CONTENTS_LOADING] = false
    })

    // Delete email content
    builder.addCase(deleteEmailContentAction.pending, (state) => {
      state.loadings[thunkActionLoading.DELETE_EMAIL_CONTENT_LOADING] = true
    })
    builder.addCase(deleteEmailContentAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.DELETE_EMAIL_CONTENT_LOADING] = false
    })
    builder.addCase(deleteEmailContentAction.rejected, (state) => {
      state.loadings[thunkActionLoading.DELETE_EMAIL_CONTENT_LOADING] = false
    })

    // Get detail email content
    builder.addCase(getDetailEmailContentAction.pending, (state) => {
      state.loadings[thunkActionLoading.GET_DETAIL_EMAIL_CONTENT_LOADING] = true
    })
    builder.addCase(getDetailEmailContentAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_DETAIL_EMAIL_CONTENT_LOADING] =
        false
      state.detailEmailContent = action.payload?.data
    })
    builder.addCase(getDetailEmailContentAction.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_DETAIL_EMAIL_CONTENT_LOADING] =
        false
    })

    // Create email content
    builder.addCase(createEmailContentAction.pending, (state) => {
      state.loadings[thunkActionLoading.CREATE_EMAIL_CONTENT_LOADING] = true
    })
    builder.addCase(createEmailContentAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.CREATE_EMAIL_CONTENT_LOADING] = false
    })
    builder.addCase(createEmailContentAction.rejected, (state) => {
      state.loadings[thunkActionLoading.CREATE_EMAIL_CONTENT_LOADING] = false
    })

    // Update email content
    builder.addCase(updateEmailContentAction.pending, (state) => {
      state.loadings[thunkActionLoading.UPDATE_EMAIL_CONTENT_LOADING] = true
    })
    builder.addCase(updateEmailContentAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.UPDATE_EMAIL_CONTENT_LOADING] = false
    })
    builder.addCase(updateEmailContentAction.rejected, (state) => {
      state.loadings[thunkActionLoading.UPDATE_EMAIL_CONTENT_LOADING] = false
    })

    // Duplicate email content
    builder.addCase(duplicateEmailContentAction.pending, (state) => {
      state.loadings[thunkActionLoading.DUPLICATE_EMAIL_CONTENT_LOADING] = true
    })
    builder.addCase(duplicateEmailContentAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.DUPLICATE_EMAIL_CONTENT_LOADING] = false
    })
    builder.addCase(duplicateEmailContentAction.rejected, (state) => {
      state.loadings[thunkActionLoading.DUPLICATE_EMAIL_CONTENT_LOADING] = false
    })

    // Resend email content
    builder.addCase(resendEmailContentAction.pending, (state) => {
      state.loadings[thunkActionLoading.RESEND_EMAIL_CONTENT_LOADING] = true
    })
    builder.addCase(resendEmailContentAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.RESEND_EMAIL_CONTENT_LOADING] = false
    })
    builder.addCase(resendEmailContentAction.rejected, (state) => {
      state.loadings[thunkActionLoading.RESEND_EMAIL_CONTENT_LOADING] = false
    })
  },
})

export const emailContentActions = {
  ...emailContentSlice.actions,
}

export default emailContentSlice.reducer
