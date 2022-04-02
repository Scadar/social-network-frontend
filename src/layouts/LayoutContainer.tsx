import React, {FC} from 'react';
import {Box} from '@mui/material';

const LayoutContainer: FC = ({children}) => {
  return (
      <Box
        sx={theme => ({
          width: theme.layoutSize.containerWidth,
          maxWidth: theme.layoutSize.containerWidth,
          minWidth: theme.layoutSize.containerWidth,
          m: '0 auto',
          minHeight: 'inherit',
          height: 'inherit',
        })}
      >
        {children}
      </Box>
  );
};

export default LayoutContainer;
