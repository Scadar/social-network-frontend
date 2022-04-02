import React, {FC} from 'react';
import {Box, Button, Link, Stack, Typography} from '@mui/material';
import UserAvatar from '../../../components/user/UserAvatar';
import {IUser} from '../../../models/authModels';
import Loading from '../../../components/UI/Loading';
import PageTopWrapper from '../../../layouts/pageWrapper/PageTopWrapper';
import FlexCenter from '../../../components/UI/FlexCenter';

type ChatRoomTopPanelProps = {
  user?: IUser
  isLoading: boolean
}

const ChatRoomTopPanel: FC<ChatRoomTopPanelProps> = ({user, isLoading}) => {
  return (
      <PageTopWrapper>
        <Stack
            alignItems="center"
            justifyContent="space-between"
            direction="row"
            spacing={1}
            sx={{
              height: '100%',
            }}
        >
          {
            !user || isLoading
                ?
                <FlexCenter sx={{width: '100%'}}>
                  <Loading/>
                </FlexCenter>
                :
                <>
                  <Button
                      component={Link}
                      href={`/messages`}
                  >
                    Назад
                  </Button>
                  <Box>
                    <Typography fontWeight="medium" fontSize={15}>
                      {`${user?.firstName} ${user?.lastName}`}
                    </Typography>
                  </Box>
                  <Box>
                    <UserAvatar
                        user={user}
                        size="small"
                    />
                  </Box>
                </>
          }
        </Stack>
      </PageTopWrapper>
  );
};

export default ChatRoomTopPanel;
