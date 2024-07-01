
import axiosClient from 'src/api/axiosClient'

export const dowloadFile = async (endpoint: string) => {
  try {
    const res = await axiosClient.get(`/${endpoint}`, {
      responseType: 'blob',
    })

    const fileName = res.headers['content-disposition'].split('=')
    const downloadUrl = window.URL.createObjectURL(res.data)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.setAttribute('download', fileName[1]) //any other extension
    document.body.appendChild(link)
    link.click()
    link.remove()
  } catch (error: any) {
    if (error.response.status === '401') {
      throw new Error('Unauthorized')
    }
    throw new Error('Can not export file')
  }
}
