import React, {FC, useEffect} from 'react';
import {useAppSelector} from './hooks/useAppSelector';
import {authApi} from './services/authService';
import GlobalLoading from './components/UI/GlobalLoading';
import PrivateRoutes from './routes/PrivateRoutes';
import PublicRoutes from './routes/PublicRoutes';
import {baseUrl} from './services/config/query';
import {getTokenFromLocalStorage, TokenType} from './utils/localStorage';
import {SocketProvider} from './socket/SocketProvider';

const App: FC = () => {

  const {user, globalLoading} = useAppSelector(state => state.auth);

  const [getProfile] = authApi.useLazyFetchProfileQuery();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (globalLoading) {
    return <GlobalLoading/>;
  }

  if (user) {
    return (
        <SocketProvider
            uri={baseUrl!}
            options={{
              auth: {
                token: `Bearer ${getTokenFromLocalStorage(TokenType.ACCESS)}`,
              },
              upgrade: true,
            }}
        >
          <PrivateRoutes/>
        </SocketProvider>
    );
  } else {
    return <PublicRoutes/>;
  }
};

export default App;
