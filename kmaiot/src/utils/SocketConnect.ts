import {useEffect, useState} from 'react';
import {io, Socket} from 'socket.io-client';
import {update} from '../redux/slices/app.slice';
import {useAppDispatch} from '../store';

export const useSocketObserver = () => {
  const [socket, setSocket] = useState<Socket>();
  const dispatch = useAppDispatch();
  const getSocket = (url = 'http://192.168.102.7:3008'): Socket => {
    return io(url, {
      transports: ['websocket'],
    });
  };
  const listenEvent = () => {
    socket?.on('connect', () => {
      socket?.on('receive_device_info', data => {
        dispatch(update(data));
      });
    });
    socket?.on('disconnect', () => {
      console.log('disconnect', JSON.stringify(true, null, 2));
    });
  };
  useEffect(() => {
    if (!socket?.connected) {
      setSocket(getSocket());
    }
    return () => {
      socket?.active && socket?.disconnect();
    };
  }, []);

  return {
    socket,
    listenEvent,
  };
};
