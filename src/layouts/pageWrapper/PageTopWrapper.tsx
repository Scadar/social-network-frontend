import React, {FC} from 'react';
import {Paper, SxProps, Theme} from '@mui/material';

type PageTopWrapperProps = {
  sx?: SxProps<Theme>
}

const PageTopWrapper: FC<PageTopWrapperProps> = ({children, sx}) => {
  return (
      <Paper
          sx={[
            (theme => ({
              height: '100%',
              p: 1,
              borderBottom: `1px solid ${theme.palette.divider}`,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              zIndex: theme.zIndex.appBar + 1,
            })),
            //@ts-ignore
            sx,
          ]}
      >
        {children}
      </Paper>
  );
};

export default PageTopWrapper;
