import {createApi} from '@reduxjs/toolkit/query/react';
import {IUser} from '../models/authModels';
import {baseQuery} from './config/query';
import {setAuthUser} from '../store/slices/auth';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQuery,
  endpoints: (build) => ({
    fetchUserById: build.query<IUser, string>({
      query: (id) => ({
        url: `/user/${id}`,
        method: 'GET',
      }),
    }),
    updatePhotoProfile: build.mutation<IUser, FormData>({
      query: (body) => ({
        url: `/user/updatePhotoProfile`,
        method: 'PATCH',
        body,
      }),
      async onQueryStarted(arg, api) {
        const {data} = await api.queryFulfilled;
        api.dispatch(setAuthUser(data));
      },
    }),
    deletePhotoProfile: build.mutation<IUser, void>({
      query: () => ({
        url: `/user/deletePhotoProfile`,
        method: 'DELETE',
      }),
      async onQueryStarted(arg, api) {
        const {data} = await api.queryFulfilled;
        api.dispatch(setAuthUser(data));
      },
    }),
  }),
});
