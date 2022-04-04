import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './config/query';
import {IFile} from '../models/file';

export const diskApi = createApi({
  reducerPath: 'diskApi',
  baseQuery: baseQuery,
  tagTypes: ['File'],
  endpoints: (build) => ({
    createDir: build.mutation<IFile, { name: string, parentId?: string }>({
      query: ({name, parentId}) => ({
        url: `/files/createDir`,
        method: 'POST',
        body: {name, parentId},
      }),
      invalidatesTags: ['File'],
    }),
    getFilesByParent: build.query<IFile[], { parentId?: string }>({
      query: ({parentId}) => ({
        url: `/files`,
        method: 'GET',
        params: {parentId},
      }),
      providesTags: ['File'],
    }),
  }),
});
