import React, {FC, useEffect} from 'react';
import {useAppSelector} from './hooks/useAppSelector';
import {authApi} from './services/authService';
import GlobalLoading from './components/UI/GlobalLoading';
import PrivateRoutes from './routes/PrivateRoutes';
import PublicRoutes from './routes/PublicRoutes';
import SocketContainer from './SocketContainer';

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
        <SocketContainer>
          <PrivateRoutes/>
        </SocketContainer>
    );
  } else {
    return <PublicRoutes/>;
  }
};

export default App;
