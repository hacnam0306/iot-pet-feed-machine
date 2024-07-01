import { createAsyncThunk } from '@reduxjs/toolkit'
import { contentManagementAPI } from 'src/api/content-management'

import { packageManagementAPI } from 'src/api/package-management'
import { IAddAboutUsRequest } from 'src/interfaces/content-management'
import { IPackage, IPackageParams } from 'src/interfaces/package-management'

export const getPackageBenefitsAction = createAsyncThunk(
  'package/getPackageBenefitsAction',
  async () => {
    try {
      const res = await packageManagementAPI.getPackageBenefits()
      return res
    } catch (error) {
      throw error
    }
  }
)

export const getListPackageAction = createAsyncThunk(
  'package/getListPackageAction',
  async ({ limit = 10, ...otherParams }: IPackageParams) => {
    try {
      const res = await packageManagementAPI.getListPackage({
        limit,
        ...otherParams,
      })
      return res
    } catch (error) {
      throw error
    }
  }
)

export const createPackageAction = createAsyncThunk(
  'package/createPackageAction',
  async ({ packageBenefitItems = [], ...otherPayload }: IPackage) => {
    try {
      const res = await packageManagementAPI.createPackage({
        packageBenefitItems,
        ...otherPayload,
      })
      return res
    } catch (error) {
      throw error
    }
  }
)

export const getPackageByIdAction = createAsyncThunk(
  'package/getPackageByIdAction',
  async (id: number | string) => {
    try {
      const res = await packageManagementAPI.getPackageById(id)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const updatePackageAction = createAsyncThunk(
  'package/updatePackageAction',
  async (payload: IPackage) => {
    try {
      const res = await packageManagementAPI.updatePackage(payload)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const deletePackageAction = createAsyncThunk(
  'package/deletePackageAction',
  async (id: number | string) => {
    try {
      const res = await packageManagementAPI.deletePackage(id)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const getMotivePackageAction = createAsyncThunk(
  'package_page/getListMotive',
  async () => {
    try {
      const res = await contentManagementAPI.getPackagePageMotive()
      return res.data
    } catch (error) {
      throw error
    }
  }
)
export const getBenefitAction = createAsyncThunk(
  'package_page/getListBenefit',
  async () => {
    try {
      const res = await contentManagementAPI.getPackagePageBenefit()
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const deleteMotivePackageAction = createAsyncThunk(
  'package_page/deleteMotive',
  async (id?: number) => {
    try {
      const res = await contentManagementAPI.deletePackagePageMotive(id)
      return res
    } catch (error) {
      throw error
    }
  }
)
export const deleteBenefitPackageAction = createAsyncThunk(
  'package_page/deleteBenefit',
  async (id?: number) => {
    try {
      const res = await contentManagementAPI.deletePackagePageBenefit(id)
      return res
    } catch (error) {
      throw error
    }
  }
)
export const updateMotivePackageAction = createAsyncThunk(
  'package_page/updateMotive',
  async (data: Partial<IAddAboutUsRequest & { id: number }>) => {
    try {
      const id = data.id
      delete data.id
      const res = await contentManagementAPI.updatePackagePageMotive(data, id)
      return res.data
    } catch (error) {
      throw error
    }
  }
)
export const updateBenefitPackageAction = createAsyncThunk(
  'package_page/updateBenefit',
  async (data: Partial<IAddAboutUsRequest & { id: number }>) => {
    try {
      const id = data.id
      delete data.id
      const res = await contentManagementAPI.updatePackagePageBenefit(data, id)
      return res.data
    } catch (error) {
      throw error
    }
  }
)
export const addNewMotivePackageAction = createAsyncThunk(
  'package_page/addNewMotive',
  async (payload: Partial<IAddAboutUsRequest>) => {
    try {
      const res = await contentManagementAPI.addPackagePageMotive(payload)
      return res.data
    } catch (error) {
      throw error
    }
  }
)
export const addNewBenefitPackageAction = createAsyncThunk(
  'package_page/addNewBenefit',
  async (payload: Partial<IAddAboutUsRequest>) => {
    try {
      const res = await contentManagementAPI.addPackagePageBenefit(payload)
      return res.data
    } catch (error) {
      throw error
    }
  }
)
