import { SideBarData } from '@interfaces'
import {
  EActivityLogActionType,
  EActivityLogType,
  EDailyRoutineType,
  EEmailContentType,
  enumCashbackType,
  enumDashboardFilterTime,
  enumMemberType,
  enumNavKey,
  enumPageSize,
  enumRuleType,
  EUserPostStatus,
  EUserStatus,
  EYesNoOptions,
} from 'src/configs/enum'
import {
  ABOUT_US,
  EDIT_COMPANY_INFOR,
  MAIL_CONTENT,
  PATH_ARTICLE_MANAGEMENT,
  PATH_CHAT_CHANNEL,
  PATH_DASHBOARD,
  PATH_DECLARATION_MANAGEMENT,
  PATH_HOME,
  PATH_MANAGE_ROLE,
  PATH_USER_MANAGEMENT,
  PRIVACY_PAGE,
  ROAD_MAP,
  SLIDE_SHOW,
  TERM,
} from 'src/routes/navigation'
import { EActiveInActiveOptions, EPublishDraftOptions } from './enum'

export const DEFAULT_LANGUAGE = process.env.REACT_APP_LANGUAGE || 'frn'
const ALL_THEMES = 'themes'
const CURRENT_THEME = 'theme'
export const LLC_ACCESS_TOKEN = 'llc-access-token'
export const LIVE_LIFE_CLEAN = 'Live Life Clean'

const SIDEBAR_WIDTH = '320px'
const SIDEBAR_COLLAPSED_WIDTH = '92px'
const SIDEBAR_ICON_SIZE = '24px'
const HEADER_HEIGHT = '65px'
const HEADER_PADDING_TOP = '20px'
const COURSE_DETAIL_HEADING_HEIGHT = '180px'

export const MEDIA_PATH_ACTION = {
  UPLOAD_IMAGE:
    process.env.REACT_APP_PUBLIC_API_URL + '/media/resize-resolution',
  UPLOADVIDEO: process.env.REACT_APP_PUBLIC_API_URL + '/media/video-media',
}

export const URL_REGEX =
  /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/

const SIDEBAR_DATA: SideBarData[] = [
  {
    label: 'List Devices',
    path: PATH_HOME,
    pathKey: enumNavKey.DEVICE,
  },
]

const AUTH_THEME_COLOR = '#184f64'

const MAIN_THEME_DATA = {
  mainColor: '#184f64',
}

const MAT_SM_SCREEN_WIDTH = '1279px'
const MAT_SM_SCREEN_WIDTH_MIN = '1280px'

const RESET = 'RESET'

const CASHBACK_RULE_TYPE = [
  {
    value: enumRuleType.standard,
    label: 'Standard Cashback Rule',
  },
  {
    value: enumRuleType.superior,
    label: 'Superior Cashback Rule',
  },
]

const CASHBACK_TYPE = [
  {
    value: enumCashbackType.cost,
    label: '$',
  },
  {
    value: enumCashbackType.percent,
    label: '%',
  },
]

export const TOP_FILTER = [
  {
    value: 10,
    label: 'Top 10',
  },
  {
    value: 20,
    label: 'Top 20',
  },
  {
    value: 50,
    label: 'Top 50',
  },
]

const PAGE_SIZE_OPTIONS = [
  {
    value: enumPageSize.LIMIT_10,
    label: '10',
  },
  {
    value: enumPageSize.LIMIT_20,
    label: '20',
  },
  {
    value: enumPageSize.LIMIT_50,
    label: '50',
  },
]

const FILTER_MEMBER_TYPE = [
  {
    value: enumMemberType.ACTIVE,
    label: 'Active members',
  },
  {
    value: enumMemberType.NEW_MEMBER,
    label: 'New members',
  },
  {
    value: enumMemberType.ALL,
    label: 'All',
  },
]

const DASHBOARD_FILTER_TIME = [
  {
    value: enumDashboardFilterTime.ALL_DAYS,
    label: 'All days',
  },
  {
    value: enumDashboardFilterTime.TODAY,
    label: 'Today',
  },
  {
    value: enumDashboardFilterTime.YESTERDAY,
    label: 'Yesterday',
  },
  {
    value: enumDashboardFilterTime.LAST_7_DAYS,
    label: 'Last 7 days',
  },
  {
    value: enumDashboardFilterTime.LAST_14_DAYS,
    label: 'Last 14 days',
  },
  {
    value: enumDashboardFilterTime.LAST_21_DAYS,
    label: 'Last 21 days',
  },
  {
    value: enumDashboardFilterTime.LAST_28_DAYS,
    label: 'Last 28 days',
  },
  {
    value: enumDashboardFilterTime.LAST_60_DAYS,
    label: 'Last 60 days',
  },
  {
    value: enumDashboardFilterTime.CUSTOM,
    label: 'Custom date',
  },
]

const OPENING_TYPE = {
  ALL: 1,
  CUSTOM: 2,
}
const DAYS = {
  MON: 'monday',
  TUE: 'tuesday',
  WED: 'wednesday',
  THU: 'thursday',
  FRI: 'friday',
  SAT: 'saturday',
  SUN: 'sunday',
}
const DEFAULT_OPENING_HOUR = {
  [DAYS.MON]: {
    openHour: '00:00:00',
    closeHour: '23:59:59',
    timezone: 8,
    isOpen: true,
  },
  [DAYS.TUE]: {
    openHour: '00:00:00',
    closeHour: '23:59:59',
    timezone: 8,
    isOpen: true,
  },
  [DAYS.WED]: {
    openHour: '00:00:00',
    closeHour: '23:59:59',
    timezone: 8,
    isOpen: true,
  },
  [DAYS.THU]: {
    openHour: '00:00:00',
    closeHour: '23:59:59',
    timezone: 8,
    isOpen: true,
  },
  [DAYS.FRI]: {
    openHour: '00:00:00',
    closeHour: '23:59:59',
    timezone: 8,
    isOpen: true,
  },
  [DAYS.SAT]: {
    openHour: '00:00:00',
    closeHour: '23:59:59',
    timezone: 8,
    isOpen: false,
  },
  [DAYS.SUN]: {
    openHour: '00:00:00',
    closeHour: '23:59:59',
    timezone: 8,
    isOpen: false,
  },
}
export const DEFAULT_WELCOMED_BENEFITS_VALUE = {
  CASHBACK: 'cashback',
  POINTS: 'point',
  COUPONS: 'coupon',
  FREE_ITEMS: 'item',
}
const DEFAULT_WELCOMED_BENEFITS = [
  {
    value: DEFAULT_WELCOMED_BENEFITS_VALUE.CASHBACK,
    label: 'Cashback',
    disabled: false,
  },
  {
    value: DEFAULT_WELCOMED_BENEFITS_VALUE.POINTS,
    label: 'Points',
    disabled: false,
  },
  {
    value: DEFAULT_WELCOMED_BENEFITS_VALUE.COUPONS,
    label: 'Coupons',
    disabled: false,
  },
  {
    value: DEFAULT_WELCOMED_BENEFITS_VALUE.FREE_ITEMS,
    label: 'Free items',
    disabled: false,
  },
]
export const ruleDateFormat = 'DD-MM-YYYY'
export const ruleTimeFormat = 'HH:mm:ss'
export const dateOfBirthFormat = 'DD/MM/YYYY'
export const dateTimeFormat = 'HH:mm:ss DD-MM-YYYY'
export const dateFormat = 'DD-MM-YYYY'

export const RESEND_OTP_COUNTDOWN_TIME = 60 //seconds
export const MEMBER_LINK = 'https://minty-member-stage.adamo.tech/'
export const INITIAL_PAGE = 1
export const DEFAULT_ANNOUNCEMENT_TYPE = 'redirect'
export const DEFAULT_ANNOUNCEMENT_STATUS = true
export const MAXIMUM_IMAGE_SIZE = 1000000 //bytes - 1 MB
export const MAXIMUM_LIMIT = 1000000 //bytes - 1 MB

export const MAP_BOX_DEV_KEY =
  'pk.eyJ1IjoiYW5keWhpdSIsImEiOiJjbGNyOWl2ZDAwYmdjM3FucGMwbGhkbW90In0.ezl2EXwziuTkjZmYeh4Bcw'
export {
  ALL_THEMES,
  AUTH_THEME_COLOR,
  CASHBACK_RULE_TYPE,
  CASHBACK_TYPE,
  CURRENT_THEME,
  DASHBOARD_FILTER_TIME,
  DAYS,
  DEFAULT_OPENING_HOUR,
  DEFAULT_WELCOMED_BENEFITS,
  FILTER_MEMBER_TYPE,
  HEADER_HEIGHT,
  HEADER_PADDING_TOP,
  COURSE_DETAIL_HEADING_HEIGHT,
  MAIN_THEME_DATA,
  MAT_SM_SCREEN_WIDTH,
  MAT_SM_SCREEN_WIDTH_MIN,
  OPENING_TYPE,
  PAGE_SIZE_OPTIONS,
  RESET,
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_DATA,
  SIDEBAR_ICON_SIZE,
  SIDEBAR_WIDTH,
}

export const INITIAL_PAGINATION_SiZE = 10

export enum StatusUser {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum StaticPageType {
  ABOUT_US = 'about-us',
  TERM_POLICY = 'term-policy',
}

export enum ClientStatusCode {
  OTP_TIMEOUT = 600,
  OTP_INVALID = 601,
  WRONG_OTP_CODE = 602,
  OVERTIME_SCAN_OTP = 603,
  AVAILABILITY_CREATE_SUCCESS = 604,
  AVAILABILITY_CREATE_ERROR = 605,
  AVAILABILITY_CREATE_EXISTED = 606,
  AVAILABILITY_UPDATE_SUCCESS = 607,
  AVAILABILITY_UPDATE_ERROR = 608,
  AVAILABILITY_DELETE_SUCCESS = 609,
  AVAILABILITY_DELETE_ERROR = 610,
  AVAILABILITY_GET_SUCCESS = 611,
  AVAILABILITY_GET_ERROR = 612,
  AVAILABILITY_GET_NOT_FOUND = 613,
  USER_NOT_FOUND = 614,
  EMAIL_ALREADY_EXISTS = 615,
  MOBILE_ALREADY_EXISTS = 616,
  SALESFORCE_CONTACT_ERR = 617,
  SALESFORCE_CONTACT_DUPLICATE = 618,
  USER_UPDATE_SUCCESS = 619,
  USER_NOT_ACTIVE = 620,
  INVALID_LOGIN_LINK = 621,
  ITEM_NOT_FOUND = 622,
  SEND_EMAIL_FAIL = 623,
}

export const CLIENT_IN_HEADER_AXIOS = 'admin'

export const USER_GENDER_OPTIONS = [
  {
    label: 'AAA',
    value: 'male',
  },
  {
    label: 'BBB',
    value: 'female',
  },
]

export const USER_STATUS_OPTIONS = [
  {
    label: 'XXXX',
    value: 'active',
  },
  {
    label: 'ZZZZZ',
    value: 'inactive',
  },
]

export enum EAuthType {
  LOGIN = 'login',
  CHANGE_PASSWORD = 'change-password',
}

export enum EForgotPasswordPageType {
  VERIFY_EMAIL = 'verify-email',
  RESEND_CODE = 'resend-otp-code',
  RESET_PASSWORD = 'reset-password',
  FORGOT_PASSWORD = 'forgot-password',
  VERIFY_FORGOT_PASSWORD = 'verify-forgot-password',
}

export enum EPlanType {
  MONTHLY = 1,
  YEARLY = 2,
}

export enum EPlanViewType {
  VIEW = 'view',
  ADD = 'add',
  EDIT = 'edit',
}

export enum EUserGender {
  MALE = 1,
  FEMALE = 2,
}

export enum EKeyBoardCode {
  ENTER = 'Enter',
  SPACE = 'Space',
}

export enum EDeviceType {
  MOBILE_APP = 1,
  WATCH_APP = 2,
  BOTH = 3,
}

export const SICKNESS_OPTIONS = [
  'Heart Failure',
  'Myocardial Infarction',
  'Angina',
  'Aortic Dissection',
  'Valvular Disease',
  'Pulmonary Hypertension',
  'Arrhythmia',
  'Cardiomyopathy',
  'Other',
]

export const SIDEBAR_CONTENTS = [
  'Dashboard',
  'Chat channel',
  'User management',
  'Manage role',
  'Content management',
  'Declaration management',
]

export const SIDEBAR_PATHS = [
  PATH_DASHBOARD,
  PATH_CHAT_CHANNEL,
  PATH_USER_MANAGEMENT,
  PATH_MANAGE_ROLE,
  PATH_ARTICLE_MANAGEMENT,
  PATH_DECLARATION_MANAGEMENT,
]

export const ITEMS_IN_DECLARATION_MANAGEMENT = [
  ROAD_MAP,
  SLIDE_SHOW,
  EDIT_COMPANY_INFOR,
  MAIL_CONTENT,
  ABOUT_US,
  TERM,
  PRIVACY_PAGE,
]

export enum EManageRoleTabs {
  STAFF_MANAGEMENT = 'Staff management',
  ROLE_MANAGEMENT = 'Role management',
}
export const PASSWORD_LENGTH_MIN = 8
export const PASSWORD_LENGTH_MAX = 32
export const OPT_LENGTH = 4

export enum ERoleModule {
  USERS = 'users',
  ROLES = 'roles',
}

export const LIST_STATUS_USER = {
  [EUserStatus.ACTIVE]: 'Active',
  [EUserStatus.INACTIVE]: 'Inactive',
  [EUserStatus.BLOCK]: 'Blocked/Restricted',
  [EUserStatus.DELETED]: 'Deleted',
  [EUserStatus.TEMP_DELETED]: 'Delete - can recover',
  [EUserStatus.TOTAL_DELETED]: 'Delete - can not recover',
}

export const DEFAULT_USER_AVATAR =
  'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg'

export const REGEX_EMAIL =
  /^[a-zA-Z0-9._%+-]+@(?!.*\.\.)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const ROLE_DEFAULT_ID = 2

export const LIST_USER_LOG_TYPE = {
  [EActivityLogActionType.LOGIN_SUCCESS]: 'Profile log',
  [EActivityLogActionType.ACCOUNT_CREATION]: 'Profile log',
  [EActivityLogActionType.PROFILE_UPDATE]: 'Profile log',
  [EActivityLogActionType.POST_INTERACTION]: 'User activity log',
  [EActivityLogActionType.COMMENT_INTERACTION]: 'User activity log',
  [EActivityLogActionType.MESSAGE_INTERACTION]: 'User activity log',
  [EActivityLogActionType.CONTENT_CREATION]: 'Content log',
  [EActivityLogActionType.CONTENT_EDITING]: 'Content log',
  [EActivityLogActionType.CONTENT_DELETION]: 'Content log',
  [EActivityLogActionType.BOOKING_ACTION]: 'Purchase log',
  [EActivityLogActionType.LOGIN_FAIL]: 'Profile log',
  [EActivityLogActionType.ACCESS_CONTROL_LOG]: 'Security log',
  [EActivityLogActionType.PAYMENT_DETAIL]: 'Purchase log',
  [EActivityLogActionType.BOOKING_DETAIL]: 'Purchase log',
  [EActivityLogActionType.INVENTORY_CHANGES]: 'Purchase log',
  [EActivityLogActionType.CONVERSATION_TRACKING]: 'Conversation log',
  [EActivityLogActionType.MARKETING_CAMPAIGN]: 'Purchase log',
}

export const LIST_USER_LOG_ACTION = {
  [EActivityLogType.ACTIVITY]: 'User activity log',
  [EActivityLogType.SECURITY]: 'Security log',
  [EActivityLogType.TRANSACTION]: 'Transaction log',
  [EActivityLogType.ANALYTICS]: 'Analytics log',
}

export const POST_DISPLAY_NAME = {
  [EUserPostStatus.PUBLIC]: 'Published',
  [EUserPostStatus.FRIEND]: 'Draft',
}

export enum ECurrency {
  USD = 'USD',
  EUR = 'EUR',
}

export const CHAT_FILE_LIMIT_SIZE_MB = 20
export const ABOUT_US_FILE_LIMIT_SIZE_MB = 50
export const LIMIT_ITEM_PER_PAGE = 10
export const MAX_LIMIT_ITEM_PER_PAGE = 999999999

export const BLOG_STATUS = {
  ALL: 'all status',
  PUBLISHED: 'published',
  UNPUBLISHED: 'unpublished',
}

export const COURSE_STATUS = {
  ALL: 'All status',
  ACTIVE: '1',
  INACTIVE: '0',
}

export const COURSE_TYPE = {
  ALL: 'All type',
  FREE: 'free',
  PREMIUM: 'premium',
}

export const PLACEHOLDER_IMAGE_AVATAR =
  'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'

export const SEO_CONFIG = 'SEO config'

// .mp4, .webm, .m4v, .mov, .qt
export const VIDEO_FILTER = /[^\s]+(.*?).(webm|mp4|x-m4v|quicktime)$/
export const POST_MEDIA_FILTER =
  /[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF|mp4|mpeg|text|plain|webm|x-m4v|quicktime)$/

export const EMAIL_CONTENT_NAME = {
  All: 'All',
  [EEmailContentType.NEW_USER]: 'New user',
  [EEmailContentType.ADVERTISEMENT]: 'Advertisement',
  [EEmailContentType.SUBSCRIPTION]: 'Subscription',
  [EEmailContentType.COMMUNITY]: 'Community',
  [EEmailContentType.CHALLENGE]: 'Challenge',
  [EEmailContentType.DAILY_ROUTINE]: 'Daily routine',
  [EEmailContentType.OTHER]: 'Other',
}

export const DAILY_ROUTINE_TYPE = {
  All: 'All',
  [EDailyRoutineType.NUTRITION]: 'Nutrition',
  [EDailyRoutineType.EXERCISE]: 'Exercise',
  [EDailyRoutineType.MOBILITY]: 'Mobility',
  [EDailyRoutineType.SLEEP]: 'Sleep',
  [EDailyRoutineType.REFLECTION]: 'Reflection',
  [EDailyRoutineType.WELL_BEING]: 'Well-being',
}

export const DISPLAY_YES_NO_OPTIONS = {
  [EYesNoOptions.ALL]: 'All',
  [EYesNoOptions.YES]: 'Yes',
  [EYesNoOptions.NO]: 'No',
}

export const DISPLAY_ACTIVE_INACTIVE_OPTIONS = {
  [EActiveInActiveOptions.ALL]: 'All',
  [EActiveInActiveOptions.ACTIVE]: 'Active',
  [EActiveInActiveOptions.INACTIVE]: 'Inactive',
}

export const DISPLAY_PUBLISH_DRAFT_OPTIONS = {
  [EPublishDraftOptions.ALL]: 'All',
  [EPublishDraftOptions.PUBLISHED]: 'Published',
  [EPublishDraftOptions.DRAFT]: 'Draft',
}

export const WHITE_COLOR = '#fff'

export enum ECommonContentLayout {
  LAYOUT_ONE = 'layout_one',
  LAYOUT_TWO = 'layout_two',
  LAYOUT_THREE = 'layout_three',
  LAYOUT_FOUR = 'layout_four',
}

export const LAYOUT_OPTIONS = [
  {
    label: 'Layout 1',
    value: ECommonContentLayout.LAYOUT_ONE,
  },
  {
    label: 'Layout 2',
    value: ECommonContentLayout.LAYOUT_TWO,
  },
  {
    label: 'Layout 3',
    value: ECommonContentLayout.LAYOUT_THREE,
  },
  {
    label: 'Layout 4',
    value: ECommonContentLayout.LAYOUT_FOUR,
  },
]
