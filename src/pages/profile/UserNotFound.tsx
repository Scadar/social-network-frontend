import React, {FC} from 'react';
import FlexCenter from '../../components/UI/FlexCenter';
import {Typography} from '@mui/material';

const UserNotFound: FC = () => {
  return (
      <FlexCenter>
        <Typography variant="h4">Пользователь не найден</Typography>
      </FlexCenter>
  );
};

export default UserNotFound;
