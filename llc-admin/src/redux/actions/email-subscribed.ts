import { createAsyncThunk } from '@reduxjs/toolkit'
import { emailSubscribedAPI } from 'src/api/email-subscribed'

import { IPackageParams } from 'src/interfaces/package-management'

export const getListEmailSubscribedAction = createAsyncThunk(
  'emailSubscribed/getListEmailAction',
  async ({ limit = 10, ...otherParams }: IPackageParams) => {
    try {
      const res = await emailSubscribedAPI.getListEmailSub({
        limit,
        ...otherParams,
      })
      return res
    } catch (error) {
      throw error
    }
  }
)
