import React, {FC} from 'react';
import Loading from './Loading';
import FlexCenter from './FlexCenter';
import {Box, SxProps, Typography} from '@mui/material';

type UserListProps = {
  isEmpty: boolean
  isLoading?: boolean
  sx?: SxProps
}

const ListWrapper: FC<UserListProps> = ({
                                          isEmpty,
                                          isLoading,
                                          children,
                                          sx,
                                        }) => {

  if (isLoading) {
    return (
        <FlexCenter sx={{height: '100%'}}>
          <Loading/>
        </FlexCenter>
    );
  }

  if (isEmpty) {
    return (
        <FlexCenter sx={{height: '100%'}}>
          <Typography>Список пуст</Typography>
        </FlexCenter>
    );
  }

  return (
      <Box sx={sx}>
        {children}
      </Box>
  );
};

export default ListWrapper;
