import React, {FC} from 'react';
import {Box, SxProps, Theme} from '@mui/material';
import {flexStyles} from '../../utils/styleUtils';

type FlexCenterProps = {
  sx?: SxProps<Theme>
}

const FlexCenter: FC<FlexCenterProps> = ({children, sx}) => {
  return (
      <Box
          sx={[
            {
              ...flexStyles('center', 'center'),
            },
            //@ts-ignore
            sx,
          ]}
      >
        {children}
      </Box>
  );
};

export default FlexCenter;
