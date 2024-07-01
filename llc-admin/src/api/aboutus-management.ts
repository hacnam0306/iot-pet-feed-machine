import { ApiClient } from 'src/api/axiosClient'
import {
  AboutUsLanding,
  IAddCEOQuotesRequest,
  IAddLandingParams,
  IAddProvidingRequest,
  IAddSimpleQuoteRequest,
  IAddUpdateAboutUsPageSeoResponse,
  ICommonContentDetail,
  IOurStoryFormData,
  IOurStoryItem,
  IResponseCreateAndUpdateOurStory,
  IResponseGetLanding,
  ISeoMetaData,
} from 'src/interfaces/aboutus-management'
const baseUrl = '/common-contents/'

export const aboutUsManagementAPI = {
  ////PROVIDING
  getListProviding: async () => {
    return await ApiClient.get<ICommonContentDetail[]>(
      '/common-contents/about-us-providing-value'
    )
  },
  addNewProviding: async (data: Partial<IAddProvidingRequest>) => {
    return await ApiClient.post<{
      aboutUsProvidingValue: ICommonContentDetail
      message: string
    }>('/common-contents/about-us-providing-value', data)
  },
  updateProviding: async (data: Partial<IAddProvidingRequest>, id?: number) => {
    return await ApiClient.put<{
      aboutUsProvidingValue: ICommonContentDetail
      message: string
    }>(`/common-contents/about-us-providing-value/${id}`, data)
  },
  deleteProviding: async (id?: number) => {
    return await ApiClient.delete<{
      aboutUsProvidingValue: ICommonContentDetail
      message: string
    }>(`/common-contents/about-us-providing-value/${id}`)
  },

  // Landing
  createLanding: async (params: IAddLandingParams) => {
    return await ApiClient.post<AboutUsLanding>(
      `${baseUrl}about-us-landing`,
      params
    )
  },
  getLanding: async () => {
    return await ApiClient.get<IResponseGetLanding>(
      `${baseUrl}about-us-landing`
    )
  },

  // Our Story
  getListOurStory: async () => {
    return await ApiClient.get<IOurStoryItem>(`${baseUrl}about-us-our-story`)
  },

  getListOurStoryById: async (itemId: number) => {
    return await ApiClient.get<IOurStoryItem>(
      `${baseUrl}about-us-our-story/${itemId}`
    )
  },

  createOutStory: async (params: IOurStoryFormData) => {
    return await ApiClient.post<IResponseCreateAndUpdateOurStory>(
      `${baseUrl}about-us-our-story`,
      params
    )
  },

  updateOurStory: async (itemId: number, params: IOurStoryFormData) => {
    return await ApiClient.put<
      IResponseCreateAndUpdateOurStory,
      IOurStoryFormData
    >(`${baseUrl}about-us-our-story/${itemId}`, params)
  },

  deleteOurStory: async (itemId: number) => {
    return await ApiClient.delete<{ message: string }>(
      `${baseUrl}about-us-our-story/${itemId}`
    )
  },
  ////PROVIDING
  getListSimpleQuote: async () => {
    return await ApiClient.get<ICommonContentDetail[]>(
      '/common-contents/about-us-simple-quote'
    )
  },
  addNewSimpleQuote: async (data: Partial<IAddSimpleQuoteRequest>) => {
    return await ApiClient.post<{
      aboutUsSimpleQuote: ICommonContentDetail
      message: string
    }>('/common-contents/about-us-simple-quote', data)
  },
  updateSimpleQuote: async (
    data: Partial<IAddSimpleQuoteRequest>,
    id?: number
  ) => {
    return await ApiClient.put<{
      aboutUsSimpleQuote: ICommonContentDetail
      message: string
    }>(`/common-contents/about-us-simple-quote/${id}`, data)
  },
  deleteSimpleQuote: async (id?: number) => {
    return await ApiClient.delete<{
      aboutUsSimpleQuote: ICommonContentDetail
      message: string
    }>(`/common-contents/about-us-simple-quote/${id}`)
  },
  ////CEO Quotes
  getListCEOQuotes: async () => {
    return await ApiClient.get<ICommonContentDetail[]>(
      '/common-contents/about-us-ceo-quote'
    )
  },
  addNewCEOQuotes: async (data: Partial<IAddCEOQuotesRequest>) => {
    return await ApiClient.post<{
      aboutUsCeoQuote: ICommonContentDetail
      message: string
    }>('/common-contents/about-us-ceo-quote', data)
  },
  updateCEOQuotes: async (data: Partial<IAddCEOQuotesRequest>, id?: number) => {
    return await ApiClient.put<{
      aboutUsCeoQuote: ICommonContentDetail
      message: string
    }>(`/common-contents/about-us-ceo-quote/${id}`, data)
  },
  deleteCEOQuotes: async (id?: number) => {
    return await ApiClient.delete<{
      aboutUsCeoQuote: ICommonContentDetail
      message: string
    }>(`/common-contents/about-us-ceo-quote/${id}`)
  },
  // Core Value
  getListCoreValue: async () => {
    return await ApiClient.get<ICommonContentDetail[]>(
      `${baseUrl}about-us-core-value`
    )
  },

  addNewCoreValue: async (data: Partial<ICommonContentDetail>) => {
    return await ApiClient.post<{
      aboutUsCoreValue: ICommonContentDetail
      message: string
    }>(`${baseUrl}about-us-core-value`, data)
  },

  updateCoreValue: async (data: Partial<ICommonContentDetail>, id?: number) => {
    return await ApiClient.put<{
      aboutUsCoreValue: ICommonContentDetail
      message: string
    }>(`${baseUrl}about-us-core-value/${id}`, data)
  },

  deleteCoreValue: async (id?: number) => {
    return await ApiClient.delete<{
      aboutUsCoreValue: ICommonContentDetail
      message: string
    }>(`${baseUrl}about-us-core-value/${id}`)
  },

  getAboutUsPageSeo: async () => {
    return await ApiClient.get<ISeoMetaData>(`${baseUrl}seo-about-us`)
  },

  updateAboutUsPageSeo: async (data: Partial<ISeoMetaData>) => {
    return await ApiClient.post<IAddUpdateAboutUsPageSeoResponse>(
      `${baseUrl}seo-about-us`,
      data
    )
  },

  getOurVision: async () => {
    return await ApiClient.get<ICommonContentDetail>(
      `${baseUrl}about-us-our-vision`
    )
  },

  getOurMission: async () => {
    return await ApiClient.get<ICommonContentDetail>(
      `${baseUrl}about-us-our-mission`
    )
  },

  addUpdateOurVision: async (data: Partial<ICommonContentDetail>) => {
    return await ApiClient.post<{
      aboutUsOurVision: ICommonContentDetail
      message: string
    }>(`${baseUrl}about-us-our-vision`, data)
  },

  addUpdateOurMission: async (data: Partial<ICommonContentDetail>) => {
    return await ApiClient.post<{
      aboutUsOurMission: ICommonContentDetail
      message: string
    }>(`${baseUrl}about-us-our-mission`, data)
  },
}
//aboutUsOurStory
