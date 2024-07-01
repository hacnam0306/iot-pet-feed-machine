import { Divider, MenuProps } from 'antd'
import Cookies from 'js-cookie'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { HomeFilled, KeyOutlined, UserOutlined } from '@ant-design/icons'
import {
  LLC_ACCESS_TOKEN,
  MAIN_THEME_DATA,
  MAT_SM_SCREEN_WIDTH,
  PATH_CHANGE_PASSWORD,
  PATH_DASHBOARD,
  PATH_LOGIN,
  PATH_USER_PROFILE,
  enumThemeMode,
} from '@configs'
import { BreadcrumbsModule } from '@modules'
import { authActions, useAppSelector } from '@redux'
import { useMediaQuery } from '@utils'
import {
  LogoutIcon,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserHeaderIcon,
} from '../Icon'
import { StyledDropdown, StyledHeader } from './styles'

interface IProps {
  openMenuDropdown?: boolean
  themeMode?: enumThemeMode
  collapsed: boolean
  showMenuDropdown?: boolean
  changeCollapsed: (value: boolean) => void
  handleToggleDropdown: () => void
}

export const Header = (props: IProps) => {
  const { themeMode, collapsed, changeCollapsed, handleToggleDropdown } = props
  const dispatch = useDispatch()
  const isSMScreen = useMediaQuery(`(max-width:${MAT_SM_SCREEN_WIDTH})`)
  const { t } = useTranslation(['common', 'login', 'dashboard'])
  const navigate = useNavigate()

  const currentUser = useAppSelector((state) => state.auth?.accountInfo)

  const handleLogOut = () => {
    Cookies.remove(LLC_ACCESS_TOKEN)
    sessionStorage.clear()
    dispatch(authActions.logout())
    navigate(PATH_LOGIN)
  }

  const menuUserItems: MenuProps['items'] = [
    {
      label: (
        <>
          <div
            className="home flex items-center justify-start w-full"
            onClick={() => {
              navigate(PATH_DASHBOARD)
            }}
          >
            <HomeFilled />
            <span>{t('common:home')}</span>
          </div>
        </>
      ),
      key: '0',
    },
    {
      label: (
        <>
          <div
            className="profile flex items-center justify-start w-full"
            onClick={() => {
              navigate(PATH_USER_PROFILE)
            }}
          >
            <UserOutlined />
            <span>{t('common:profile')}</span>
          </div>
        </>
      ),
      key: '1',
    },
    {
      label: (
        <>
          <div
            className="logout flex items-center justify-start w-full"
            onClick={() => {
              navigate(PATH_CHANGE_PASSWORD)
            }}
          >
            <KeyOutlined />
            <span>{t('login:change_password')}</span>
          </div>
        </>
      ),
      key: '2',
    },
    {
      label: (
        <div
          className="logout flex items-center justify-start w-full"
          onClick={handleLogOut}
        >
          <LogoutIcon size={16} />
          <span>{t('common:logout')}</span>
        </div>
      ),
      key: '3',
    },
  ]
  return (
    <StyledHeader
      className="header"
      theme_mode={themeMode}
      app_theme={MAIN_THEME_DATA.mainColor}
    >
      <div className="header-container">
        <div className="header-logo">
          <div className="head">
            <span className="title">Live Life Clean</span>
          </div>
          {!isSMScreen &&
            React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: () => changeCollapsed(!collapsed),
              }
            )}
        </div>
        <Divider className="header-divider" type="vertical" />
        <div className="header-right">
          <div className="header-content">
            <BreadcrumbsModule />
            <div className="right-content  flex justify-center items-center gap-2">
              <div className="header-username text-white">
                {currentUser?.name}
              </div>
              <div
                className="app-btn settings-btn ignoreOutSide-MenuDropdown"
                onClick={handleToggleDropdown}
              >
                <StyledDropdown
                  overlayClassName="header-dropdown-menu"
                  menu={{ items: menuUserItems }}
                  trigger={['click']}
                >
                  <UserHeaderIcon size={18} />
                </StyledDropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledHeader>
  )
}
