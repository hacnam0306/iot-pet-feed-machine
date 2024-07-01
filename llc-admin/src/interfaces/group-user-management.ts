export interface IGroupUserForm {
  name: string
  description: string
  emailSubscribers: Array<string>
  status: boolean
}

export type TGetGroupUserParams = {
  page?: number
  limit?: number
  search?: string
  status?: boolean
}

export interface IGroupUser {
  id: number
  name: string
  description: string
  status: boolean
}

export type TSubscribedEmailParams = {
  page?: number
  limit?: number
  search?: string
  categoryId?: number
  packageId?: number
  isAll?: boolean
}

export interface ISubscribedEmail {
  email: string
  name: string
}

export interface IGetGroupUserByIdResponse {
  id: number
  name: string
  description: string
  status: boolean
  subscribers: Array<ISubscribedEmail>
  emailSubscribers: Array<string>
  isAll?: boolean
}

export interface IGetGroupUserResponse {
  items: IGetGroupUserByIdResponse[]
  total: number
  page: number
  limit: number
}
