import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './config/query';
import {IChatMessageWithSenderDto} from '../models/chatMessage';
import {addMessagesToEnd} from '../store/slices/messages';

export const chatMessageApi = createApi({
  reducerPath: 'chatMessageApi',
  baseQuery: baseQuery,
  endpoints: (build) => ({
    getMessages: build.query<IChatMessageWithSenderDto[], { chatRoomId: string, skip: number, pageSize: number }>({
      query: ({chatRoomId, skip, pageSize}) => ({
        url: 'message',
        method: 'GET',
        params: {chatRoomId, skip, pageSize},
      }),
      onQueryStarted(arg, {queryFulfilled, dispatch}) {
        queryFulfilled.then(({data}) => {
          dispatch(addMessagesToEnd(data));
        });
      },
    }),
  }),
});
