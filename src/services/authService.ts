import {createApi} from '@reduxjs/toolkit/query/react';
import {AuthResponse, IUser, RefreshResponse} from '../models/authModels';
import {logout, setAuthUser, setGlobalLoading} from '../store/slices/auth';
import {getTokenFromLocalStorage, setTokenToLocalStorage, TokenType} from '../utils/localStorage';
import {baseQuery} from './config/query';

export const authApi = createApi({
  reducerPath: 'authAPI',
  baseQuery: baseQuery,
  endpoints: (build) => ({
    fetchRegister: build.mutation<AuthResponse, { email: string, password: string, firstName: string, lastName: string, gender: string }>(
        {
          query: (args) => ({
            url: '/register',
            method: 'POST',
            body: {...args},
          }),
          async onQueryStarted(arg, api) {
            try {
              const {data} = await api.queryFulfilled;
              setTokenToLocalStorage(TokenType.ACCESS, data.accessToken);
              setTokenToLocalStorage(TokenType.REFRESH, data.refreshToken);
              api.dispatch(setAuthUser(data.user));
            } catch (e) {
              api.dispatch(setAuthUser(null));
            }
          },
        }),
    fetchLogin: build.mutation<AuthResponse, { email: string, password: string }>({
      query: ({email, password}) => ({
        url: '/login',
        method: 'POST',
        body: {email, password},
      }),
      async onQueryStarted(arg, api) {
        try {
          const {data} = await api.queryFulfilled;
          setTokenToLocalStorage(TokenType.ACCESS, data.accessToken);
          setTokenToLocalStorage(TokenType.REFRESH, data.refreshToken);
          api.dispatch(setAuthUser(data.user));
        } catch (e) {
          api.dispatch(setAuthUser(null));
        }
      },
    }),
    fetchProfile: build.query<IUser, void>({
      query: () => ({
        url: '/user/profile',
        method: 'GET',
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        const accessToken = getTokenFromLocalStorage(TokenType.ACCESS);
        if (!accessToken) {
          dispatch(setGlobalLoading(false));
          dispatch(logout());
          return;
        }

        dispatch(setGlobalLoading(true));
        try {
          const {data} = await queryFulfilled;
          dispatch(setAuthUser(data));
        } catch (e) {
          dispatch(logout());
        } finally {
          dispatch(setGlobalLoading(false));
        }
      },
    }),
    fetchRefresh: build.mutation<RefreshResponse, void>({
      query: () => ({
        url: '/refresh',
        method: 'POST',
        body: {refreshToken: getTokenFromLocalStorage(TokenType.REFRESH)},
      }),
      extraOptions: {
        disableToken: true,
      },
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          setTokenToLocalStorage(TokenType.ACCESS, data.accessToken);
          dispatch(setAuthUser(data.user));
        } catch (e) {
          dispatch(logout());
        }
      },
    }),
    fetchLogOut: build.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (e) {
          dispatch(logout());
        }
      },
    }),
  }),
});
