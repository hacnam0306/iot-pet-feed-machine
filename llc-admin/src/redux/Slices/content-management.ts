import { thunkActionLoading } from '@configs'
import { createSlice } from '@reduxjs/toolkit'
import {
  AboutUsLanding,
  ICommonContentDetail,
  IContactData,
  IHomeSEODetail,
} from 'src/interfaces/aboutus-management'
import {
  IAboutUsDetail,
  ICommunityDetail,
  IRoadMapDetail,
  IQuoteDetail,
  IHomepageVideoDetail,
  ITermAndPolicyDetail,
  IBlogSeoData,
} from 'src/interfaces/content-management'
import { RootState } from '.'
import {
  addNewQuote,
  createHomeSeo,
  createPackageBenefit,
  createPackageMember,
  createPackageSeo,
  createTermAndPolicies,
  createUpdateBlogListContentAction,
  getBannerPackageAction,
  getBlogListContentAction,
  getCommunityContent,
  getCommunityPackageAction,
  getContact,
  getHomeSeo,
  getHomepageVideo,
  getListAboutUs,
  getListMembership,
  getListQuotes,
  getListRoadMap,
  getMotivePackageAction,
  getPackageBenefit,
  getPackageMember,
  getPackageSeo,
  getTermAndPolicies,
  updateBannerPackageAction,
  updateCommunity,
  updateCommunityPackageAction,
  updateContact,
  updateHomepageVideo,
  updateQuote,
} from '../actions/content-management'
import { IMotiveItem } from 'src/interfaces/package-page-management'
import { PackageBenefit } from 'src/interfaces/package-page-management'
import { getBenefitAction } from '../actions/package-management'

interface IContent {
  aboutUs: IAboutUsDetail[]
  roadMap: IRoadMapDetail[]
  quote: IQuoteDetail[]
  homepageVideo: IHomepageVideoDetail | null
  contact: IContactData | null
  community: ICommunityDetail | null
  termAndPolicies: ITermAndPolicyDetail | null
  homeSeo: IHomeSEODetail | null
  blogContent: IBlogSeoData | null
  loadings: Record<string, boolean | undefined>
  packagePage: {
    banner: AboutUsLanding | null
    community: ICommunityDetail | null
    motive: IAboutUsDetail[]
    benefit: IAboutUsDetail[]
    member: IMotiveItem | null
    seo: IHomeSEODetail | null
  }
}

const initialState: IContent = {
  aboutUs: [],
  roadMap: [],
  quote: [],
  contact: null,
  homepageVideo: null,
  community: null,
  termAndPolicies: null,
  homeSeo: null,
  blogContent: null,
  packagePage: {
    banner: null,
    community: null,
    motive: [],
    benefit: [],
    member: null,
    seo: null,
  },
  loadings: {},
}

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListAboutUs.pending, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_ABOUT_US] = true
    })
    builder.addCase(getListAboutUs.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_ABOUT_US] = false
    })
    builder.addCase(getListAboutUs.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_LIST_ABOUT_US] = false
      state.aboutUs = action.payload
    })
    builder.addCase(getListMembership.pending, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_MEMBERSHIP] = true
    })
    builder.addCase(getListMembership.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_MEMBERSHIP] = false
    })
    builder.addCase(getListMembership.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_LIST_MEMBERSHIP] = false
      state.aboutUs = action.payload
    })
    builder.addCase(getListRoadMap.pending, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_ROAD_MAP] = true
    })
    builder.addCase(getListRoadMap.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_ROAD_MAP] = false
    })
    builder.addCase(getListRoadMap.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_LIST_ROAD_MAP] = false
      state.roadMap = action.payload
    })
    builder.addCase(getListQuotes.pending, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_QUOTE_LOADING] = true
    })
    builder.addCase(getListQuotes.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_QUOTE_LOADING] = false
    })
    builder.addCase(getListQuotes.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_LIST_QUOTE_LOADING] = false
      state.quote = action.payload
    })
    builder.addCase(addNewQuote.pending, (state) => {
      state.loadings[thunkActionLoading.ADD_QUOTE_LOADING] = true
    })
    builder.addCase(addNewQuote.rejected, (state) => {
      state.loadings[thunkActionLoading.ADD_QUOTE_LOADING] = false
    })
    builder.addCase(addNewQuote.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.ADD_QUOTE_LOADING] = false
    })
    builder.addCase(updateQuote.pending, (state) => {
      state.loadings[thunkActionLoading.ADD_QUOTE_LOADING] = true
    })
    builder.addCase(updateQuote.rejected, (state) => {
      state.loadings[thunkActionLoading.ADD_QUOTE_LOADING] = false
    })
    builder.addCase(updateQuote.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.ADD_QUOTE_LOADING] = false
    })
    builder.addCase(getCommunityContent.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_LIST_COMMUNITY_CONTENT_LOADING] =
        false
      state.community = action.payload
    })
    builder.addCase(getCommunityContent.pending, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_COMMUNITY_CONTENT_LOADING] =
        true
    })
    builder.addCase(getCommunityContent.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_COMMUNITY_CONTENT_LOADING] =
        false
    })
    builder.addCase(updateCommunity.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.UPDATE_COMMUNITY_LOADING] = false
      state.community = action.payload.community
    })
    builder.addCase(updateCommunity.pending, (state) => {
      state.loadings[thunkActionLoading.UPDATE_COMMUNITY_LOADING] = true
    })
    builder.addCase(updateCommunity.rejected, (state) => {
      state.loadings[thunkActionLoading.UPDATE_COMMUNITY_LOADING] = false
    })
    builder.addCase(getHomepageVideo.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_LIST_HOMEPAGE_VIDEO_LOADING] = false
      state.homepageVideo = action.payload
    })
    builder.addCase(getHomepageVideo.pending, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_HOMEPAGE_VIDEO_LOADING] = true
    })
    builder.addCase(getHomepageVideo.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_HOMEPAGE_VIDEO_LOADING] = false
    })
    builder.addCase(updateHomepageVideo.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.UPDATE_HOMEPAGE_VIDEO_LOADING] = false
      state.homepageVideo = action.payload.homepageVideo
    })
    builder.addCase(updateHomepageVideo.pending, (state) => {
      state.loadings[thunkActionLoading.UPDATE_HOMEPAGE_VIDEO_LOADING] = true
    })
    builder.addCase(updateHomepageVideo.rejected, (state) => {
      state.loadings[thunkActionLoading.UPDATE_HOMEPAGE_VIDEO_LOADING] = false
    })
    builder.addCase(getContact.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_CONTACT_LOADING] = false
      state.contact = action.payload?.data
    })
    builder.addCase(getContact.pending, (state) => {
      state.loadings[thunkActionLoading.GET_CONTACT_LOADING] = true
    })
    builder.addCase(getContact.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_CONTACT_LOADING] = false
    })
    builder.addCase(updateContact.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.UPDATE_CONTACT_LOADING] = false
      state.contact = action.payload.contact
    })
    builder.addCase(updateContact.pending, (state) => {
      state.loadings[thunkActionLoading.UPDATE_CONTACT_LOADING] = true
    })
    builder.addCase(updateContact.rejected, (state) => {
      state.loadings[thunkActionLoading.UPDATE_CONTACT_LOADING] = false
    })
    builder.addCase(createTermAndPolicies.pending, (state) => {
      state.loadings[thunkActionLoading.CREATE_TERM_AND_POLICY_LOADING] = true
    })
    builder.addCase(createTermAndPolicies.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.CREATE_TERM_AND_POLICY_LOADING] = false
      state.termAndPolicies = action.payload?.data?.termPolicy
    })
    builder.addCase(createTermAndPolicies.rejected, (state) => {
      state.loadings[thunkActionLoading.CREATE_TERM_AND_POLICY_LOADING] = false
    })
    builder.addCase(getTermAndPolicies.pending, (state) => {
      state.loadings[thunkActionLoading.GET_TERM_AND_POLICY_LOADING] = true
    })
    builder.addCase(getTermAndPolicies.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_TERM_AND_POLICY_LOADING] = false
      state.termAndPolicies = action.payload?.data
    })
    builder.addCase(getTermAndPolicies.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_TERM_AND_POLICY_LOADING] = false
    })
    builder.addCase(createHomeSeo.pending, (state) => {
      state.loadings[thunkActionLoading.CREATE_HOME_SEO_LOADING] = true
    })
    builder.addCase(createHomeSeo.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.CREATE_HOME_SEO_LOADING] = false
      state.homeSeo = action.payload?.data?.seoHomePage
    })
    builder.addCase(createHomeSeo.rejected, (state) => {
      state.loadings[thunkActionLoading.CREATE_HOME_SEO_LOADING] = false
    })
    builder.addCase(getHomeSeo.pending, (state) => {
      state.loadings[thunkActionLoading.GET_HOME_SEO_LOADING] = true
    })
    builder.addCase(getHomeSeo.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_HOME_SEO_LOADING] = false
      state.homeSeo = action.payload.data
    })
    builder.addCase(getHomeSeo.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_HOME_SEO_LOADING] = false
    })
    builder.addCase(createUpdateBlogListContentAction.pending, (state) => {
      state.loadings[
        thunkActionLoading.CREATE_UPDATE_BLOG_LIST_CONTENT_LOADING
      ] = true
    })
    builder.addCase(
      createUpdateBlogListContentAction.fulfilled,
      (state, action) => {
        state.loadings[
          thunkActionLoading.CREATE_UPDATE_BLOG_LIST_CONTENT_LOADING
        ] = false
        state.blogContent = action.payload?.data?.seoListPosts?.metaData
      }
    )
    builder.addCase(createUpdateBlogListContentAction.rejected, (state) => {
      state.loadings[
        thunkActionLoading.CREATE_UPDATE_BLOG_LIST_CONTENT_LOADING
      ] = false
    })
    builder.addCase(getBlogListContentAction.pending, (state) => {
      state.loadings[thunkActionLoading.GET_BLOG_LIST_CONTENT_LOADING] = true
    })
    builder.addCase(getBlogListContentAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_BLOG_LIST_CONTENT_LOADING] = false
      state.blogContent = action.payload?.data
    })
    builder.addCase(getBlogListContentAction.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_BLOG_LIST_CONTENT_LOADING] = false
    })

    //// package page banner

    builder.addCase(getBannerPackageAction.pending, (state) => {
      state.loadings[thunkActionLoading.GET_PACKAGE_BANNER_LOADING] = true
    })
    builder.addCase(getBannerPackageAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_PACKAGE_BANNER_LOADING] = false
      state.packagePage = {
        ...state.packagePage,
        banner: action.payload,
      }
    })
    builder.addCase(getBannerPackageAction.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_PACKAGE_BANNER_LOADING] = false
    })
    builder.addCase(updateBannerPackageAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.UPDATE_PACKAGE_BANNER_LOADING] = false
      state.packagePage = {
        ...state.packagePage,
        banner: action.payload.packageBanner,
      }
    })
    builder.addCase(updateBannerPackageAction.pending, (state) => {
      state.loadings[thunkActionLoading.UPDATE_PACKAGE_BANNER_LOADING] = true
    })
    builder.addCase(updateBannerPackageAction.rejected, (state) => {
      state.loadings[thunkActionLoading.UPDATE_PACKAGE_BANNER_LOADING] = false
    })

    //// package page  community

    builder.addCase(getCommunityPackageAction.pending, (state) => {
      state.loadings[thunkActionLoading.GET_COMMUNITY_BANNER_LOADING] = true
    })
    builder.addCase(getCommunityPackageAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_COMMUNITY_BANNER_LOADING] = false
      state.packagePage = {
        ...state.packagePage,
        community: action.payload,
      }
    })
    builder.addCase(getCommunityPackageAction.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_COMMUNITY_BANNER_LOADING] = false
    })
    builder.addCase(updateCommunityPackageAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.UPDATE_COMMUNITY_BANNER_LOADING] = false
      state.packagePage = {
        ...state.packagePage,
        community: action.payload.packageCommunity,
      }
    })
    builder.addCase(updateCommunityPackageAction.pending, (state) => {
      state.loadings[thunkActionLoading.UPDATE_COMMUNITY_BANNER_LOADING] = true
    })
    builder.addCase(updateCommunityPackageAction.rejected, (state) => {
      state.loadings[thunkActionLoading.UPDATE_COMMUNITY_BANNER_LOADING] = false
    })
    ///motive

    builder.addCase(getMotivePackageAction.pending, (state) => {
      state.loadings[thunkActionLoading.GET_PACKAGE_MOTIVE_LOADING] = true
    })
    builder.addCase(getMotivePackageAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_PACKAGE_MOTIVE_LOADING] = false
      state.packagePage = {
        ...state.packagePage,
        motive: action.payload,
      }
    })
    builder.addCase(getBenefitAction.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_PACKAGE_BENEFIT_LOADING] = false
    })
    //benefit
    builder.addCase(getBenefitAction.pending, (state) => {
      state.loadings[thunkActionLoading.GET_PACKAGE_BENEFIT_LOADING] = true
    })
    builder.addCase(getBenefitAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_PACKAGE_BENEFIT_LOADING] = false
      state.packagePage = {
        ...state.packagePage,
        benefit: action.payload,
      }
    })
    builder.addCase(getMotivePackageAction.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_PACKAGE_MOTIVE_LOADING] = false
    })
    // Package Benefit
    builder.addCase(createPackageBenefit.pending, (state) => {
      state.loadings[thunkActionLoading.CREATE_PACKAGE_BENEFIT_LOADING] = true
    })

    builder.addCase(createPackageBenefit.rejected, (state) => {
      state.loadings[thunkActionLoading.CREATE_PACKAGE_BENEFIT_LOADING] = false
    })
    builder.addCase(getPackageBenefit.pending, (state) => {
      state.loadings[thunkActionLoading.GET_PACKAGE_BENEFIT_LOADING] = true
    })

    builder.addCase(getPackageBenefit.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_PACKAGE_BENEFIT_LOADING] = false
    })

    // Package Member
    builder.addCase(createPackageMember.pending, (state) => {
      state.loadings[thunkActionLoading.CREATE_PACKAGE_MEMBER_LOADING] = true
    })
    builder.addCase(createPackageMember.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.CREATE_PACKAGE_MEMBER_LOADING] = false
      state.packagePage.member = action.payload?.data?.packageMember
    })
    builder.addCase(createPackageMember.rejected, (state) => {
      state.loadings[thunkActionLoading.CREATE_PACKAGE_MEMBER_LOADING] = false
    })

    builder.addCase(getPackageMember.pending, (state) => {
      state.loadings[thunkActionLoading.GET_PACKAGE_MEMBER_LOADING] = true
    })
    builder.addCase(getPackageMember.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_PACKAGE_MEMBER_LOADING] = false
      state.packagePage.member = action.payload?.data
    })
    builder.addCase(getPackageMember.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_PACKAGE_MEMBER_LOADING] = false
    })

    // Package SEO
    builder.addCase(createPackageSeo.pending, (state) => {
      state.loadings[thunkActionLoading.CREATE_PACKAGE_SEO_LOADING] = true
    })
    builder.addCase(createPackageSeo.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.CREATE_PACKAGE_SEO_LOADING] = false
      state.packagePage.seo = action.payload?.data?.seoPackagePage
    })
    builder.addCase(createPackageSeo.rejected, (state) => {
      state.loadings[thunkActionLoading.CREATE_PACKAGE_SEO_LOADING] = false
    })
    builder.addCase(getPackageSeo.pending, (state) => {
      state.loadings[thunkActionLoading.GET_PACKAGE_SEO_LOADING] = true
    })
    builder.addCase(getPackageSeo.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_PACKAGE_SEO_LOADING] = false
      state.packagePage.seo = action.payload.data
    })
    builder.addCase(getPackageSeo.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_PACKAGE_SEO_LOADING] = false
    })
  },
})

export const contentActions = {
  ...contentSlice.actions,
}

export const selectContentLoading = (state: RootState, name: string) =>
  state.content.loadings[`${name}`]
export default contentSlice.reducer
