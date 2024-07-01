import { io, Socket } from 'socket.io-client'
import Cookies from 'js-cookie'

let socketInstance: Socket | null = null

export const getSocketInstance = (): Socket | null => {
  const token = Cookies.get('llc-access-token')

  if (token && !socketInstance) {
    const URL =
      process.env.REACT_APP_PUBLIC_API_URL &&
      process.env.REACT_APP_PUBLIC_API_URL.replace('/api', '/room')
    socketInstance = io(URL as string, {
      transports: ['websocket'],
      auth: {
        token: `Bearer ${token}`,
      },
    })
  }

  return socketInstance
}
