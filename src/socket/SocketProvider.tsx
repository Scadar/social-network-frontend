import * as React from 'react';
import {useCallback, useState} from 'react';
import {io, ManagerOptions, Socket} from 'socket.io-client';
import {SocketOptions as _SocketOptions} from 'socket.io-client/build/esm/socket';

interface ProviderProps {
  children: React.ReactNode;
  uri: string;
  options?: Partial<SocketOptions>;
  autoConnect?: boolean;
}

export interface SocketOptions extends _SocketOptions, ManagerOptions {
  url: string;
}

interface SocketStore {
  socket: Socket | null;

  setSocket(socket: Socket | null): void;

  options: SocketOptions;

  setOptions(options: Partial<SocketOptions>): void;
}

export const SocketContext = React.createContext<SocketStore>({
  socket: null,
  setSocket() {
  },
  options: {} as SocketOptions,
  setOptions() {
  },
});

export function SocketProvider({uri, options: propsOptions, children, autoConnect = true}: ProviderProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [options, setOptions] = useState<SocketOptions>({...propsOptions} as SocketOptions);

  const addOptions = (newOption: Partial<SocketOptions>) => {
    setOptions(prev => ({...prev, newOption}));
  };

  const connect = useCallback((url: string, options?: Partial<SocketOptions>) => {
    if (socket) return;
    const _socket = io(url, options);
    setSocket(_socket);
  }, [socket]);

  const disconnect = useCallback(() => {
    if (!socket) return;
    socket.disconnect();
    setSocket(null);
  }, [socket, setSocket]);

  React.useEffect(() => {
    if (!autoConnect) return;
    connect(uri, options);
    return () => {
      disconnect();
    };
  }, [uri, options, autoConnect, connect, disconnect]);

  return (
      <SocketContext.Provider
          value={{
            socket,
            setSocket,
            options,
            setOptions: addOptions,
          }}
      >
        {children}
      </SocketContext.Provider>
  );
}
