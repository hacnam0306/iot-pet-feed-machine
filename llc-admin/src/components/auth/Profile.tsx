import { memo, useEffect, useState } from 'react'
import styled from 'styled-components'

import { AntDesignOutlined, EditOutlined } from '@ant-design/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { IChangeProfileData, IProfile } from '@interfaces'
import {
  RootState,
  getProfileAdminAction,
  updateProfileAdminAction,
  useAppDispatch,
  useAppSelector,
} from '@redux'
import { themes } from '@theme'
import { Avatar, Empty, Skeleton, Spin, message } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { profileAPI } from 'src/api/profile'
import { Button, Input, Loading, TextArea } from 'src/common'
import { uploadThumbnailAction } from 'src/redux/actions/blog-news'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { PATH_DASHBOARD, PLACEHOLDER_IMAGE_AVATAR } from '@configs'

interface IProps {
  redirectToLogin?: () => void
  isLoading?: boolean
}

export const ProfileForm = memo((props: IProps) => {
  // const [adminInfo, setAdminInfo] = useState<IProfile>()
  const [isLoading, setIsLoading] = useState(true)
  const [previewImage, setPreviewImage] = useState<string | undefined>()
  const { t } = useTranslation(['common', 'user', 'error'])

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const uploadAvatarLoading = useAppSelector(
    (state: RootState) => state.blog?.loadings?.uploadThumbnailActionLoading
  )

  const adminInfo = useAppSelector(
    (state: RootState) => state.auth?.accountInfo
  )

  const profileSchema = z.object({
    name: z
      .string()
      .trim()
      .nonempty({
        message: t('error:field_required') as string,
      })
      .regex(/^(?!.*[^a-zA-Z\s])\s*[a-zA-Z]+(?:\s+[a-zA-Z]+)*\s*$/, {
        message: t('error:name_format_error') as string,
      })
      .max(50, {
        message: t('error:name_staff_length_error'),
      })
      .min(2, {
        message: t('error:name_staff_length_error'),
      }),
    profilePhotoId: z
      .number()
      .int()
      .min(1, { message: t('error:field_required') as string }),
    phone: z
      .string()
      .trim()
      .nonempty({
        message: t('error:field_required') as string,
      })
      .regex(/^\s*\d*\s*$|^$/, {
        message: t('error:phone_format_error') as string,
      })
      .min(8, {
        message: t('error:phone_length_error') as string,
      })
      .max(13, {
        message: t('error:phone_length_error') as string,
      }),

    email: z
      .string()
      .trim()
      .nonempty({
        message: t('error:field_required') as string,
      }),
    access_type: z
      .string()
      .trim()
      .nonempty({
        message: t('error:field_required') as string,
      }),
    role: z
      .string()
      .trim()
      .nonempty({
        message: t('error:field_required') as string,
      }),
    description: z.optional(
      z.union([
        z
          .string()
          .trim()
          .min(2, {
            message: 'Description must be between 2 and 255 characters long',
          })
          .max(255, {
            message: 'Description must be between 2 and 255 characters long',
          }),
        z.string().trim().length(0),
      ])
    ),
  })

  const defaultValue: IChangeProfileData = {
    name: adminInfo?.name ?? '',
    profilePhotoId: adminInfo?.profilePhotoId ?? 0,
    phone: adminInfo?.phone ?? '',
    email: adminInfo?.email ?? '',
    access_type: adminInfo?.client ?? '',
    role: adminInfo?.role?.name ?? '',
    description: adminInfo?.description ?? '',
  }

  const { control, handleSubmit, setValue, reset } =
    useForm<IChangeProfileData>({
      defaultValues: defaultValue,
      resolver: zodResolver(profileSchema),
      mode: 'onSubmit',
      reValidateMode: 'onChange',
    })

  const onChangeAvatar = async (event: any, callback?: (e: any) => void) => {
    if (!event.target.files[0]) return

    const isLt5M = Number(event.target.files[0].size) / 1024 / 1024 < 5
    if (!isLt5M) {
      message.error('Image must smaller than 5MB!')
      return
    }

    try {
      const response = await dispatch(
        uploadThumbnailAction(event.target.files[0] as File)
      ).unwrap()

      if (response?.success) {
        setPreviewImage(response?.data?.original)
        setValue('profilePhotoId', response?.data?.id)
        callback?.(response?.data?.id)
      }
    } catch (error: any) {
      message.error(error?.message)
    }
  }

  const onSave = async (data: IChangeProfileData) => {
    try {
      const response = await dispatch(updateProfileAdminAction(data)).unwrap()
      if (response?.success) {
        message.success(response?.message)
      }
    } catch (error: any) {
      message.error(error?.message ?? t('error:error_connect_server'))
    }
  }

  const getAdminInfo = async () => {
    try {
      const response = await dispatch(getProfileAdminAction()).unwrap()
      if (response?.success) {
        setValue('name', response?.data?.name)
        setValue('description', response?.data?.description || '')
        setValue('profilePhotoId', response?.data?.profilePhotoId ?? 0)
        setValue('phone', response?.data?.phone ?? '')
        setValue('email', response?.data?.email)
        setValue('access_type', response?.data?.client)
        setValue('role', response?.data?.role?.name)

        setPreviewImage(response?.data?.profilePhoto?.url)
      }
    } catch (error) {
      console.log('error', error)
      message.error(t('error:error_connect_server'))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getAdminInfo()
  }, [])

  return (
    <div className="text-center">
      {isLoading ? (
        <Skeleton paragraph={{ rows: 4 }} />
      ) : adminInfo ? (
        <StyledChangePasswordForm className="profile__section">
          <form>
            <Controller
              name={'profilePhotoId'}
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => {
                return (
                  <div className="flex justify-center items-center flex-col">
                    <div className="wrapper-avatar relative w-[100px] h-[100px]">
                      {!uploadAvatarLoading ? (
                        <img
                          src={previewImage ?? PLACEHOLDER_IMAGE_AVATAR}
                          className="w-full h-full rounded-full object-cover shadow"
                          alt="avatar"
                        />
                      ) : (
                        <div className="w-[100px] h-[100px] flex items-center justify-center rounded-full shadow">
                          <Spin
                            size="default"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          />
                        </div>
                      )}

                      <label
                        className="icon-change-avatar cursor-pointer absolute bottom-0 right-0 bg-[#e2e8f0] w-[30px] h-[30px] flex items-center justify-center rounded-full  hover:bg-[#cbd5e1]"
                        htmlFor="avatar"
                      >
                        <EditOutlined />
                      </label>
                      <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        className="hidden"
                        accept="image/png, image/jpeg"
                        onChange={(e) => {
                          onChangeAvatar(e, onChange)
                        }}
                      />
                    </div>
                    <span className="mt-2 text-[#b91c1c]">
                      {error?.message}
                    </span>
                  </div>
                )
              }}
            />

            {/* Profile item */}

            <div className="profile-item-wrapper">
              <Controller
                name={'name'}
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <Input
                      label={t('common:name')}
                      name="name"
                      type="text"
                      className="input"
                      onChange={onChange}
                      containerClassName={'mt-5'}
                      value={value}
                      style={{
                        marginTop: 10,
                      }}
                      errors={error?.message}
                      alignment="col"
                      required
                    />
                  )
                }}
              />
              <Controller
                name={'phone'}
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <Input
                      label={t('common:phone_number')}
                      name="phone"
                      onChange={onChange}
                      containerClassName={'mt-5'}
                      value={value}
                      style={{ marginTop: 10 }}
                      errors={error?.message}
                      alignment="col"
                      required
                    />
                  )
                }}
              />
              <Controller
                name={'email'}
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <Input
                      label={t('common:email')}
                      name="email"
                      onChange={onChange}
                      containerClassName={'mt-5'}
                      value={value}
                      errors={error?.message}
                      alignment="col"
                      disabled
                      required
                    />
                  )
                }}
              />
              <div className="items-start flex flex-col ">
                <label className="blog-add-thumbnail-label my-3">
                  About me:
                </label>
                <Controller
                  name="description"
                  control={control}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextArea
                        name="description"
                        required
                        placeholder="Description"
                        onChange={onChange}
                        value={value}
                        errors={error?.message}
                      />
                    )
                  }}
                />
              </div>

              <Controller
                name={'role'}
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <Input
                      label={t('common:role')}
                      name="role"
                      onChange={onChange}
                      containerClassName={'mt-5'}
                      value={value}
                      errors={error?.message}
                      alignment="col"
                      disabled
                      required
                    />
                  )
                }}
              />
            </div>

            <div className="mt-6">
              <div className="flex items-center mt-5 justify-center">
                <Button
                  type="ghost"
                  size="middle"
                  className="submit__btn login-btn mr-10"
                  onClick={() => {
                    navigate(PATH_DASHBOARD)
                  }}
                >
                  {'Cancel'}
                </Button>
                <Button
                  htmlType="submit"
                  type="primary"
                  size="middle"
                  className="submit__btn login-btn"
                  loading={isLoading && !uploadAvatarLoading}
                  onClick={handleSubmit(onSave)}
                >
                  {'Save'}
                </Button>
              </div>
            </div>
          </form>
        </StyledChangePasswordForm>
      ) : (
        <Empty description={t('error:no_data')} />
      )}
    </div>
  )
})

export const StyledChangePasswordForm = styled.section`
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

  .reset-form {
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
