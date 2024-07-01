export enum enumEnum {
  ENUM = 'ENUM',
}

export enum enumSizeIcon {
  DESKTOP = 58,
  TABLET = 40,
  DEFAULT = 78,
}

export enum enumBreakPoint {
  DESKTOP = 1280,
  TABLET = 1024,
  _2k = 2048,
  _3k = 38,
}

export enum enumPagination {
  _1 = 1,
  _2 = 2,
  _3 = 3,
  _4 = 4,
}

export const pagesIntroduction: enumPagination[] = [
  enumPagination._1,
  enumPagination._2,
  enumPagination._3,
  enumPagination._4,
]

export enum enumThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum enumOrderDate {
  Y_M_D = 'year/month/day',
  D_M_Y = 'day/month/year',
  D_Y_M = 'day/year/month',
  M_D_Y = 'month/day/year',
  M_Y_D = 'month/year/day',
  Y_D_M = 'year/day/month',
}

export enum enumBtnStyle {
  BASIC = 'basic',
  ROUNDED = 'rounded',
  ICON = 'icon',
}

export enum enumRuleType {
  standard = 'standard',
  superior = 'superior',
  birthday = 'birthday',
}

export enum enumCashbackType {
  cost = 'cashback',
  percent = 'percentage',
}

export enum enumNavKey {
  DASHBOARD = 'dashboard',
  DEVICE = 'device',
  USER_MANAGEMENT = 'user',
  PLAN_MANAGEMENT = 'plan',
  NOTIFICATION = 'notification',
  CHAT_CHANNEL = 'chat',
  MANAGE_ROLE = 'role',
  ARTICLE_MANAGEMENT = 'article',
  CONTENT_MANAGEMENT = 'content',
  DECLARATION_MANAGEMENT = 'declaration',
  EDITOR = 'editor',
  STAFF_AND_ROLE_MANAGEMENT = 'role',
  PACKAGE_MANAGEMENT = 'package',
  CATEGORY_MANAGEMENT = 'category',
  EMAIL_SUBSCRIBED_MANAGEMENT = 'letter',
  BLOG_NEW_MANAGEMENT = 'blog',
  COURSE_MANAGEMENT = 'course',
  MEMBER_SHIP = 'membership',
  ABOUT_US_PAGE_MANAGEMENT = 'about-us-page',
  POST_MANAGEMENT = 'post',
  CATEGORY = 'category-main',
  SUBCATEGORY = 'subcategory',
  CONTACT = 'CONTACT',
  //sub menu
  SUB_MENU_HOME_PAGE = 'home-page',
  SUB_MENU_ABOUT_US_PAGE = 'about-us-page',
  SUB_MENU_TERM_POLICIES_PAGE = 'term-policies-page',
  SUB_MENU_BLOG_PAGE = 'blog-page',
  SUB_GALLERY_PAGE = 'gallery-page',
  SUB_PACKAGE_PAGE = 'package-page',
  SUB_ACADEMY_PAGE = 'academy-page',

  HABIT_MANAGEMENT = 'habit-management',
  SUB_HABIT_TAG = 'habit-tag',
  SUB_HABIT_QUESTION = 'habit-question',
  SUB_HABIT_CHALLENGE = 'habit-challenge',
  SUB_DAILY_ROUTINE = 'daily-routine',
  SET_UP_STARTING_SCREEN = 'set-up-starting-screen',

  PATH_GROUP_MANAGEMENT = 'group-management',
  PATH_EMAIL_MANAGEMENT = 'email-management',
  MEMBERSHIP_PAGE = 'membership-page',
  HOME_PAGE_MANAGEMENT = 'HOME_PAGE_MANAGEMENT',
}

export enum enumMainNavKey {
  // LOYALTY_SETTING = enumNavKey.LOYALTY_SETTING,
  // MARKETING = enumNavKey.MARKETING,
  // MEMBERS = enumNavKey.MEMBERS,
  // BRANCH_GROUP = enumNavKey.BRANCH_GROUP,
  // SETTINGS = enumNavKey.SETTINGS,
  // STORES = enumNavKey.STORES,
  USER_MANAGEMENT = enumNavKey.USER_MANAGEMENT,
}

export enum enumStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  NONE = '',
}

export enum enumMemberType {
  ALL = '',
  ACTIVE = 'active',
  NEW_MEMBER = 'new',
}

export enum enumSettingItemKey {
  GENERAL = 1,
  PROFILE,
  POLICY,
  USER_MANAGEMENT,
  ABOUT,
  BRANCH_GROUP,
}

export enum enumUploadType {
  BUTTON = 1,
  IMAGE,
}

export enum enumGender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum enumPageSize {
  LIMIT_10 = 10,
  LIMIT_20 = 20,
  LIMIT_50 = 50,
}

export enum enumBirthday {
  BIRTHDAY = 'birthday',
}

export enum enumSimulatorBy {
  BY_TOTAL_AMOUNT = 1,
  BY_PRODUCT,
}

export enum enumDashboardFilterTime {
  ALL_DAYS = 'all-days',
  TODAY = 'today',
  YESTERDAY = 'yesterday',
  LAST_7_DAYS = 7,
  LAST_14_DAYS = 14,
  LAST_21_DAYS = 21,
  LAST_28_DAYS = 28,
  LAST_60_DAYS = 60,
  CUSTOM = 'custom',
}

export enum enumStatusCode {
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

export enum enumCkeditorMode {
  PREVIEW = 'Preview',
  EDIT = 'Edit',
}

export enum enumMethodLoginFirebase {
  EMAIL = 'email',
}

export enum thunkActionLoading {
  LOGIN_ACTION_LOADING = 'loginActionLoading',
  FORGOT_PASSWORD_ACTION_LOADING = 'forgotPasswordActionLoading',
  VERIFY_PASSWORD_ACTION_LOADING = 'verifyPasswordActionLoading',
  RESEND_CODE_ACTION_LOADING = 'resendCodeActionLoading',
  RESET_PASSWORD_ACTION_LOADING = 'resetPasswordActionLoading',
  GET_ALL_USER_ACTION_LOADING = 'getAllUsersActionLoading',
  GET_USER_BY_ID_ACTION_LOADING = 'getUserByIdActionLoading',
  UPDATE_USER_ACTION_LOADING = 'updateUserByIdActionLoading',
  RECOVER_USER_ACTION_LOADING = 'recoverUserActionLoading',
  DELETE_USER_ACTION_LOADING = 'deleteUserByIdActionLoading',
  INIT_PASSWORD_ADMIN_ACTION_LOADING = 'initPasswordAdminActionLoading',
  GET_USER_LOG_BY_USER_ID_ACTION_LOADING = 'getUserLogByUserIdActionLoading',
  GET_USER_LOG_BY_ID_ACTION_LOADING = 'getUserLogByIdActionLoading',
  GET_LIST_ABOUT_US = 'getListAboutUsActionLoading',
  GET_LIST_MEMBERSHIP = 'getListMemberShipActionLoading',
  GET_LIST_ROAD_MAP = 'getListRoadMapActionLoading',
  GET_LIST_QUOTE_LOADING = 'getListQuoteLoading',
  GET_LIST_USER_CHAT_ACTION_LOADING = 'getListUserChatActionLoading',
  CREATE_CHAT_ROOM_ACTION_LOADING = 'createChatRoomActionLoading',
  GET_LIST_CHAT_ROOM_ACTION_LOADING = 'getListChatRoomActionLoading',
  GET_MESSAGE_BY_ROOM_ID_ACTION_LOADING = 'getMessageByRoomIdActionLoading',
  GET_LIST_CATEGORIES = 'getListCategoriesActionLoading',
  UPLOAD_FILE_ACTION_LOADING = 'uploadFileActionLoading',
  DELETE_CATEGORIES = 'deleteCategoriesActionLoading',
  GET_LIST_COMMUNITY_CONTENT_LOADING = 'GET_LIST_COMMUNITY_CONTENT_LOADING',
  UPDATE_COMMUNITY_LOADING = 'updateCommunityLoading',
  GET_LIST_HOMEPAGE_VIDEO_LOADING = 'GET_LIST_HOMEPAGE_VIDEO_LOADING',
  UPDATE_HOMEPAGE_VIDEO_LOADING = 'updateHomepageVideoLoading',
  TOGGE_READ_ROOM_ACTION_LOADING = 'toggleReadRoomActionLoading',
  ADD_QUOTE_LOADING = 'addQuoteLoading',
  GET_LIST_CHALLENGES = 'getListChallenge',
  ////Contact
  GET_CONTACT_LOADING = 'GET_CONTACT_LOADING',
  UPDATE_CONTACT_LOADING = 'UPDATE_CONTACT_LOADING',

  //About us management
  ////Providing value
  GET_LIST_PROVIDING_LOADING = 'GET_LIST_PROVIDING_LOADING',
  ADD_PROVIDING_LOADING = 'ADD_PROVIDING_LOADING',

  ////Simple quotes
  GET_LIST_SIMPLE_QUOTE_LOADING = 'GET_LIST_SIMPLE_QUOTE_LOADING',
  ADD_SIMPLE_QUOTE_LOADING = 'ADD_SIMPLE_QUOTE_LOADING',
  ////Providing value
  GET_LIST_CEO_QUOTES_LOADING = 'GET_LIST_CEO_QUOTE_LOADING',
  ADD_CEO_QUOTES_LOADING = 'ADD_CEO_QUOTE_LOADING',
  ////DASH BOARD
  GET_STATISTIC_CHART_LOADING = 'GET_STATISTIC_CHART_LOADING',
  GET_STATISTIC_CHART_INCOME_LOADING = 'GET_STATISTIC_CHART_INCOME_LOADING',

  // Term and policy
  CREATE_TERM_AND_POLICY_LOADING = 'CREATE_TERM_AND_POLICY_LOADING',
  GET_TERM_AND_POLICY_LOADING = 'GET_TERM_AND_POLICY_LOADING',

  // Home Seo
  CREATE_HOME_SEO_LOADING = 'CREATE_HOME_SEO_LOADING',
  GET_HOME_SEO_LOADING = 'GET_HOME_SEO_LOADING',

  // Seo Config
  UPDATE_SEO_CONFIG_LOADING = 'UPDATE_SEO_CONFIG_LOADING',
  GET_SEO_CONFIG_LOADING = 'GET_SEO_CONFIG_LOADING',

  // Profile Admin
  GET_PROFILE_ADMIN_LOADING = 'GET_PROFILE_ADMIN_LOADING',
  UPDATE_PROFILE_ADMIN_LOADING = 'UPDATE_PROFILE_ADMIN_LOADING',

  // Blog list content
  GET_BLOG_LIST_CONTENT_LOADING = 'GET_BLOG_LIST_CONTENT_LOADING',
  CREATE_UPDATE_BLOG_LIST_CONTENT_LOADING = 'CREATE_UPDATE_BLOG_LIST_CONTENT_LOADING',

  // Gallery
  GET_MEDIA_ACTION_LOADING = 'GET_MEDIA_ACTION_LOADING',
  GET_VIDEO_MEDIA_ACTION_LOADING = 'GET_VIDEO_MEDIA_ACTION_LOADING',
  GET_IMAGE_MEDIA_ACTION_LOADING = 'GET_IMAGE_MEDIA_ACTION_LOADING',

  //package page content
  GET_PACKAGE_BANNER_LOADING = 'GET_PACKAGE_BANNER_LOADING',
  UPDATE_PACKAGE_BANNER_LOADING = 'UPDATE_PACKAGE_BANNER_LOADING',

  GET_COMMUNITY_BANNER_LOADING = 'GET_COMMUNITY_BANNER_LOADING',
  UPDATE_COMMUNITY_BANNER_LOADING = 'UPDATE_COMMUNITY_BANNER_LOADING',

  //motive package page
  GET_PACKAGE_MOTIVE_LOADING = 'GET_PACKAGE_MOTIVE_LOADING',

  // Package Benefit
  GET_PACKAGE_BENEFIT_LOADING = 'GET_PACKAGE_BENEFIT_LOADING',
  CREATE_PACKAGE_BENEFIT_LOADING = 'CREATE_PACKAGE_BENEFIT_LOADING',

  // Package Member
  GET_PACKAGE_MEMBER_LOADING = 'GET_PACKAGE_MEMBER_LOADING',
  CREATE_PACKAGE_MEMBER_LOADING = 'CREATE_PACKAGE_MEMBER_LOADING',

  // Package SEO
  CREATE_PACKAGE_SEO_LOADING = 'CREATE_PACKAGE_SEO_LOADING',
  GET_PACKAGE_SEO_LOADING = 'GET_PACKAGE_SEO_LOADING',

  // Habit management
  GET_LIST_GOALS_LOADING = 'GET_LIST_GOALS_LOADING',
  CREATE_GOAL_LOADING = 'CREATE_GOAL_LOADING',
  UPDATE_GOAL_LOADING = 'UPDATE_GOAL_LOADING',
  DELETE_GOAL_LOADING = 'DELETE_GOAL_LOADING',
  GET_LIST_QUESTIONS_LOADING = 'GET_LIST_QUESTIONS_LOADING',
  CREATE_QUESTION_LOADING = 'CREATE_QUESTION_LOADING',
  UPDATE_QUESTION_LOADING = 'UPDATE_QUESTION_LOADING',
  DELETE_QUESTION_LOADING = 'DELETE_QUESTION_LOADING',
  GET_LIST_CHALLENGES_LOADING = 'GET_LIST_CHALLENGES_LOADING',
  GET_LIST_DAILY_ROUTINES_LOADING = 'GET_LIST_DAILY_ROUTINES_LOADING',
  DELETE_DAILY_ROUTINE_LOADING = 'DELETE_DAILY_ROUTINE_LOADING',
  GET_DETAIL_DAILY_ROUTINE_LOADING = 'GET_DETAIL_DAILY_ROUTINE_LOADING',
  POST_DETAIL_DAILY_ROUTINE_LOADING = 'POST_DETAIL_DAILY_ROUTINE_LOADING',
  PUT_DETAIL_DAILY_ROUTINE_LOADING = 'PUT_DETAIL_DAILY_ROUTINE_LOADING',
  GET_LIST_JOBS_DAILY_ROUTINE_LOADING = 'GET_LIST_JOBS_DAILY_ROUTINE_LOADING',
  GET_JOB_DETAIL_DAILY_ROUTINE_LOADING = 'GET_JOB_DETAIL_DAILY_ROUTINE_LOADING',
  PUT_JOB_DETAIL_DAILY_ROUTINE_LOADING = 'PUT_JOB_DETAIL_DAILY_ROUTINE_LOADING',
  DELETE_JOB_DETAIL_DAILY_ROUTINE_LOADING = 'DELETE_JOB_DETAIL_DAILY_ROUTINE_LOADING',
  // post
  GET_PACKAGE_POST_DETAIL_LOADING = 'GET_PACKAGE_POST_DETAIL_LOADING',
  GET_POSTS_LOADING = 'GET_POSTS_LOADING',
  CREATE_POST_LOADING = 'CREATE_POST_LOADING',
  UPDATE_POST_LOADING = 'UPDATE_POST_LOADING',
  DELETE_POST_LOADING = 'DELETE_POST_LOADING',
  GET_COMMENTS = 'GET_COMMENTS_LOADING',
  GET_CHILD_COMMENTS = 'GET_CHILD_COMMENTS',

  // group user management
  GET_GROUP_USERS_LOADING = 'GET_GROUP_USERS_LOADING',
  DELETE_GROUP_USER_LOADING = 'DELETE_GROUP_USER_LOADING',
  GET_LIST_SUBSCRIBED_EMAIL_LOADING = 'GET_LIST_SUBSCRIBED_EMAIL_LOADING',
  CREATE_GROUP_USER_LOADING = 'CREATE_GROUP_USER_LOADING',
  GET_GROUP_USER_BY_ID_LOADING = 'GET_GROUP_USER_BY_ID_LOADING',
  EDIT_GROUP_USER_LOADING = 'EDIT_GROUP_USER_LOADING',

  // Email content management
  GET_EMAIL_CONTENTS_LOADING = 'GET_EMAIL_CONTENTS_LOADING',
  DELETE_EMAIL_CONTENT_LOADING = 'DELETE_EMAIL_CONTENT_LOADING',
  GET_DETAIL_EMAIL_CONTENT_LOADING = 'GET_DETAIL_EMAIL_CONTENT_LOADING',
  CREATE_EMAIL_CONTENT_LOADING = 'CREATE_EMAIL_CONTENT_LOADING',
  UPDATE_EMAIL_CONTENT_LOADING = 'UPDATE_EMAIL_CONTENT_LOADING',
  DUPLICATE_EMAIL_CONTENT_LOADING = 'DUPLICATE_EMAIL_CONTENT_LOADING',
  RESEND_EMAIL_CONTENT_LOADING = 'RESEND_EMAIL_CONTENT_LOADING',
  GET_LIST_HOME_CONTENT = 'GET_LIST_HOME_CONTENT',
}

export enum thunkActionType {
  LOGIN_ACTION = 'auth/loginAction',
  FORGOT_PASSWORD_ACTION = 'auth/forgotPasswordAction',
  VERIFY_PASSWORD_ACTION = 'auth/verifyPassword',
  RESEND_CODE_ACTION = 'auth/resendCodeAction',
  RESET_PASSWORD_ACTION = 'auth/resetPasswordAction',
  CHANGE_PASSWORD_ACTION = 'auth/changePasswordAction',
  INIT_PASSWORD_ADMIN_ACTION = 'auth/initPasswordAdminAction',
  GET_PROFILE_ADMIN_ACTION = 'auth/getProfileAdminAction',
  UPDATE_PROFILE_ADMIN_ACTION = 'auth/updateProfileAdminAction',
  GET_MEDIA_ACTION = 'gallery/getMediaAction',
  GET_VIDEO_MEDIA_ACTION = 'gallery/getVideoMediaAction',
  GET_IMAGE_MEDIA_ACTION = 'gallery/getImageMediaAction',
}

export enum EUploadFileType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
}

export enum EStatusUploadFile {
  UPLOADING = 'uploading',
  DONE = 'done',
  REMOVED = 'removed',
  SUCCESS = 'success',
  ERROR = 'error',
}

export enum enumTypeFirebaseErrorCode {
  USER_NOT_FOUND = 'auth/user-not-found',
  WRONG_PASSWORD = 'auth/wrong-password',
}

export enum enumTypeFirebaseErrorLoginNotification {
  USER_NOT_FOUND = 'User not found!',
  WRONG_PASSWORD = 'Wrong password!',
  SOMETHING_WENT_WRONG = 'Something went wrong! Please try again later!',
}

export enum EVerifyOTPStatusType {
  SIGNUP = 'SIGNUP',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
}

export enum enumTableTitleInUserManagement {
  NO = 'No',
  NAME = 'Name',
  EMAIL = 'Email',
  ADDRESS = 'Address',
  PHONE = 'Phone number',
  CREATE_TIME = 'Create time',
  PACKAGE_NAME = 'Package name',
  PRICE = 'Price',
  STATUS = 'Status',
  ACTION = 'Action',
}

export enum enumTableTitleInContentManagementAboutUs {
  NO = 'No',
  NAME = 'Name',
  TITLE = 'Title',
  CONTENT = 'Content',
  IMAGE_LINK = 'Image link',
  IMAGE_DESCRIPTION = 'Image description',
  ACTION = 'Action',
}

export enum enumTableTitleInContentManagementRoadMap {
  NO = 'No',
  NAME = 'Name',
  MILESTONE = 'Milestone',
  TITLE = 'Title',
  CONTENT = 'Content',
  IMAGE_PREVIEW = 'Image preview',
  ACTION = 'Action',
}

export enum enumTableTitleInContentManagementQuotes {
  NO = 'No',
  CONTENT = 'Content',
  Author = 'Author',
  LAST_UPDATE = 'Last update',
  Status = 'Status',
  ACTION = 'Action',
}

export enum ETableTitleAboutUsManagementProvidingValue {
  NO = 'No',
  TITLE = 'Title',
  CONTENT = 'Content',
  IMAGE = 'Image',
  ACTION = 'Action',
}

export enum ETableTitleAboutUsManagementSimpleQuote {
  NO = 'No',
  QUOTE = 'Quote',
  SUBQUOTE = 'Sub-quote',
  IMAGE = 'Image',
  ACTION = 'Action',
}

export enum ETableTitleAboutUsManagementCEOQuotes {
  NO = 'No',
  AUTHOR = 'Author',
  ROLE = 'Role',
  QUOTE = 'Quote',
  SUBQUOTE = 'Sub-quotes',
  ACTION = 'Action',
}

export enum ETableTitleAboutUsManagementOurStory {
  NO = 'No',
  TITLE = 'Title',
  CONTENT = 'Content',
  IMAGE = 'Image',
  ACTION = 'Action',
}

export enum ETableTitleAboutUsManagementCoreValue {
  NO = 'No',
  TITLE = 'Title',
  CONTENT = 'Content',
  IMAGE = 'Image',
  ACTION = 'Action',
}

export enum enumTableEmailSubscribed {
  NO = 'No',
  EmailAddress = 'Email address',
  RegisterTime = 'Register time',
}

export enum enumTableTitleTransactionHistory {
  NO = 'No',
  NAME = 'Name',
  TYPE = 'Type',
  TIME = 'Time',
  STATUS = 'Status',
  ACTION = 'Action',
}

export enum enumTableTitleUserLog {
  NO = 'No',
  TITLE = 'Title',
  TYPE = 'Type',
  TIME = 'Time',
  STATUS = 'Status',
  ACTION = 'Action',
}

export enum enumTableTitleBlogNews {
  NO = 'No',
  TITLE = 'Title',
  AUTHOR = 'Author',
  TYPE = 'Type',
  CREATE_TIME = 'Create time',
  STATUS = 'Status',
  ACTION = 'Action',
}

export enum enumTableTitleCourse {
  NO = 'No',
  COURSE_NAME = 'Course name',
  CATEGORY = 'Category',
  TYPE = 'Type',
  USER = 'Author',
  STATUS = 'Status',
  PUBLISHED_DRAFT = 'Published / Draft',
  ACTION = 'Action',
}

export enum enumTableTitleMotiveTab {
  NO = 'No',
  TITLE = 'Title',
  CONTENT = 'Content',
  CREATE_TIME = 'Create time',
  ACTION = 'Action',
}

export enum enumTableTitleSelectMediaTab {
  PLACE_HOLDER = '',
  NAME = 'Name',
  UPLOAD_DATE = 'Upload date',
  ACTION = 'Action',
}

export enum EUserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BLOCK = 'block',
  DELETED = 'deleted',
  TOTAL_DELETED = 'delete_not_recover',
  TEMP_DELETED = 'delete_can_recover',
}

export enum TwoPartOfRecoveryModalContent {
  PART_1 = 'confirm_quote_1',
  PART_2 = 'confirm_quote_2',
}

export enum EUserManagementTabs {
  USER_INFO = 'User info',
  USER_LOG = 'User log',
  TRANSACTION_HISTORY = 'Transaction history',
}

export enum EPackagePageTabs {
  BANNER = 'Banner',
  COMMUNITY = 'Community',
  MOTIVE = 'Motive',
  BENEFIT = 'Benefit',
  MEMBER = 'Member',
  SEO_CONFIG = 'SEO config',
}

export enum EAboutUsPageTabs {
  LANDING = 'Banner',
  OUR_STORY = 'Our story',
  PROVIDING_VALUE = 'Providing value',
  CORE_VALUES = 'Core values',
  CEO_QUOTES = 'CEO quotes',
  SIMPLE_QUOTE = 'Simple quote',
  CORE_MEMBERS = 'Core members',
  OUR_VISION = 'Our vision',
  ABOUT_US_PAGE_SEO = 'SEO config',
}
export enum EBlogNewsTabs {
  CONTENT = 'Content',
  META = 'SEO config',
}
export enum ETermPoliciesTabs {
  CONTENT_IN_ENGLISH = 'Content in English',
  META = 'SEO config',
  CONTENT_IN_NETHERLANDS = 'Content in Netherlands',
}

export enum EChatTabs {
  CHAT_LIST = 'Chats',
  FRIEND_LIST = 'Friends',
}

export enum EActivityLogActionType {
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
  ACCOUNT_CREATION = 'ACCOUNT_CREATION',
  PROFILE_UPDATE = 'PROFILE_UPDATE',
  POST_INTERACTION = 'POST_INTERACTION',
  COMMENT_INTERACTION = 'COMMENT_INTERACTION',
  MESSAGE_INTERACTION = 'MESSAGE_INTERACTION',
  CONTENT_CREATION = 'CONTENT_CREATION',
  CONTENT_EDITING = 'CONTENT_EDITING',
  CONTENT_DELETION = 'CONTENT_DELETION',
  BOOKING_ACTION = 'BOOKING_ACTION',
  LOGIN_FAIL = 'LOGIN_FAIL',
  ACCESS_CONTROL_LOG = 'ACCESS_CONTROL_LOG',
  PAYMENT_DETAIL = 'PAYMENT_DETAIL',
  BOOKING_DETAIL = 'BOOKING_DETAIL',
  INVENTORY_CHANGES = 'INVENTORY_CHANGES',
  CONVERSATION_TRACKING = 'CONVERSATION_TRACKING',
  MARKETING_CAMPAIGN = 'MARKETING_CAMPAIGN',
  FRIEND_REQUEST = 'FRIEND_REQUEST',
  REACTION = 'REACTION',
  POST = 'POST',
  COMMENT = 'COMMENT',
}

export enum EActivityLogType {
  ACTIVITY = 'ACTIVITY',
  SECURITY = 'SECURITY',
  TRANSACTION = 'TRANSACTION',
  ANALYTICS = 'ANALYTICS',
}

export enum EMessageType {
  TEXT = 'TEXT',
  FILE = 'FILE',
}

export enum ESocketMessage {
  SEND_MESSAGE = 'send-message',
  RECEIVE_MESSAGE = 'receive-message',
  RECEIVE_CHAT_ROOM = 'receive-chat-room',
  RECEIVE_DELETE_MESSAGE = 'receive-message-after-deleting',
  DELETE_MESSAGE = 'delete-message',
  UPDATE_MESSAGE = 'update-message',
  ERROR = 'error',
}

export enum ELanguageBlogType {
  EN = 'en',
  NL = 'nl',
}

export enum ELanguageBlogTypeLabel {
  EN = 'English',
  NL = 'Netherlands',
}

export enum EBlogType {
  ARTICLE = 'ARTICLE',
  BLOG = 'BLOG',
  VLOG = 'VLOG',
  PODCAST = 'PODCAST',
  QUIZ = 'QUIZ',
}

export enum ECourseType {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM',
}

export enum ECourseDifficulty {
  BEGINNER = 'BEGINNER',
  MODERATE = 'MODERATE',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

export enum EStepChart {
  ONE_MONTh = 'oneMonth',
  ONE_WEEK = 'oneWeek',
  ONE_DAY = 'oneDay',
  THREE_MONTH = 'threeMonth',
}

export enum EGalleyTabs {
  HOMEPAGE = 'Home page',
  ABOUT_US = 'About us',
  BLOG = 'Blog',
  PACKAGE = 'Package',
}

export enum enumTableTitleHabitGoal {
  NO = 'No',
  GOAL_EN = 'Goal EN',
  GOAL_LN = 'Goal NL',
  GOAL_ID = 'ID',
  STATUS = 'Status',
  QAA = 'Questions and Answers',
  ACTION = 'Action',
  IMAGE = 'Image',
}

export enum enumTableTitleHabitQuestion {
  NO = 'No',
  Q_EN = 'Question EN',
  Q_LN = 'Question NL',
  POSITION = 'Position',
  GOAL_ID = 'Goal ID',
  STATUS = 'Status',
  ACTION = 'Action',
}

export enum enumTableTitlePost {
  NO = 'No',
  CONTENT_EN = 'Content EN',
  CONTENT_LN = 'Content NL',
  TAG = 'Tags',
  CREATED_AT = 'Created at',
  STATUS = 'Status',
  ACTION = 'Action',
}

export enum enumTableTitleGroupUserManagement {
  NO = 'No',
  NAME = 'Group name',
  NAME_NL = 'Group name NL',
  DESCRIPTION = 'Description',
  DESCRIPTION_NL = 'Description NL',
  STATUS = 'Status',
  ACTION = 'Action',
}

export enum enumTableTitleEmailManagement {
  NO = 'No',
  TITLE = 'Title',
  TYPE = 'Type',
  GROUP = 'Group',
  STATUS = 'Status',
  ACTION = 'Action',
}

export enum EHabitGoalStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

export enum EUserPostStatus {
  PUBLIC = 'public',
  FRIEND = 'friend',
}

export enum ECallApiStatus {
  PENDING = 'PENDING',
  FULLFILLED = 'FULLFILLED',
}

export enum EReactionType {
  LIKE = 'like',
  LOL = 'lol',
  THUMSP_DOWN = 'thumspDown',
  SAD = 'sad',
  ANGRY = 'angry',
  LOVE = 'love',
}

export enum EEmailContentType {
  NEW_USER = 'new_user',
  ADVERTISEMENT = 'advertisement',
  SUBSCRIPTION = 'subscription',
  COMMUNITY = 'community',
  CHALLENGE = 'challenge',
  DAILY_ROUTINE = 'daily_routine',
  OTHER = 'other',
}

export enum enumTableTitleRoutineManagement {
  NO = 'No',
  TITLE = 'Title',
  TITLE_IN_DUTCH = 'Title in Netherlands',
  TYPE = 'Type',
  IS_DEFAULT = 'Recommendation routine',
  NUMBER_OF_TASKS = 'Number of tasks',
  STATUS = 'Status',
  PUBLISHED_DRAFT = 'Published/Draft',
  ACTION = 'Action',
  GOAL = 'Goal',
}

export enum EDailyRoutineType {
  NUTRITION = 'nutrition',
  EXERCISE = 'exercise',
  MOBILITY = 'mobility',
  SLEEP = 'sleep',
  REFLECTION = 'reflection',
  WELL_BEING = 'well_being',
}

export enum EYesNoOptions {
  ALL = 'all',
  YES = 'yes',
  NO = 'no',
}

export enum EActiveInActiveOptions {
  ALL = 'all',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum EPublishDraftOptions {
  ALL = 'all',
  PUBLISHED = 'published',
  DRAFT = 'draft',
}

export enum EPackagePrivacy {
  PUBLIC = 'public',
  PRIVATE = 'private',
}
