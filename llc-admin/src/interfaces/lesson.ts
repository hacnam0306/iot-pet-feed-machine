export interface ILessonCreateForm {
  title: string
  content: string
}

export interface IAddNewLesson {
  title: string
  content: string
  thumbnailId?: number
  videoId?: number
  fileIds?: number[]
}

export interface ILessonItem {
  id?: number
  title: string
  content: string
  video?: Media
  files?: Media[]
  thumbnail?: Media
}

export interface Media {
  id: number
  userId: number
  bucket: string
  path: string
  type: string
  createdAt: string
  updatedAt: string
  url: string
}

export interface IResponseGetLessonDetail {
  id?: number
  title: string
  content: string
  video?: Media
  files?: Media[]
  thumbnail?: Media
}

export type TLessonDetail = {
  id: number
  title: string
  content: string
  video?: Media
  files?: Media[]
  thumbnail?: Media
}
export interface IAssignment {
  id?: number
  title: string
  content?: string
  titleInDutch: string
  contentInDutch: string
  type: string
  questions?: IQuestion[]
  restrictTimer?: number
  sectionId?: number
  attachmentIds?: number[]
  attachments?: IAttachment[]
}

export interface IQuestion {
  id?: number
  content: string
  isMultipleChoice: boolean
  isMultipleChoiceClicked?: boolean
  answers: {
    id?: number
    content: string
    isCorrected: boolean
  }[]
}

export interface IAttachment {
  id: number
  url: string
  name: string
}

export interface GetAssignmentResponse {
  media: Media
  id: number
  sectionId: number
  title: string
  content: string
  titleInDutch: string
  contentInDutch: string
  type: string
  mediaId: null
  isTrial: true
  thumbnailId: number
  restrictTimer: number
  thumbnail: Media
  lessonAttachment: {
    id: number
    lessonId: number
    attachmentId: number
    attachment: {
      id: number
      userId: number
      bucket: string
      path: string
      type: string
      name: string
      category: string
      url: string
    }
  }[]

  questions: {
    id: number
    lessonId: number
    content: string
    isMultipleChoice: false
    answers: [
      {
        id: number
        questionId: number
        content: string
        isCorrected: true
      }
    ]
  }[]
}
