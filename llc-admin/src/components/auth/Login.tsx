import { Typography } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { BaseSyntheticEvent, memo } from 'react'
import { Control, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ILoginFields } from '@interfaces'
import { Button, Input } from 'src/common'
import { StyledLoginSection } from './loginStyle'

interface IProps {
  isLoading?: boolean
  isRemember?: boolean
  onRemember?: (value: CheckboxChangeEvent) => void
  redirectToForgot?: () => void
  redirectToSignUp?: () => void
  control: Control<ILoginFields>
  handleLogin: (
    e?: BaseSyntheticEvent<ILoginFields, any, any> | undefined
  ) => Promise<void>
}

export const LoginForm = memo((props: IProps) => {
  const { isLoading, control, redirectToForgot, handleLogin } = props
  const { t } = useTranslation(['common', 'login'])

  return (
    <StyledLoginSection className="login__section">
      {/* @ts-ignore */}
      <form onSubmit={handleLogin} className="login-form">
        <Controller
          name="email"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <Input
                label="E-mail Address"
                placeholder={t('common:email')}
                name="email"
                errors={error?.message}
                value={value}
                onChange={onChange}
              />
            )
          }}
        />
        <Controller
          name="password"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <Input
                label="Password"
                placeholder="Password"
                type="password"
                containerClassName={'mt-5'}
                haveShowPassIcon
                errors={error?.message}
                value={value}
                onChange={onChange}
              />
            )
          }}
        />

        {/* Remove remember me */}
        {/* <div className="grid grid-cols-7 w-full ">
          <div className={'sm:col-span-2 sm:min-w-[1px] hidden sm:block'}></div>

          <div className="Input__text-error mt-2 text-sm col-span-7 sm:col-span-5">
            <Checkbox onChange={onRemember} checked={isRemember}>
              Remember Me
            </Checkbox>
          </div>
        </div> */}
        <div className="grid grid-cols-7 w-full ">
          <div className={'sm:col-span-2 sm:min-w-[1px] hidden sm:block'}></div>

          <div className="Input__text-error mt-2 text-sm col-span-7 sm:col-span-5">
            <Typography.Text
              className="redirect-btn forgot-text text-left"
              underline
              onClick={redirectToForgot}
            >
              Forgot your password?
            </Typography.Text>
          </div>
        </div>

        <div className="grid grid-cols-7 w-full mt-5 ">
          <div className={'sm:col-span-2 sm:min-w-[1px] hidden sm:block'}></div>

          <div className="Input__text-error mt-2 text-sm col-span-7 sm:col-span-5 flex justify-center sm:block">
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              className="submit__btn login-btn"
              loading={isLoading}
            >
              {t('common:sign_in')}
            </Button>
          </div>
        </div>
      </form>
    </StyledLoginSection>
  )
})
