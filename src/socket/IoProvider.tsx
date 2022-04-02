import React, {FC, useCallback, useRef, useState} from 'react';
import io, {Socket} from 'socket.io-client';
import IoContext from './IoContext';

const IoProvider: FC = function({children}) {

  const socket = useRef<Socket | null>(null);
  const [status, setStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [error, setError] = useState<any>({});

  const createConnection = useCallback((
      url,
      options = {},
  ) => {
    const cleanup = () => {
      socket.current?.disconnect();
    };
    const newSocket = io(url, options);

    newSocket.on('error', (error) => setError(error));
    newSocket.on('connect', () => setStatus('connected'));
    newSocket.on('disconnect', () => setStatus('disconnected'));

    socket.current = newSocket;

    return {
      socket: socket.current,
      cleanup,
    };
  }, []);

  return (
      <IoContext.Provider
          value={{
            socket: socket.current,
            createConnection,
            status,
            error,
          }}
      >
        {children}
      </IoContext.Provider>
  );
};

export default IoProvider;
