import { Card, Typography } from 'antd'
import styled from 'styled-components'

import { InitPasswordAdminForm } from 'src/components/auth/InitPasswordAdmin'
import { useTranslation } from 'react-i18next'

export const InitPasswordAdminPage = () => {
  const { t } = useTranslation(['common'])
  return (
    <InitPasswordAdminPageStyled className="flex items-center justify-center w-full h-screen">
      <div className="min-h-screen flex items-center justify-center">
        <Card className="!rounded-2xl min-[1280px]:min-w-[30rem] ">
          <Typography.Title level={3} className="capitalize text-center">
            {t('common:init_password_admin')}
          </Typography.Title>

          <InitPasswordAdminForm />
        </Card>
      </div>
    </InitPasswordAdminPageStyled>
  )
}

const InitPasswordAdminPageStyled = styled(Card)`
  background-color: #f0f2f5;
  .init-password-form {
    > div:last-child {
      justify-content: center;
    }
  }
`
