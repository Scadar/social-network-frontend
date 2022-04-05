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
    getFilesByPath: build.query<{ file?: IFile, children: IFile[] }, { path: string }>({
      query: ({path}) => ({
        url: `/files/byPath`,
        method: 'POST',
        body: {path},
      }),
      providesTags: ['File'],
    }),
  }),
});
