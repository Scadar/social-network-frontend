import React, {FC} from 'react';
import {IconButton, Link, Stack, TextField} from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import PageTopWrapper from '../../../layouts/pageWrapper/PageTopWrapper';

const ChatPeersTopPanel: FC = () => {
  return (
      <PageTopWrapper>
        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
        >
          <TextField label="Поиск" fullWidth sx={{mr: 1}}/>
          <IconButton component={Link} href={'/messages/add'}>
            <AddCircleOutlineOutlinedIcon/>
          </IconButton>
        </Stack>
      </PageTopWrapper>
  );
};

export default ChatPeersTopPanel;
