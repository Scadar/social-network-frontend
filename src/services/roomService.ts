import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './config/query';
import {IChatRoom} from '../models/chatModels';
import {IChatMessage} from '../models/chatMessage';

export interface IChatRoomWithLastMessage {
  room: IChatRoom;
  lastMessage: IChatMessage;
}

export const roomApi = createApi({
  reducerPath: 'roomApi',
  baseQuery: baseQuery,
  endpoints: (build) => ({
    findOrCreatePrivateChatRoom: build.mutation<IChatRoom, { targetUserId: string }>({
      query: ({targetUserId}) => ({
        url: `/room`,
        method: 'POST',
        body: {targetUserId},
      }),
    }),
    findAllMyRooms: build.query<IChatRoomWithLastMessage[], void>({
      query: () => ({
        url: '/room',
        method: 'GET',
      }),
    }),
    findRoomInfo: build.query<IChatRoom, string>({
      query: (chatRoomId) => ({
        url: `/room/chatRoom/${chatRoomId}`,
        method: 'GET',
      }),
    }),
  }),
});
