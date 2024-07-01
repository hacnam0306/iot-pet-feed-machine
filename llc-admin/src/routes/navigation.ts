export const PATH_HOME = '/'
export const PATH_DASHBOARD = '/dashboard'
export const PATH_DASHBOARD_OK = '/dashboard/:id'
export const PATH_MEMBER = '/members'
export const PATH_DEVICE = '/'
//auth
export const PATH_LOGIN = '/login'
export const PATH_SIGN_UP = '/register'
export const PATH_FORGOT_PASSWORD = '/forgot-password'
export const PATH_VERIFY_EMAIL = '/verify-email'
export const PATH_RESET_PASSWORD = '/reset-password'
export const PATH_INIT_PASSWORD_ADMIN = '/init-admin-account'
export const PATH_CHANGE_PASSWORD = '/change-password'
export const PATH_TERM_AND_POLICY = '/term-and-policy'
export const PATH_ABOUT = '/about'
//System settings
export const PATH_GENERAL = '/general'
export const PATH_USER_PROFILE = '/profile'
export const PATH_POLICY = '/policy'
export const PATH_BRANCH_GROUP = '/branch-group'
//error
export const PATH_404 = '/*'
// Plan management
export const PATH_PLAN = '/plan-management'
export const PATH_DETAIL_PLAN = '/plan-managament/:type'
//User management
export const PATH_USER_MANAGEMENT = '/user-management'
export const PATH_EDIT_USER = `${PATH_USER_MANAGEMENT}/edit/:userId`
export const PATH_USER_DETAIL = `${PATH_USER_MANAGEMENT}/user-detail/:userId`
// Notification
export const PATH_NOTIFICATION = '/notification'
export const PATH_EDIT_NOTIFICATION = `${PATH_NOTIFICATION}/edit/:notificationId`
// Chat channel
export const PATH_CHAT_CHANNEL = '/chat-channel'
// Manage role
export const PATH_MANAGE_ROLE = '/manage-role'
// Article management
export const PATH_ARTICLE_MANAGEMENT = '/content-management'
// Declaration management
export const PATH_DECLARATION_MANAGEMENT = '/declaration-management'
//Content management
export const PATH_CONTENT_MANAGEMENT = '/content-management'
// Staff and Role management
export const PATH_STAFF_AND_ROLE_MANAGEMENT = '/staff-and-role-management'
// package-management
export const PATH_PACKAGE_MANAGEMENT = '/package-management'

//Category management
export const PATH_CATEGORY_MANAGEMENT = '/category-management'
export const PATH_NEW_LETTER = '/new-letter'
export const PATH_CONTACT = '/contact'

// Blog management
export const PATH_BLOG_NEWS = '/blog-management'
export const PATH_ADD_BLOG_NEWS = `${PATH_BLOG_NEWS}/new`
export const PATH_DETAIL_BLOG_NEWS = `${PATH_BLOG_NEWS}/blog-news-detail/:blogId`

//Category
export const PATH_CATEGORY = '/category'
export const PATH_SUB_CATEGORY = '/sub-category'

export const PATH_EDITOR = '/editor'

export const PATH_ABOUT_US_PAGE_MANAGEMENT = '/about-us-page-management'

// Items in declaration management
export const ROAD_MAP = 'Roadmap'
export const QUOTES = 'Quotes'
export const SLIDE_SHOW = 'Slide show'
export const COMMUNITY_CONTENT = 'Community'
export const MEMBERSHIP = 'Membership'
export const EDIT_COMPANY_INFOR = 'Edit company info'
export const MAIL_CONTENT = 'Mail content'
export const ABOUT_US = 'About us'
export const HOME_PAGE_VIDEO = 'Homepage video'
export const TERM = 'Term'
export const PRIVACY_PAGE = 'Privacy page'
export const CONTACT_PAGE = 'Contact'
export const TERM_POLICIES_PAGE = 'Term & policies page'
export const HOME_SEO = 'SEO config'
export const HOME_PAGE_CONTENT = 'HOME_PAGE_CONTENT'

// PATH Items in content management
export const PATH_SUB_MENU_HOME_PAGE = '/home-content'
export const PATH_SUB_MENU_ABOUT_US_PAGE = '/about-us-content'
export const PATH_SUB_MENU_TERM_POLICIES_PAGE = '/terms-&-policies-content'
export const PATH_SUB_MENU_BLOG_PAGE = '/blog-content'
export const PATH_SUB_GALLERY_PAGE = '/gallery-content'
export const PATH_SUB_PACKAGE_PAGE = '/package-content'

// Habit management
export const PATH_HABIT_MANAGEMENT = '/habit-management'
export const PATH_SUB_HABIT_GOAL = '/goal-content'
export const PATH_SUB_HABIT_QUESTION = '/question-content'
export const PATH_SUB_HABIT_QUESTION_DETAIL = '/question-detail'
export const PATH_SUB_HABIT_CHALLENGE = '/challenge-content'
export const PATH_CHALLENGE_DETAIL = `${PATH_SUB_HABIT_CHALLENGE}/:clId`
export const PATH_CHALLENGE_DETAIL_CREATE = `${PATH_SUB_HABIT_CHALLENGE}/create`
export const PATH_CHALLENGE_DETAIL_V2 = `${PATH_SUB_HABIT_CHALLENGE}/detail/:clId`
export const PATH_CHALLENGE_DETAIL_PARTICIPANTS = `${PATH_SUB_HABIT_CHALLENGE}/:clId/participants/:userId`

export const PATH_CHALLENGE_DETAIL_MISSION = `${PATH_SUB_HABIT_CHALLENGE}/:clId/missions`
export const PATH_CHALLENGE_DETAIL_NEW_MISSION = `${PATH_CHALLENGE_DETAIL}/missions/:ms`
export const PATH_CHALLENGE_DETAIL_NEW_MISSION_PAGE = `${PATH_CHALLENGE_DETAIL}/missions`
export const PATH_MISSION_DETAIL_CREATE = `${PATH_SUB_HABIT_CHALLENGE}/missions/create`

export const PATH_SUB_DAILY_ROUTINE = '/daily-routine-content'
export const PATH_SUB_SETUP_DAILY_ROUTINE = '/set-up-starting-screen'
export const PATH_DAILY_ROUTINE_DETAIL = `${PATH_SUB_DAILY_ROUTINE}/:routineId`
export const PATH_DAILY_ROUTINE_DETAIL_CREATE = `${PATH_SUB_DAILY_ROUTINE}/create`
export const PATH_DAILY_ROUTINE_JOBS = `${PATH_DAILY_ROUTINE_DETAIL}/jobs`
export const PATH_DAILY_ROUTINE_JOBS_DETAIL = `${PATH_DAILY_ROUTINE_DETAIL}/jobs/:jobAction`
// post management
export const PATH_POST_MANAGEMENT = '/community-management'
export const PATH_POST_CREATE = '/community-management/create-new-post'
export const PATH_EDIT_POST = '/community-management/edit-post/:postId'

// Group management
export const PATH_GROUP_MANAGEMENT = '/group-management'
export const PATH_GROUP_DETAIL = '/group-management/group-detail/:groupId'
export const PATH_GROUP_CREATE = '/group-management/create-group'

// Email management
export const PATH_EMAIL_MANAGEMENT = '/email-management'
export const PATH_EMAIL_DETAIL =
  '/email-management/edit-email-content/:emailContentId'
export const PATH_EMAIL_CREATE = '/email-management/create-email-content'

// Membership
export const PATH_SUB_MEMBERSHIP_PAGE = '/membership-page'
export const PATH_ACADEMY_PAGE = '/academy-page'

// Home page management

export const PATH_HOME_PAGE_MANAGEMENT = '/home-page-management'
export const PATH_HOME_CONTENT_DETAIL = `${PATH_HOME_PAGE_MANAGEMENT}/:id`

//Course Management
export const PATH_COURSE_MANAGEMENT = '/course-management'
export const PATH_COURSE_MANAGEMENT_NEW = `${PATH_COURSE_MANAGEMENT}/new`
export const PATH_COURSE_MANAGEMENT_DETAIL = `${PATH_COURSE_MANAGEMENT}/:id`
