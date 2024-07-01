import {
  enumTypeFirebaseErrorCode,
  enumTypeFirebaseErrorLoginNotification,
} from '@configs'
import { ILoginFields } from '@interfaces'
import { message } from 'antd'
import { signInWithEmailAndPassword } from 'firebase/auth'
import authApp from 'src/configs/firebase-config'
import i18next from 'i18next'

export const signInEmailAndPassword = async (payload: ILoginFields) => {
  const { email, password } = payload
  try {
    const response = await signInWithEmailAndPassword(
      authApp,
      email ?? '',
      password ?? ''
    )
    return response
  } catch (error: any) {
    if (
      error.code === enumTypeFirebaseErrorCode.USER_NOT_FOUND ||
      error.code === enumTypeFirebaseErrorCode.WRONG_PASSWORD
    ) {
      message.error(i18next.t('error:fail_login'))
    } else {
      message.error(enumTypeFirebaseErrorLoginNotification.SOMETHING_WENT_WRONG)
    }
  }
}
