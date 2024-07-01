import { yupResolver } from '@hookform/resolvers/yup'
import { Card, Typography, message } from 'antd'
import i18next from 'i18next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import { LoginForm } from '@components'
import { PATH_DASHBOARD, PATH_FORGOT_PASSWORD, PATH_SIGN_UP } from '@configs'
import { BaseResponseError, ILoginFields } from '@interfaces'
import {
  RootState,
  loginAction,
  selectAuthLoading,
  useAppDispatch,
} from '@redux'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required(i18next.t('error:email_required'))
    .email(i18next.t('error:email_format_error')),
  password: yup.string().required(i18next.t('error:pass_required')),
})

export const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [isRemember, setIsRemember] = useState<boolean>(false)

  const loginActionLoading = useSelector((state: RootState) =>
    selectAuthLoading(state, 'loginAction')
  )

  const { control, handleSubmit, reset, setValue } = useForm<ILoginFields>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  })

  const handleRedirectToForgot = () => {
    navigate(PATH_FORGOT_PASSWORD)
  }

  const handleRedirectToSignUp = () => {
    navigate(PATH_SIGN_UP)
  }

  const handleLogin = handleSubmit(async (data) => {
    try {
      const res = await dispatch(loginAction({ ...data })).unwrap()
      if (res) {
        message.success({
          content: i18next.t('login:login_success'),
        })
        navigate(PATH_DASHBOARD)
      }
    } catch (err) {
      const error = err as BaseResponseError
      console.log({ error })
      // reset({ password: '' })
      setValue('password', '')
    }
  })

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="!rounded-2xl  min-[1280px]:w-[400px]">
        <Typography.Title level={3} className="text-left">
          Sign In
        </Typography.Title>
        <LoginForm
          control={control}
          redirectToForgot={handleRedirectToForgot}
          redirectToSignUp={handleRedirectToSignUp}
          handleLogin={handleLogin}
          isLoading={loginActionLoading}
          isRemember={isRemember}
          onRemember={(e: CheckboxChangeEvent) =>
            setIsRemember(e.target.checked)
          }
        />
      </Card>
    </div>
  )
}
