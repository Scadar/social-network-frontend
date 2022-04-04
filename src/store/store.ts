import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {authApi} from '../services/authService';
import auth from './slices/auth';
import messages from './slices/messages';
import {userApi} from '../services/userService';
import {friendApi} from '../services/friendService';
import {roomApi} from '../services/roomService';
import {chatMessageApi} from '../services/chatMessageService';
import {searchApi} from '../services/searchService';
import {diskApi} from '../services/diskService';

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [friendApi.reducerPath]: friendApi.reducer,
  [roomApi.reducerPath]: roomApi.reducer,
  [chatMessageApi.reducerPath]: chatMessageApi.reducer,
  [searchApi.reducerPath]: searchApi.reducer,
  [diskApi.reducerPath]: diskApi.reducer,
  auth,
  messages,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware()
      .concat([
        authApi.middleware,
        userApi.middleware,
        friendApi.middleware,
        roomApi.middleware,
        chatMessageApi.middleware,
        searchApi.middleware,
        diskApi.middleware,
      ]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
