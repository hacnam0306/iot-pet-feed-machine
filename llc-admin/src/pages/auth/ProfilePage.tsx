import { Card } from 'antd'
import styled from 'styled-components'

import { ProfileForm } from 'src/components/auth/Profile'

export const ProfilePage = () => {
  return (
    <ProfilePagePageStyled className="flex items-center justify-center w-full">
      <ProfileForm />
    </ProfilePagePageStyled>
  )
}

const ProfilePagePageStyled = styled(Card)`
  .ant-card-body {
    width: 40%;
  }

  .reset-form {
    > div:last-child {
      justify-content: center;
    }
  }
`
