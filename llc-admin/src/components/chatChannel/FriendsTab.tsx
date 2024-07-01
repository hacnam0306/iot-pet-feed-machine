import React, { useEffect } from 'react'

interface IFriendsTabProps {
  activeTab?: string
}
export default function FriendsTab({ activeTab }: IFriendsTabProps) {
  useEffect(() => {
    // activeTab === EUserManagementTabs.USER_LOG &&
    //   getUserLogs({
    //     id: Number(userId),
    //     page: 1,
    //     limit: INITIAL_PAGINATION_SiZE,
    //   })
  }, [activeTab])
  return <div className="m-5 h-full">Friends tabs</div>
}
