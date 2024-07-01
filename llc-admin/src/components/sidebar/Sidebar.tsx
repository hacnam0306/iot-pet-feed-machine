import { Menu } from 'antd'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import React, { forwardRef, memo, useEffect, useState } from 'react'

import {
  enumThemeMode,
  MAIN_THEME_DATA,
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_WIDTH,
} from '@configs'
import { useLocation } from 'react-router-dom'
import { StyledSidebar } from './style'

interface IProps {
  isSMScreen?: boolean
  themeMode?: enumThemeMode
  collapsed?: boolean
  navbarItems?: ItemType[]
  onChangeCollapsed?: (value: boolean) => void
  onSelectMenuItem?: (value: any) => void
}

export const Sidebar = memo(
  forwardRef((props: IProps, ref?: React.Ref<any>) => {
    const {
      themeMode,
      collapsed,
      navbarItems,
      isSMScreen,
      onChangeCollapsed,
      onSelectMenuItem,
    } = props

    const [currentKey, setCurrentKey] = useState<string>('')
    const location = useLocation()

    const isActivePath = (path: string): boolean => {
      return location.pathname.startsWith(path)
    }

    useEffect(() => {
      const activeKeySidebar = navbarItems
        ?.reverse()
        ?.find((item) => isActivePath(item?.key as string))?.key as string
      setCurrentKey(activeKeySidebar)
    }, [location.pathname, navbarItems])
    return (
      <StyledSidebar
        width={
          isSMScreen || collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH
        }
        onCollapse={onChangeCollapsed}
        className="Sidebar"
        $themeMode={themeMode}
        $appTheme={MAIN_THEME_DATA.mainColor}
        $collapsed={collapsed}
        $isSMScreen={isSMScreen}
      >
        <Menu
          onClick={onSelectMenuItem}
          mode="inline"
          // selectedKeys={[currentKey]}
          defaultSelectedKeys={[location.pathname]}
          defaultOpenKeys={[]}
          style={{ height: '100%', borderRight: 0, listStyle: 'none' }}
          items={navbarItems}
        />
      </StyledSidebar>
    )
  })
)
