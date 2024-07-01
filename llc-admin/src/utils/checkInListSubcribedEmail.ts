import { ISubscribedEmail } from 'src/interfaces/group-user-management'

export const isInListSubscribedEmail = (
  list: ISubscribedEmail[],
  item: ISubscribedEmail
) => {
  return list?.some((i) => i?.email === item?.email)
}
