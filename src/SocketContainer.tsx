import React, {FC, useEffect} from 'react';
import {baseUrl} from './services/config/query';
import {getTokenFromLocalStorage, TokenType} from './utils/localStorage';
import {IoContextInterface} from './socket/types';
import IoContext from './socket/IoContext';
import GlobalLoading from './components/UI/GlobalLoading';

const SocketContainer: FC = ({children}) => {

  const {createConnection, socket} = React.useContext<IoContextInterface>(IoContext);

  useEffect(() => {

    const connection = createConnection(baseUrl!, {
      auth: {
        token: `Bearer ${getTokenFromLocalStorage(TokenType.ACCESS)}`,
      },
    });
    return () => {
      if (connection) {
        connection.cleanup();
      }
    };
  }, [createConnection]);

  if (!socket) {
    return <GlobalLoading/>;
  }

  return (
      <>
        {children}
      </>
  );
};

export default SocketContainer;
