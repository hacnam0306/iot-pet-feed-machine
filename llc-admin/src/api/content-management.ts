import { ApiClient } from 'src/api/axiosClient'
import {
  ICommonContentDetail,
  IContactData,
  IHomeSEODetail,
  IResponseGetLanding,
  MetaDataCommonContent,
} from 'src/interfaces/aboutus-management'
import {
  IAboutUsDetail,
  IAddAboutUsRequest,
  IAddQuoteRequest,
  IAddRoadMapRequest,
  IBlogSeoData,
  ICommunityDetail,
  IHomepageVideoDetail,
  IQuoteDetail,
  IRoadMapDetail,
  ITermAndPoliciesFormData,
  ITermAndPolicyDetail,
  IUpdateCommunityRequest,
  IUpdateContactRequest,
  IUploadHomepageVideoRequest,
} from 'src/interfaces/content-management'
import {
  IDataBannerTab,
  IMotiveItem,
  IRequestBenefit,
  PackageBenefit,
} from 'src/interfaces/package-page-management'

export const contentManagementAPI = {
  getListAboutUs: async () => {
    return await ApiClient.get<IAboutUsDetail[]>('/common-contents/about-us')
  },
  addNewAboutUs: async (data: Partial<IAddAboutUsRequest>) => {
    return await ApiClient.post<{
      aboutUs: IAboutUsDetail
      message: string
    }>('/common-contents/about-us', data)
  },
  updateAboutUs: async (data: Partial<IAddAboutUsRequest>, id?: number) => {
    return await ApiClient.put<{
      aboutUs: IAboutUsDetail
      message: string
    }>(`/common-contents/about-us/${id}`, data)
  },
  deleteAboutUs: async (id?: number) => {
    return await ApiClient.delete<{
      aboutUs: IAboutUsDetail
      message: string
    }>(`/common-contents/about-us/${id}`)
  },
  getListMemberShip: async () => {
    return await ApiClient.get<IAboutUsDetail[]>('/common-contents/membership')
  },
  addNewMemberShip: async (data: Partial<IAddAboutUsRequest>) => {
    return await ApiClient.post<{
      aboutUs: IAboutUsDetail
      message: string
    }>('/common-contents/membership', data)
  },
  updateMembership: async (data: Partial<IAddAboutUsRequest>, id?: number) => {
    return await ApiClient.put<{
      membership: IAboutUsDetail
      message: string
    }>(`/common-contents/membership/${id}`, data)
  },
  deleteMembership: async (id?: number) => {
    return await ApiClient.delete<{
      aboutUs: IAboutUsDetail
      message: string
    }>(`/common-contents/membership/${id}`)
  },
  getListRoadMap: async () => {
    return await ApiClient.get<IRoadMapDetail[]>('/common-contents/road-map')
  },
  addNewRoadMap: async (data: Partial<IAddRoadMapRequest>) => {
    return await ApiClient.post<{
      roadMap: IRoadMapDetail
      message: string
    }>('/common-contents/road-map', data)
  },
  updateRoadMap: async (data: Partial<IAddRoadMapRequest>, id?: number) => {
    return await ApiClient.put<{
      roadMap: IRoadMapDetail
      message: string
    }>(`/common-contents/road-map/${id}`, data)
  },
  deleteRoadMap: async (id?: number) => {
    return await ApiClient.delete<{
      roadMap: IRoadMapDetail
      message: string
    }>(`/common-contents/road-map/${id}`)
  },
  getListQuotes: async () => {
    return await ApiClient.get<IQuoteDetail[]>('/common-contents/quote')
  },
  addNewQuote: async (data: Partial<IAddQuoteRequest>) => {
    return await ApiClient.post<{
      quote: IQuoteDetail
      message: string
    }>('/common-contents/quote', data)
  },
  updateQuote: async (data: Partial<IAddQuoteRequest>, id?: number) => {
    return await ApiClient.put<{
      quote: IQuoteDetail
      message: string
    }>(`/common-contents/quote/${id}`, data)
  },
  deleteQuote: async (id?: number) => {
    return await ApiClient.delete<{
      message: string
    }>(`/common-contents/quote/${id}`)
  },
  getCommunity: async () => {
    return await ApiClient.get<ICommunityDetail>('/common-contents/community')
  },
  updateCommunityContent: async (data: Partial<IUpdateCommunityRequest>) => {
    return await ApiClient.post<{
      community: ICommunityDetail
      message: string
    }>(`/common-contents/community`, data)
  },
  getHomepageVideo: async () => {
    return await ApiClient.get<IHomepageVideoDetail>(
      '/common-contents/homepage-video'
    )
  },
  updateHomepageVideo: async (data: Partial<IUploadHomepageVideoRequest>) => {
    return await ApiClient.post<{
      homepageVideo: IHomepageVideoDetail
      message: string
    }>(`/common-contents/homepage-video`, data)
  },
  ////Contact
  getContact: async () => {
    return await ApiClient.get<IContactData>('/common-contents/contact')
  },
  updateContact: async (data: Partial<IUpdateContactRequest>) => {
    return await ApiClient.post<{
      contact: IContactData
      message: string
    }>(`/common-contents/contact`, data)
  },
  createTermAndPolicies: async (data: Partial<ITermAndPoliciesFormData>) => {
    return await ApiClient.post<{
      termPolicy: ITermAndPolicyDetail
      message: string
    }>(`/common-contents/term-policy`, data)
  },
  getTermAndPolicies: async () => {
    return await ApiClient.get<ITermAndPolicyDetail>(
      `/common-contents/term-policy`
    )
  },
  // Home SEO
  createHomeSeo: async (data: Partial<MetaDataCommonContent>) => {
    return await ApiClient.post<{
      seoHomePage: IHomeSEODetail
      message: string
    }>(`/common-contents/seo-home-page`, data)
  },
  getHomeSeo: async () => {
    return await ApiClient.get<IHomeSEODetail>(`/common-contents/seo-home-page`)
  },

  // Blog list content
  createUpdateBlogListContent: async (data: Partial<IBlogSeoData>) => {
    return await ApiClient.post<{
      seoListPosts: { metaData: IBlogSeoData }
      message: string
    }>(`/common-contents/seo-list-posts`, data)
  },
  getBlogListContent: async () => {
    return await ApiClient.get<IBlogSeoData>(`/common-contents/seo-list-posts`)
  },

  //package page management
  getPackagePageBanner: async () => {
    return await ApiClient.get<any>(`/common-contents/package-banner`)
  },
  updatePackagePageBanner: async (data: Partial<IDataBannerTab>) => {
    return await ApiClient.post<{
      packageBanner: IResponseGetLanding
      message: string
    }>(`/common-contents/package-banner`, data)
  },

  getPackagePageCommunity: async () => {
    return await ApiClient.get<any>(`/common-contents/package-community`)
  },
  updatePackagePageCommunity: async (data: Partial<IDataBannerTab>) => {
    return await ApiClient.post<{
      packageCommunity: ICommunityDetail
      message: string
    }>(`/common-contents/package-community`, data)
  },
  getPackagePageMotive: async () => {
    return await ApiClient.get<IAboutUsDetail[]>(
      '/common-contents/package-motive'
    )
  },
  addPackagePageMotive: async (data: Partial<IAddAboutUsRequest>) => {
    return await ApiClient.post<{
      aboutUs: IAboutUsDetail
      message: string
    }>('/common-contents/package-motive', data)
  },
  updatePackagePageMotive: async (
    data: Partial<IAddAboutUsRequest>,
    id?: number
  ) => {
    return await ApiClient.put<{
      aboutUs: IAboutUsDetail
      message: string
    }>(`/common-contents/package-motive/${id}`, data)
  },
  deletePackagePageMotive: async (id?: number) => {
    return await ApiClient.delete<{
      aboutUs: IAboutUsDetail
      message: string
    }>(`/common-contents/package-motive/${id}`)
  },
  getPackagePageBenefit: async () => {
    return await ApiClient.get<IAboutUsDetail[]>(
      '/common-contents/package-benefit'
    )
  },
  addPackagePageBenefit: async (data: Partial<IAddAboutUsRequest>) => {
    return await ApiClient.post<{
      aboutUs: IAboutUsDetail
      message: string
    }>('/common-contents/package-benefit', data)
  },
  updatePackagePageBenefit: async (
    data: Partial<IAddAboutUsRequest>,
    id?: number
  ) => {
    return await ApiClient.put<{
      aboutUs: IAboutUsDetail
      message: string
    }>(`/common-contents/package-benefit/${id}`, data)
  },
  deletePackagePageBenefit: async (id?: number) => {
    return await ApiClient.delete<{
      aboutUs: IAboutUsDetail
      message: string
    }>(`/common-contents/package-benefit/${id}`)
  },

  // Package Member
  createPackageMember: async (data: Partial<IAddAboutUsRequest>) => {
    return await ApiClient.post<{
      packageMember: IMotiveItem
      message: string
    }>('/common-contents/package-member', data)
  },
  getPackageMember: async () => {
    return await ApiClient.get<IMotiveItem>('/common-contents/package-member')
  },

  // Package Benefit
  createPackageBenefit: async (data: Partial<IRequestBenefit>) => {
    return await ApiClient.post<{
      packageBenefit: PackageBenefit
      message: string
    }>('/common-contents/package-benefit', data)
  },
  getPackageBenefit: async () => {
    return await ApiClient.get<PackageBenefit>(
      '/common-contents/package-benefit'
    )
  },

  // Package SEO
  createPackageSeo: async (data: Partial<MetaDataCommonContent>) => {
    return await ApiClient.post<{
      seoPackagePage: IHomeSEODetail
      message: string
    }>(`/common-contents/seo-package-page`, data)
  },
  getPackageSeo: async () => {
    return await ApiClient.get<IHomeSEODetail>(
      `/common-contents/seo-package-page`
    )
  },
}
