import * as React from 'react';
import IoContext from './IoContext';
import {IoContextInterface, UseSocketReturnType} from './types';

function useSocket(): UseSocketReturnType {
  const {status, error, socket} = React.useContext<IoContextInterface>(IoContext);
  return {status, error, socket: socket!};
}

export default useSocket;
