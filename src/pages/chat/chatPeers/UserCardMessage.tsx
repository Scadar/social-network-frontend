import React, {FC} from 'react';
import {Box, Stack, Typography} from '@mui/material';
import UserAvatar from '../../../components/user/UserAvatar';
import {ChatRoomType, IChatRoom} from '../../../models/chatModels';
import {useNavigate} from 'react-router-dom';
import {IChatMessage} from '../../../models/chatMessage';
import {IUser} from '../../../models/authModels';

type UserCardMessageProps = {
  chatRoom: IChatRoom
  withDivider: boolean
  lastMessage: IChatMessage
  me: IUser
}

const UserCardMessage: FC<UserCardMessageProps> = ({chatRoom, withDivider, lastMessage, me}) => {

  const navigate = useNavigate();

  const lastMessageUser = lastMessage.senderId === me._id ? me : chatRoom.user;

  const getRoomName = () => {
    if (chatRoom.type === ChatRoomType.PRIVATE) {
      return `${chatRoom.user?.firstName} ${chatRoom.user?.lastName}`;
    } else {
      return chatRoom.name;
    }
  };

  const goToDialog = (id: string) => {
    navigate(`/messages/room/${id}`);
  };

  return (
      <>
        <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={theme => ({
              '&:hover': {
                background: theme.palette.action.hover,
                cursor: 'pointer',
              },
              boxShadow: `0 1px 0 0 ${theme.palette.divider}`,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            })}
            onClick={() => goToDialog(chatRoom._id)}
        >
          <Box sx={{p: 1}}>
            <UserAvatar
                user={chatRoom.user}
                stopPropagation
            />
          </Box>
          <Box
              sx={theme => ({
                flexGrow: 1,
              })}
          >
            <Stack sx={{p: 1, pl: 0}} spacing={1}>
              <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={1}
              >
                <Typography fontWeight="medium">{getRoomName()}</Typography>
                <Typography variant="caption" color="text.secondary">15:17</Typography>
              </Stack>
              <Stack direction={'row'} spacing={1} alignItems={'center'}>
                <UserAvatar user={lastMessageUser} size={'small'}/>
                <Typography color="text.secondary" fontSize={14} noWrap>
                  {lastMessage?.message}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </>
  );
};

export default UserCardMessage;
