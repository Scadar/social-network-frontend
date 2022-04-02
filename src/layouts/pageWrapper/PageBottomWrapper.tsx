import React, {FC} from 'react';
import {Paper} from '@mui/material';

const PageBottomWrapper: FC = ({children}) => {
  return (
      <Paper
          sx={theme => ({
            p: 1,
            borderTop: `1px solid ${theme.palette.divider}`,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            zIndex: theme.zIndex.appBar + 1,
            height: '100%',
          })}
      >
        {children}
      </Paper>
  );
};

export default PageBottomWrapper;
