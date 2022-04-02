import React, {FC} from 'react';
import {Box, Button, Stack} from '@mui/material';
import {UserToUserRelationship} from '../../models/friendModels';

type FriendInviteButtonProps = {
  status: UserToUserRelationship
  inviteFriend: () => void
  deleteFriend: () => void
  isLoading: boolean
}

const UserFriendButton: FC<FriendInviteButtonProps> = ({status, inviteFriend, deleteFriend, isLoading}) => {

  if (status === UserToUserRelationship.PENDING_ACTION) {
    return (
        <Stack spacing={1}>
          <Button
              disabled={isLoading}
              variant="contained"
              onClick={inviteFriend}
          >
            Добавить в друзья
          </Button>
          <Button color="error" onClick={deleteFriend} disabled={isLoading}>
            Отклонить
          </Button>
        </Stack>
    );
  }

  if (
      status === UserToUserRelationship.NOT_FRIEND ||
      status === UserToUserRelationship.YOUR_FOLLOWER
  ) {
    return (
        <Box>
          <Button
              disabled={isLoading}
              variant="contained"
              onClick={inviteFriend}
          >
            Добавить в друзья
          </Button>
        </Box>
    );
  }

  if (status === UserToUserRelationship.REQUEST_SENT) {
    return (
        <Box>
          <Button color="error" onClick={deleteFriend} disabled={isLoading}>
            Отменить запрос
          </Button>
        </Box>
    );
  }

  if (status === UserToUserRelationship.I_FOLLOWER) {
    return (
        <Box>
          <Button onClick={deleteFriend} disabled={isLoading}>
            Вы подписаны
          </Button>
        </Box>
    );
  }

  return (
      <Box>
        <Button color="error" onClick={deleteFriend} disabled={isLoading}>
          Удалить из друзей
        </Button>
      </Box>
  );
};

export default UserFriendButton;
