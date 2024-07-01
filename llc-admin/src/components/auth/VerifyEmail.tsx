import React, { memo, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import i18next from 'i18next'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { Typography, message } from 'antd'

import {
  AUTH_THEME_COLOR,
  EForgotPasswordPageType,
  EVerifyOTPStatusType,
  OPT_LENGTH,
} from '@configs'
import { themes } from '@theme'
import { Button, Input } from 'src/common'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  RootState,
  resendCodeAction,
  useAppDispatch,
  verifyPasswordAction,
} from '@redux'
import { BaseResponseError } from '@interfaces'

interface IProps {
  isLoading?: boolean
  onBack: () => void
}

export const VerifyEmailForm = memo((props: IProps) => {
  const { isLoading, onBack } = props
  const [countdown, setCountdown] = useState(120)
  const [isCountdownFinished, setIsCountdownFinished] = useState(false)

  const { t } = useTranslation(['common', 'login', 'error'])
  const dispatch = useAppDispatch()

  const { hash } = useSelector((state: RootState) => {
    return state.auth
  })

  const [searchParams, setSearchParams] = useSearchParams()

  const schemaVerifyEmail = yup.object().shape({
    code: yup
      .string()
      .trim()
      .required(i18next.t('error:otp_required'))
      .matches(/(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/, {
        message: i18next.t('error:otp_invalid'),
      })
      .min(OPT_LENGTH, i18next.t('error:otp_character'))
      .max(OPT_LENGTH, i18next.t('error:otp_character')),
    email: yup.string(),
  })
  const { control, reset, handleSubmit } = useForm<{ code?: string }>({
    mode: 'onChange',
    resolver: yupResolver(schemaVerifyEmail),
  })

  const handleVerifyEmail = handleSubmit(async (value) => {
    try {
      const response = await dispatch(
        verifyPasswordAction({
          hash: hash ?? '',
          otpCode: value.code ?? '',
        })
      ).unwrap()

      if (response?.success) {
        message.success({
          content: i18next.t('login:verify_otp_successfully'),
        })
        setSearchParams(`type=${EForgotPasswordPageType.RESET_PASSWORD}`)
        return
      } else {
        reset({
          code: '',
        })
        message.error({
          content: i18next.t('error:otp_invalid'),
        })
      }
    } catch (err) {
      const error = err as BaseResponseError
      message.error({
        content: error?.message,
      })
    }
  })

  useEffect(() => {
    if (countdown > 0 && !isCountdownFinished) {
      const timer = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }

    if (countdown <= 0) {
      setIsCountdownFinished(true)
    }
  }, [countdown, isCountdownFinished])

  const handleResendCode = async () => {
    try {
      if (isCountdownFinished) {
        const responseDispatchResendCode = await dispatch(
          resendCodeAction({
            hash: hash,
            type: EVerifyOTPStatusType.FORGOT_PASSWORD,
          })
        ).unwrap()

        if (responseDispatchResendCode?.success) {
          message.success({
            content: responseDispatchResendCode?.message,
          })

          setCountdown(120)
          setIsCountdownFinished(false)
        }
      }
    } catch (err) {
      const error = err as BaseResponseError
      message.error({
        content: error?.message,
      })
    }
  }

  return (
    <StyledVerifyEmailForm className="verify-email__section">
      {/* @ts-ignore */}
      <form onSubmit={handleVerifyEmail} className="verify-form items-center">
        <Controller
          name="code"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <Input
                placeholder={t('common:enter_code')}
                name="otp"
                className="input"
                type="text"
                errors={error?.message}
                value={value}
                onChange={onChange}
              />
            )
          }}
        />

        <div className="actions-verify mt-5">
          <Button
            loading={isLoading}
            type="primary"
            size="large"
            htmlType="submit"
            className="submit__btn login-btn max-[600px]:!w-full"
          >
            {t('common:submit')}
          </Button>
          <Button
            type="ghost"
            size="large"
            onClick={onBack}
            className="redirect__btn min-[600px]:ml-[1rem] max-[600px]:!w-full"
          >
            {t('common:back')}
          </Button>
        </div>

        <Typography.Text
          className="resend-code underline mt-2 cursor-pointer"
          onClick={handleResendCode}
          disabled={!isCountdownFinished}
        >
          {isCountdownFinished ? 'Resend Code' : `Resend Code: ${countdown}s`}
        </Typography.Text>
      </form>
    </StyledVerifyEmailForm>
  )
})

export const StyledVerifyEmailForm = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  border-radius: 0.3125rem;
  .heading {
    margin-bottom: 2.25rem;
    .heading__title {
      text-align: center;
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: ${(p) => themes.theme.light.colors.text};
    }
    .desc {
      font-size: 1rem;
      font-weight: 400;
      color: ${(p) => themes.theme.light.colors.subText};
    }
  }

  .actions-verify {
    @media (min-width: 1280px) {
      position: relative !important;
      display: flex;
      align-items: center;
      .btn {
        width: 8rem;
      }
    }
  }

  .resend-email {
    display: flex;
    align-items: center;
    margin-bottom: 1.25rem;
    .resend-text {
      font-size: 1rem;
      font-weight: 400;
      margin-right: 0.375rem;
    }
    .countdown-resendOTP {
      .ant-statistic-content {
        font-size: 1rem;
        font-weight: 500;
        color: ${AUTH_THEME_COLOR};
      }
    }
  }

  .verify-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    .submit__btn {
      @media (min-width: 1280px) {
        margin-right: 0.75rem;
        margin-bottom: 0;
      }
      margin-bottom: 0.75rem;
    }

    .agree-policy__cb {
      margin-bottom: 1.125rem;
    }
  }
`
