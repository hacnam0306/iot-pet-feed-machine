import { createAsyncThunk } from '@reduxjs/toolkit'
import { userLogAPI } from 'src/api/user-log'
import { IFetchUserLogByUserIdParams } from 'src/interfaces/user-log'
import { ICommonGetParams } from 'src/interfaces'

export const getUserLogByUserIdAction = createAsyncThunk(
  'userLog/getUserLogByUserIdAction',
  async (payload: IFetchUserLogByUserIdParams, { fulfillWithValue }) => {
    try {
      const res = await userLogAPI.getUserLogByUserId(payload)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const getUserLogByIdAction = createAsyncThunk(
  'userLog/getUserLogByIdAction',
  async (id: string) => {
    try {
      const res = await userLogAPI.getUserLogById(id)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const getTransactionsAction = createAsyncThunk(
  'userLog/getTransactionsAction',
  async ({ limit = 10, ...params }: ICommonGetParams & { id: number }) => {
    try {
      const res = await userLogAPI.getTransactionHistories({
        limit,
        ...params,
      })
      return res.data
    } catch (error) {
      throw error
    }
  }
)
