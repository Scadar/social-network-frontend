import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import {getTokenFromLocalStorage, setTokenToLocalStorage, TokenType} from '../../utils/localStorage';
import {logout} from '../../store/slices/auth';
import {RefreshResponse} from '../../models/authModels';

export const baseUrl = process.env.REACT_APP_REQUEST_URL;
export const baseStaticUrl = baseUrl + '/static/';

const queryWithoutAuthHeader = fetchBaseQuery({
  baseUrl: baseUrl,
});

const queryWithAuthHeader = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: headers => {
    const token = getTokenFromLocalStorage(TokenType.ACCESS);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

type ExtraOptions = {
  disableToken?: boolean
}

export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, ExtraOptions, FetchBaseQueryMeta> =
    async (args, api, extraOptions) => {

      let query;
      if (extraOptions && extraOptions.disableToken) {
        query = queryWithoutAuthHeader;
      } else {
        query = queryWithAuthHeader;
      }

      let result = await query(args, api, extraOptions);

      if (result.error && result.error.status === 401) {

        const {data} = await queryWithoutAuthHeader({
          url: '/refresh',
          method: 'POST',
          body: {refreshToken: getTokenFromLocalStorage(TokenType.REFRESH)},
        }, api, extraOptions);

        const refreshResponse = data as RefreshResponse;

        if (refreshResponse) {
          setTokenToLocalStorage(TokenType.ACCESS, refreshResponse.accessToken);
          result = await query(args, api, extraOptions);
        } else {
          await api.dispatch(logout());
        }

      }

      return result;
    };
