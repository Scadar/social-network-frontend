import {useContext} from 'react';
import {SocketContext} from './SocketProvider';

export function useSocket() {
  const {socket} = useContext(SocketContext);
  return socket;
}
