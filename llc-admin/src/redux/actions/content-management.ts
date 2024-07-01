import { createAsyncThunk } from '@reduxjs/toolkit'
import { contentManagementAPI } from 'src/api/content-management'
import { MetaDataCommonContent } from 'src/interfaces/aboutus-management'
import {
  IAddAboutUsRequest,
  IAddQuoteRequest,
  IAddRoadMapRequest,
  IBlogSeoData,
  ITermAndPolicyDetail,
  IUpdateCommunityRequest,
  IUpdateContactRequest,
  IUploadHomepageVideoRequest,
} from 'src/interfaces/content-management'
import { IDataBannerTab } from 'src/interfaces/package-page-management'

export const getListAboutUs = createAsyncThunk('aboutUs/getList', async () => {
  try {
    const res = await contentManagementAPI.getListAboutUs()
    return res.data
  } catch (error) {
    throw error
  }
})

export const addNewAboutUs = createAsyncThunk(
  'aboutUs/addNew',
  async (payload: Partial<IAddAboutUsRequest>) => {
    try {
      const res = await contentManagementAPI.addNewAboutUs(payload)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const updateAboutUs = createAsyncThunk(
  'aboutUs/update',
  async (data: Partial<IAddAboutUsRequest & { id: number }>) => {
    try {
      const id = data.id
      delete data.id
      const res = await contentManagementAPI.updateAboutUs(data, id)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const deleteAboutUs = createAsyncThunk(
  'aboutUs/delete',
  async (id?: number) => {
    try {
      const res = await contentManagementAPI.deleteAboutUs(id)
      return res
    } catch (error) {
      throw error
    }
  }
)
export const getListMembership = createAsyncThunk(
  'membership/getList',
  async () => {
    try {
      const res = await contentManagementAPI.getListMemberShip()
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const addNewMemberShip = createAsyncThunk(
  'membership/addNew',
  async (payload: Partial<IAddAboutUsRequest>) => {
    try {
      const res = await contentManagementAPI.addNewMemberShip(payload)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const updateMembership = createAsyncThunk(
  'membership/update',
  async (data: Partial<IAddAboutUsRequest & { id: number }>) => {
    try {
      const id = data.id
      delete data.id
      const res = await contentManagementAPI.updateMembership(data, id)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const deleteMembership = createAsyncThunk(
  'membership/delete',
  async (id?: number) => {
    try {
      const res = await contentManagementAPI.deleteMembership(id)
      return res
    } catch (error) {
      throw error
    }
  }
)
export const getListRoadMap = createAsyncThunk('roadMap/getList', async () => {
  try {
    const res = await contentManagementAPI.getListRoadMap()
    return res.data
  } catch (error) {
    throw error
  }
})

export const addNewRoadMap = createAsyncThunk(
  'roadmap/addNew',
  async (payload: Partial<IAddRoadMapRequest>) => {
    try {
      const res = await contentManagementAPI.addNewRoadMap(payload)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const updateRoadMap = createAsyncThunk(
  'roadmap/update',
  async (data: Partial<IAddRoadMapRequest & { id: number }>) => {
    try {
      const id = data.id
      delete data.id
      const res = await contentManagementAPI.updateRoadMap(data, id)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const deleteRoadMap = createAsyncThunk(
  'roadmap/update',
  async (id?: number) => {
    try {
      const res = await contentManagementAPI.deleteRoadMap(id)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const getListQuotes = createAsyncThunk('quote/getList', async () => {
  try {
    const res = await contentManagementAPI.getListQuotes()
    return res.data
  } catch (error) {
    throw error
  }
})

export const addNewQuote = createAsyncThunk(
  'quote/addNew',
  async (payload: Partial<IAddQuoteRequest>) => {
    try {
      const res = await contentManagementAPI.addNewQuote(payload)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const updateQuote = createAsyncThunk(
  'quote/update',
  async (data: Partial<IAddQuoteRequest & { id: number }>) => {
    try {
      const id = data.id
      delete data.id
      const res = await contentManagementAPI.updateQuote(data, id)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const deleteQuote = createAsyncThunk(
  'quote/delete',
  async (id?: number) => {
    try {
      const res = await contentManagementAPI.deleteQuote(id)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const getCommunityContent = createAsyncThunk(
  'community/getDetail',
  async () => {
    try {
      const res = await contentManagementAPI.getCommunity()
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const updateCommunity = createAsyncThunk(
  'community/update',
  async (data: Partial<IUpdateCommunityRequest>) => {
    try {
      const res = await contentManagementAPI.updateCommunityContent(data)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const getHomepageVideo = createAsyncThunk(
  'homepageVideo/getDetail',
  async () => {
    try {
      const res = await contentManagementAPI.getHomepageVideo()
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const updateHomepageVideo = createAsyncThunk(
  'homepageVideo/update',
  async (data: Partial<IUploadHomepageVideoRequest>) => {
    try {
      const res = await contentManagementAPI.updateHomepageVideo(data)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

////Contact
export const getContact = createAsyncThunk('Contact/getDetail', async () => {
  try {
    const res = await contentManagementAPI.getContact()
    return res
  } catch (error) {
    throw error
  }
})

export const updateContact = createAsyncThunk(
  'Contact/update',
  async (data: Partial<IUpdateContactRequest>) => {
    try {
      const res = await contentManagementAPI.updateContact(data)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const createTermAndPolicies = createAsyncThunk(
  'termAndPolicy/create',
  async (data: Partial<ITermAndPolicyDetail>) => {
    try {
      const res = await contentManagementAPI.createTermAndPolicies(data)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const getTermAndPolicies = createAsyncThunk(
  'termAndPolicy/getDetail',
  async () => {
    try {
      const res = await contentManagementAPI.getTermAndPolicies()
      return res
    } catch (error) {
      throw error
    }
  }
)

export const createHomeSeo = createAsyncThunk(
  'homeSeo/create',
  async (data: Partial<MetaDataCommonContent>) => {
    try {
      const res = await contentManagementAPI.createHomeSeo(data)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const getHomeSeo = createAsyncThunk('homeSeo/getDetail', async () => {
  try {
    const res = await contentManagementAPI.getHomeSeo()
    return res
  } catch (error) {
    throw error
  }
})

export const createUpdateBlogListContentAction = createAsyncThunk(
  'blogListContent/createUpdate',
  async (data: Partial<IBlogSeoData>) => {
    try {
      const res = await contentManagementAPI.createUpdateBlogListContent(data)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const getBlogListContentAction = createAsyncThunk(
  'blogListContent/getDetail',
  async () => {
    try {
      const res = await contentManagementAPI.getBlogListContent()
      return res
    } catch (error) {
      throw error
    }
  }
)
//package page management

export const getBannerPackageAction = createAsyncThunk(
  'package_page/getBanner',
  async () => {
    try {
      const res = await contentManagementAPI.getPackagePageBanner()
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const updateBannerPackageAction = createAsyncThunk(
  'package_page/updateBanner',
  async (data: Partial<IDataBannerTab>) => {
    try {
      const res = await contentManagementAPI.updatePackagePageBanner(data)
      return res.data
    } catch (error) {
      throw error
    }
  }
)
export const getCommunityPackageAction = createAsyncThunk(
  'package_page/getCommunity',
  async () => {
    try {
      const res = await contentManagementAPI.getPackagePageCommunity()
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const updateCommunityPackageAction = createAsyncThunk(
  'package_page/updateCommunity',
  async (data: Partial<any>) => {
    try {
      const res = await contentManagementAPI.updatePackagePageCommunity(data)
      return res.data
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

// Package Benefit
export const createPackageBenefit = createAsyncThunk(
  'packageBenefit/create',
  async (data: Partial<IDataBannerTab>) => {
    try {
      const res = await contentManagementAPI.createPackageBenefit(data)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const getPackageBenefit = createAsyncThunk(
  'packageBenefit/getDetail',
  async () => {
    try {
      const res = await contentManagementAPI.getPackageBenefit()
      return res
    } catch (error) {
      throw error
    }
  }
)
// Package Member
export const createPackageMember = createAsyncThunk(
  'packageMember/create',
  async (data: Partial<IDataBannerTab>) => {
    try {
      const res = await contentManagementAPI.createPackageMember(data)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const getPackageMember = createAsyncThunk(
  'packageMember/getDetail',
  async () => {
    try {
      const res = await contentManagementAPI.getPackageMember()
      return res
    } catch (error) {
      throw error
    }
  }
)
// Package SEO
export const createPackageSeo = createAsyncThunk(
  'packageSeo/create',
  async (data: Partial<MetaDataCommonContent>) => {
    try {
      const res = await contentManagementAPI.createPackageSeo(data)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const getPackageSeo = createAsyncThunk(
  'packageSeo/getDetail',
  async () => {
    try {
      const res = await contentManagementAPI.getPackageSeo()
      return res
    } catch (error) {
      throw error
    }
  }
)
