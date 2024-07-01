import { authActions, useAppDispatch } from '@redux'
import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

export const useSocketObserver = () => {
  const [socket, setSocket] = useState<Socket>()
  const dispatch = useAppDispatch()
  const getSocket = (url = 'http://localhost:3008'): Socket => {
    return io(url, {
      transports: ['websocket'],
    })
  }
  const listenEvent = () => {
    socket?.on('connect', () => {
      socket?.on('receive_device_info', (data) => {
        dispatch(authActions.setDevice(data))
      })
    })
    socket?.on('disconnect', () => {
      console.log('disconnect', JSON.stringify(true, null, 2))
    })
  }
  useEffect(() => {
    if (!socket?.connected) {
      setSocket(getSocket())
    }
    return () => {
      socket?.active && socket?.disconnect()
    }
  }, [])

  return {
    socket,
    listenEvent,
  }
}
