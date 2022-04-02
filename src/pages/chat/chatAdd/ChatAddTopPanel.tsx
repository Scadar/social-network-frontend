import React, {FC} from 'react';
import {IconButton, Link, Stack, Typography} from '@mui/material';
import {Close} from '@mui/icons-material';
import PageTopWrapper from '../../../layouts/pageWrapper/PageTopWrapper';

const ChatAddTopPanel: FC = () => {
  return (
      <PageTopWrapper>
        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{
              height: '100%'
            }}
        >
          <Typography
              fontWeight="medium"
              sx={{
                flexGrow: 1,
                mr: 1,
              }}
          >
            Создание беседы
          </Typography>
          <IconButton component={Link} href={'/messages/peers'}>
            <Close/>
          </IconButton>
        </Stack>
      </PageTopWrapper>
  );
};

export default ChatAddTopPanel;
