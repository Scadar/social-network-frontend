import {createApi} from '@reduxjs/toolkit/query/react';
import {IUserWithFriendStatus} from '../models/authModels';
import {baseQuery} from './config/query';
import {UserToUserRelationship} from '../models/friendModels';

export const friendApi = createApi({
  reducerPath: 'friendApi',
  baseQuery: baseQuery,
  tagTypes: ['User'],
  endpoints: (build) => ({
    findUsersByFriendStatus: build.query<IUserWithFriendStatus[], { status: UserToUserRelationship }>({
      query: ({status}) => ({
        url: `/user/findUsersByFriendStatus?status=${status}`,
        method: 'GET',
      }),
    }),
    inviteFriend: build.mutation<void, string>({
      query: (targetId) => ({
        url: `/friend/invite`,
        method: 'POST',
        body: {targetId},
      }),
      invalidatesTags: (result, error, arg) => [{type: 'User', _id: arg}],
    }),
    deleteFriend: build.mutation<void, string>({
      query: (targetId) => ({
        url: `/friend/delete/${targetId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [{type: 'User', _id: arg}],
    }),
  }),

});
