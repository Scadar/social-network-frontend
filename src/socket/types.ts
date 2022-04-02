import { ManagerOptions, Socket, SocketOptions } from "socket.io-client";

export type CreateConnectionFuncReturnType = {
  socket: Socket;
  cleanup: () => void;
};

export type CreateConnectionFunc = (
    url: string,
    options?: Partial<ManagerOptions & SocketOptions> | undefined
) => CreateConnectionFuncReturnType | undefined;

export type IoContextInterface = {
  socket: Socket | null;
  createConnection: CreateConnectionFunc;
  error: any;
  status: "connecting" | "connected" | "disconnected";
};

export type UseSocketReturnType = {
  socket: Socket;
  error: any;
  status: "connecting" | "connected" | "disconnected";
};
