import {
  AppstoreOutlined,
  BlockOutlined,
  BookOutlined,
  CommentOutlined,
  ContactsOutlined,
  ContainerOutlined,
  CopyOutlined,
  CreditCardOutlined,
  FileImageOutlined,
  FileProtectOutlined,
  FileTextOutlined,
  GiftOutlined,
  HomeOutlined,
  MailOutlined,
  PicLeftOutlined,
  ProfileOutlined,
  QuestionCircleOutlined,
  RadarChartOutlined,
  ScheduleOutlined,
  SettingOutlined,
  TagsOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { enumNavKey } from '@configs'
import { ICon } from '@interfaces'
import { useTheme } from '@theme'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

interface IProps extends ICon {
  pathKey: enumNavKey
}

export const NavMenuIcon = (props: IProps) => {
  const { pathKey } = props

  const location = useLocation()

  const { theme } = useTheme()

  const genIcon = () => {
    switch (pathKey) {
      case enumNavKey.DASHBOARD:
        return (
          <HomeOutlined
            className="mr-2"
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )
      case enumNavKey.CHAT_CHANNEL:
        return (
          <CommentOutlined
            className="mr-2"
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )
      case enumNavKey.USER_MANAGEMENT:
        return (
          <UserOutlined
            className="mr-2"
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )

      case enumNavKey.MANAGE_ROLE:
        return (
          <TeamOutlined
            className="mr-2"
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )
      case enumNavKey.ARTICLE_MANAGEMENT:
        return (
          <FileTextOutlined
            className="mr-2"
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )
      case enumNavKey.CONTENT_MANAGEMENT:
        return (
          <FileTextOutlined
            className="mr-2"
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )
      case enumNavKey.DECLARATION_MANAGEMENT:
        return (
          <ProfileOutlined
            className="mr-2"
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )

      case enumNavKey.EDITOR:
        return (
          <ProfileOutlined
            className="mr-2"
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )
      case enumNavKey.PACKAGE_MANAGEMENT:
        return (
          <GiftOutlined
            className="mr-2"
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )
      case enumNavKey.CATEGORY_MANAGEMENT:
        return (
          <BlockOutlined
            className="mr-2"
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )
      case enumNavKey.CATEGORY:
        return (
          <AppstoreOutlined
            className="mr-2"
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )
      case enumNavKey.SUBCATEGORY:
        return (
          <PicLeftOutlined
            className="mr-2"
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )
      case enumNavKey.EMAIL_SUBSCRIBED_MANAGEMENT:
        return (
          <MailOutlined
            className="mr-2"
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )
      case enumNavKey.CONTACT:
        return (
          <ContactsOutlined
            className="mr-2"
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )
      case enumNavKey.BLOG_NEW_MANAGEMENT:
        return (
          <PicLeftOutlined
            className="mr-2"
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )
      case enumNavKey.COURSE_MANAGEMENT:
        return (
          <PicLeftOutlined
            className="mr-2"
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )
      case enumNavKey.ABOUT_US_PAGE_MANAGEMENT:
        return (
          <ContactsOutlined
            className="mr-2"
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )

      case enumNavKey.SUB_MENU_HOME_PAGE:
        return (
          <HomeOutlined
            className="mr-2"
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )

      case enumNavKey.SUB_MENU_ABOUT_US_PAGE:
        return (
          <ContactsOutlined
            className="mr-2"
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )

      case enumNavKey.SUB_MENU_TERM_POLICIES_PAGE:
        return (
          <FileProtectOutlined
            className="mr-2"
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )
      case enumNavKey.SUB_ACADEMY_PAGE:
        return (
          <FileTextOutlined
            className="mr-2"
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )

      case enumNavKey.SUB_MENU_BLOG_PAGE:
        return (
          <ContainerOutlined
            className="mr-2 "
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )

      case enumNavKey.SUB_GALLERY_PAGE:
        return (
          <FileImageOutlined
            className="mr-2 "
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )

      case enumNavKey.SUB_PACKAGE_PAGE:
        return (
          <CreditCardOutlined
            className="mr-2 "
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )
      case enumNavKey.HABIT_MANAGEMENT:
        return (
          <PicLeftOutlined
            className="mr-2 "
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )
      case enumNavKey.SUB_HABIT_TAG:
        return (
          <TagsOutlined
            className="mr-2 "
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )
      case enumNavKey.SUB_HABIT_QUESTION:
        return (
          <QuestionCircleOutlined
            className="mr-2 "
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )
      case enumNavKey.SUB_HABIT_CHALLENGE:
        return (
          <RadarChartOutlined
            className="mr-2 "
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )
      case enumNavKey.SUB_DAILY_ROUTINE:
        return (
          <ScheduleOutlined
            className="mr-2 "
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )

      case enumNavKey.POST_MANAGEMENT:
        return (
          <CopyOutlined
            className="mr-2 "
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )

      case enumNavKey.COURSE_MANAGEMENT:
        return (
          <BookOutlined
            className="mr-2 "
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )

      case enumNavKey.HOME_PAGE_MANAGEMENT:
        return (
          <HomeOutlined
            className="mr-2 "
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )
      case enumNavKey.PATH_GROUP_MANAGEMENT:
        return (
          <UsergroupAddOutlined
            className="mr-2 "
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )

      case enumNavKey.PATH_EMAIL_MANAGEMENT:
        return (
          <MailOutlined
            className="mr-2 "
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )

      case enumNavKey.SET_UP_STARTING_SCREEN:
        return (
          <SettingOutlined
            className="mr-2 "
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )
      default:
        return <></>
    }
  }

  return <>{genIcon()}</>
}

const StyledNavMenuIcon = styled.div<{
  $appTheme?: string
}>``
