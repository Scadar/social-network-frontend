import React, {FC} from 'react';
import {Box, LinearProgress, Typography} from '@mui/material';
import {flexStyles} from '../../utils/styleUtils';

const GlobalLoading: FC = () => {
  return (
      <>
        <LinearProgress color={"inherit"}/>
        <Box
            sx={{
              ...flexStyles('center', 'center', 'column'),
              width: '100%',
              height: 'calc(100vh - 4px)',
              backgroundColor: theme => theme.palette.background.default
            }}
        >
          <Typography variant="h2">
            VK clone
          </Typography>
        </Box>
      </>

  );
};

export default GlobalLoading;
