import { yupResolver } from '@hookform/resolvers/yup'
import { message } from 'antd'
import i18next from 'i18next'
import { memo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'
import * as yup from 'yup'

import { BaseResponseError } from '@interfaces'
import {
  RootState,
  initPasswordAdminAction,
  resetPasswordAction,
  selectAuth,
  useAppDispatch,
  useAppSelector,
} from '@redux'
import { themes } from '@theme'
import { Button, Input } from 'src/common'
import { useSelector } from 'react-redux'
import { PASSWORD_LENGTH_MAX, PASSWORD_LENGTH_MIN, PATH_LOGIN } from '@configs'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

interface IProps {
  isLoading?: boolean
}

const schema = yup.object().shape({
  newPassword: yup
    .string()
    .required(i18next.t('error:new_pass_required'))
    .min(PASSWORD_LENGTH_MIN, i18next.t('error:password_min_error'))
    .max(PASSWORD_LENGTH_MAX, i18next.t('error:password_max_error'))
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d).+$/,
      i18next.t('error:password_format_error')
    ),
  confirmPassword: yup
    .string()
    .required(i18next.t('error:cf_pass_required'))
    .min(PASSWORD_LENGTH_MIN, i18next.t('error:password_min_error'))
    .max(PASSWORD_LENGTH_MAX, i18next.t('error:password_max_error'))
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*.#?&]*$/,
      i18next.t('error:password_format_error')
    )
    .oneOf([yup.ref('newPassword'), null], i18next.t('error:cf_not_match')),
})

export const InitPasswordAdminForm = memo((props: IProps) => {
  const isLoading = useSelector((state: RootState) => {
    return state.auth.loadings.initPasswordAdminActionLoading
  })
  const dispatch = useAppDispatch()
  const { code, forgotEmail } = useAppSelector(selectAuth)
  const { t } = useTranslation(['error', 'common'])

  const navigate = useNavigate()

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const hash = searchParams.get('token')?.replace(/ /g, '+')
  const email = searchParams.get('email')

  const { handleSubmit, reset, control } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const redirectToLogin = () => {
    navigate(PATH_LOGIN, { replace: true })
  }

  if (!hash || !email) {
    redirectToLogin()
  }

  const handleInitPasswordAdmin = handleSubmit(async (value) => {
    try {
      const response = await dispatch(
        initPasswordAdminAction({
          hash: hash as string,
          password: value.newPassword,
          confirmPassword: value.confirmPassword,
        })
      ).unwrap()

      if (response?.success) {
        message.success({
          content: response?.message,
        })
        redirectToLogin?.()
      }
    } catch (err) {
      const error = err as BaseResponseError
      message.error({
        content: error?.message,
      })
    } finally {
      reset({
        newPassword: '',
        confirmPassword: '',
      })
    }
  })

  const handleCancel = () => {
    redirectToLogin?.()
  }

  return (
    <StyledInitPasswordAdminForm className="init-password__section">
      <form
        onSubmit={handleInitPasswordAdmin}
        className="init-form items-center"
      >
        <Controller
          name="newPassword"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <Input
                placeholder="New password"
                name="newPassword"
                type="password"
                containerClassName={'mt-5'}
                errors={error?.message}
                value={value}
                onChange={onChange}
                haveShowPassIcon
              />
            )
          }}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <Input
                placeholder="Confirm Password"
                name="confirmPassword"
                type="password"
                containerClassName={'mt-5'}
                errors={error?.message}
                value={value}
                onChange={onChange}
                haveShowPassIcon
              />
            )
          }}
        />
        <div className="flex items-center max-[800px]:justify-center mb-5 mt-5">
          <Button
            type="ghost"
            size="large"
            onClick={handleCancel}
            className=" min-[600px]:mr-[1rem] max-[600px]:!w-full"
          >
            {t('common:cancel')}
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            className=" login-btn max-[600px]:!w-full"
            loading={isLoading}
          >
            {t('common:submit')}
          </Button>
        </div>
      </form>
    </StyledInitPasswordAdminForm>
  )
})

export const StyledInitPasswordAdminForm = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  .heading {
    margin-bottom: 3.6rem;
    .heading__title {
      text-align: center;
      font-size: 3.2rem;
      font-weight: 700;
      margin-bottom: 0.8rem;
      color: ${(p) => themes.theme.light.colors.text};
    }
    .desc {
      font-size: 1.6rem;
      font-weight: 400;
      color: ${(p) => themes.theme.light.colors.subText};
    }
  }

  .actions {
    @media (min-width: 1280px) {
      display: flex;
      align-items: center;
      .btn {
        width: 12.8rem;
      }
    }
  }

  .init-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    .shared-input {
      margin-bottom: 2rem;
      .inner-input {
        height: 4.6rem;
      }
    }
    .submit__btn {
      @media (min-width: 1280px) {
        margin-right: 1.2rem;
        margin-bottom: 0;
      }
      margin-bottom: 1.2rem;
    }

    .inner-input {
      width: 100%;
      height: 4.6rem;
    }

    .agree-policy__cb {
      margin-bottom: 1.8rem;
    }
  }
`
