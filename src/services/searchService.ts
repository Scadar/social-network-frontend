import {createApi} from '@reduxjs/toolkit/query/react';
import {IUserWithFriendStatus} from '../models/authModels';
import {baseQuery} from './config/query';
import {PaginationResponse} from '../models/base';

type FetchUserByFirstNameAndLastNameProps = {
  firstName: string | null;
  lastName: string | null;
  page: number;
  pageSize: number;
}

export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: baseQuery,
  tagTypes: ['User'],
  endpoints: (build) => ({
    fetchUserByFirstNameAndLastName: build.query<PaginationResponse<IUserWithFriendStatus>, FetchUserByFirstNameAndLastNameProps>(
        {
          query: (params) => ({
            url: `/user/findUserByFirstNameAndLastName`,
            method: 'GET',
            params,
          }),
          providesTags: (result) =>
              result
                  ? [
                    ...result.data.map(({_id}) => ({type: 'User' as const, _id})),
                    {type: 'User', _id: 'PARTIAL-LIST'},
                  ]
                  : [{type: 'User', _id: 'PARTIAL-LIST'}],
        }),
  }),
});
