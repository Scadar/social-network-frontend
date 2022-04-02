import React, {FC} from 'react';
import {CircularProgress} from '@mui/material';

const Loading: FC = () => {
  return (
      <CircularProgress size={22}/>
  );
};

export default Loading;
